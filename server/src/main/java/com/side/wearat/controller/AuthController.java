package com.side.wearat.controller;

import com.google.gson.JsonObject;
import com.side.wearat.config.AuthConfig;
import com.side.wearat.model.auth.AuthUserClaim;
import com.side.wearat.model.auth.AuthUserResponse;
import com.side.wearat.model.auth.TokenResponse;
import com.side.wearat.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;

@Slf4j
@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;

    private final AuthConfig authConfig;

    @Autowired
    public AuthController(AuthService authService, AuthConfig authConfig) {
        this.authService = authService;
        this.authConfig = authConfig;
    }

    @PostMapping(path = "/login")
    public void login() {
    }

    @GetMapping(path = "/logout")
    public ResponseEntity<String> logout(@RequestParam("provider") String provider, @CookieValue("token") String token, HttpServletResponse response) throws Exception {
        AuthUserClaim claim = this.authService.parseJWTToken(token);

        String id = this.authService.revokeToken(provider, claim.getAccessToken());

        this.removeTokenCookie(response);
        this.removeUserCookie(response);

        JsonObject resp = new JsonObject();
        resp.addProperty("id", id);
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
        // TODO error handling, access token을 DB에 관리, status정합성 체

        String provider = state;

        TokenResponse token = this.authService.issueToken(provider, code);

        AuthUserResponse user = this.authService.getUser(provider, token.getAccessToken());

        AuthUserClaim claim = AuthUserClaim.builder()
                .id(user.getId())
                .nickName(user.getNickName())
                .accessToken(token.getAccessToken())
                .refreshToken(token.getRefreshToken())
                .build();
        String jwtToken = this.authService.generateJWTToken(claim);

        this.createTokenCookie(response, jwtToken);
        this.createUserCookie(response, user);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", this.authConfig.getClientRedirectUrl());
        return new ResponseEntity<>(headers,HttpStatus.TEMPORARY_REDIRECT);
    }

    private void createTokenCookie(HttpServletResponse response, String token) {
        Cookie tokenCookie = new Cookie("token", token);
        tokenCookie.setMaxAge(60*60*24);
        tokenCookie.setPath("/");
        tokenCookie.setHttpOnly(true);
        response.addCookie(tokenCookie);
    }

    private void removeTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    private void createUserCookie(HttpServletResponse response, AuthUserResponse user) throws Exception {
        JsonObject userInfo = new JsonObject();
        userInfo.addProperty("id", user.getId());
        userInfo.addProperty("nickname", user.getNickName());

        Cookie userCookie = new Cookie("user", URLEncoder.encode(userInfo.toString(), "UTF-8"));
        userCookie.setMaxAge(60*60*24);
        userCookie.setPath("/");
        response.addCookie(userCookie);
    }

    private void removeUserCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("user", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}
