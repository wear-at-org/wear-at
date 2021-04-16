package com.side.wearat.controller;

import com.google.gson.JsonObject;
import com.side.wearat.config.AuthConfig;
import com.side.wearat.entity.User;
import com.side.wearat.exception.UnAuthorizedException;
import com.side.wearat.model.auth.*;
import com.side.wearat.model.user.CreateUserRequest;
import com.side.wearat.model.user.UpdateUserRequest;
import com.side.wearat.service.AuthService;
import com.side.wearat.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private static final String COOKIE_TOKEN = "_watt";
    private static final String COOKIE_USER = "_watu";

    private final AuthService authService;
    private final UserService userService;

    private final AuthConfig authConfig;

    @Autowired
    public AuthController(AuthService authService, UserService userService, AuthConfig authConfig) {
        this.authService = authService;
        this.userService = userService;
        this.authConfig = authConfig;
    }

    @PostMapping(path = "/sign-in")
    public ResponseEntity<Void> signIn(@RequestBody SignInRequest req, HttpServletResponse response) throws Exception {
        Optional<User> userOpt = this.userService.getUserByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            throw new UnAuthorizedException("가입된 이메일을 찾을 수 없습니다.");
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(this.authService.encryptPassword(req.getPassword()))) {
            throw new UnAuthorizedException("비밀번호가 일치하지 않습니다.");
        }

        String jwtToken = this.createJWTFromUser(user);
        this.createTokenCookie(response, jwtToken);
        this.createUserCookie(response, user.getId().toString(), user.getNickname());

        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/sign-up")
    public User createUser(@RequestBody CreateUserRequest req) throws Exception {
        req.setPassword(this.authService.encryptPassword(req.getPassword()));
        return this.userService.createUser(req);
    }

    @PostMapping(path = "/sns-sign-up")
    public ResponseEntity<Void> snsSignUp(@RequestBody SnsSignUpRequest req, HttpServletResponse response) throws Exception {
        Optional<User> userOpt = this.userService.getUser(req.getId());
        if (userOpt.isEmpty()) {
            throw new UnAuthorizedException("가입된 사용자 찾을 수 없습니다.");
        }

        User user = userOpt.get();
        if (!user.getEmail().isEmpty()) {
            throw new UnAuthorizedException("email정보가 입력되지 않았습니다.");
        }

        UpdateUserRequest updateReq = UpdateUserRequest.builder()
                .id(req.getId())
                .name(req.getName())
                .email(req.getEmail())
                .nickname(req.getNickname())
                .gender(req.getGender())
                .birthday(req.getBirthday())
                .checkPrivacyPolicy(req.getCheckPrivacyPolicy())
                .checkReceivingConsent(req.getCheckReceivingConsent())
                .checkServiceTerms(req.getCheckServiceTerms())
                .build();
        this.userService.updateUser(updateReq);

        this.createUserCookie(response, user.getId().toString(), user.getNickname());

        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/logout")
    public ResponseEntity<String> logout(@RequestParam("provider") Optional<String> provider, @CookieValue("_watt") String token, HttpServletResponse response) throws Exception {
        AuthUserClaim claim = this.authService.parseJWTToken(token);

        // TODO kakao 401원인파악 및 주석해제
        //if (provider.isPresent()) {
        //    this.authService.revokeToken(provider.get(), claim.getAccessToken());
        //}

        this.removeTokenCookie(response);
        this.removeUserCookie(response);

        JsonObject resp = new JsonObject();
        resp.addProperty("id", claim.getId());
        return new ResponseEntity(resp.toString(), HttpStatus.OK);
    }

    @GetMapping(path = "/url")
    public ResponseEntity<String> getAuthCodeUrl(@RequestParam("provider") String provider) throws Exception {
        String urlStr = this.authService.getCodeUrl(provider);

        JsonObject resp = new JsonObject();
        resp.addProperty("url", urlStr);
        return new ResponseEntity(resp.toString(), HttpStatus.OK);
    }

    @GetMapping(path = "/callback")
    public ResponseEntity<String> callback(
        @RequestParam("code") String code,
        @RequestParam(value="state", required = false) String state,
        @RequestParam(value="error", required = false) String error,
        @RequestParam(value="error_description", required = false) String errorDesc,
        HttpServletResponse response
    ) throws Exception {
        // TODO error handling, access token을 DB에 관리, status정합성 체크

        String provider = state;

        TokenResponse token = this.authService.issueToken(provider, code);

        AuthUserResponse authUser = this.authService.getUser(provider, token.getAccessToken());

        Optional<User> user = this.userService.getUserByProvider(provider, authUser.getId());
        if (user.isEmpty()) {
            CreateUserRequest req = CreateUserRequest.builder()
                    .provider(provider)
                    .providerID(authUser.getId())
                    .email(authUser.getEmail())
                    .nickname(authUser.getNickName())
                    .gender(authUser.getGender())
                    .birthday(authUser.getBirthday())
                    .build();
            user = Optional.of(this.userService.createUser(req));
        }
        User u = user.get();

        String jwtToken = this.createJWTFromUser(user.get());
        this.createTokenCookie(response, jwtToken);
        this.createUserCookie(response, u.getId().toString(), u.getNickname());

        if (!isSNSAuthCompletely(u)) {
            HttpHeaders headers = new HttpHeaders();
            String redirectUrl = String.format("%s/sns-login", this.authConfig.getClientRedirectUrl());
            headers.add("Location", redirectUrl);
            return new ResponseEntity<>(headers,HttpStatus.TEMPORARY_REDIRECT);
        }
        HttpHeaders headers = new HttpHeaders();
        String redirectUrl = this.authConfig.getClientRedirectUrl();
        headers.add("Location", redirectUrl);
        return new ResponseEntity<>(headers,HttpStatus.TEMPORARY_REDIRECT);
    }

    private boolean isSNSAuthCompletely(User u) {
        return StringUtils.hasText(u.getEmail()) && StringUtils.hasText(u.getName()) && StringUtils.hasText(u.getNickname());
    }

    private String createJWTFromUser(User user) {
        AuthUserClaim claim = AuthUserClaim.builder()
                .id(user.getId())
                .provider(user.getProvider())
                .build();
        return this.authService.generateJWTToken(claim);
    }

    private void createTokenCookie(HttpServletResponse response, String token) {
        Cookie tokenCookie = new Cookie(COOKIE_TOKEN, token);
        tokenCookie.setMaxAge(60*60*24);
        tokenCookie.setPath("/");
        tokenCookie.setHttpOnly(true);
        response.addCookie(tokenCookie);
    }

    private void removeTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(COOKIE_TOKEN, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    private void createUserCookie(HttpServletResponse response, String userId, String nickname) throws Exception {
        JsonObject userInfo = new JsonObject();
        userInfo.addProperty("id", userId);
        userInfo.addProperty("nickname", nickname);

        Cookie userCookie = new Cookie(COOKIE_USER, URLEncoder.encode(userInfo.toString(), "UTF-8"));
        userCookie.setMaxAge(60*60*24);
        userCookie.setPath("/");
        response.addCookie(userCookie);
    }

    private void removeUserCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(COOKIE_USER, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}
