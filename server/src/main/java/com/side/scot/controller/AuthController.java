package com.side.scot.controller;

import com.google.gson.JsonObject;
import com.side.scot.config.AuthConfig;
import com.side.scot.model.auth.AuthUserClaim;
import com.side.scot.model.auth.AuthUserResponse;
import com.side.scot.model.auth.TokenResponse;
import com.side.scot.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

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
    public ResponseEntity<String> logout(@CookieValue("token") String token, HttpServletResponse response) {
        AuthUserClaim claim = this.authService.parseJWTToken(token);

        String id = this.authService.logout(claim.getAccessToken());

        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        JsonObject resp = new JsonObject();
        resp.addProperty("id", id);
        return new ResponseEntity(resp.toString(), HttpStatus.OK);
    }

    @GetMapping(path = "/url")
    public ResponseEntity<String> getAuthCodeUrl() {
        String urlStr = this.authService.getCodeUrl();

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
    ) {
        // TODO error handling, access token을 DB에 관리, status정합성 체

        TokenResponse token = this.authService.issueToken(code);

        AuthUserResponse user = this.authService.getUser(token.getAccessToken());

        AuthUserClaim claim = AuthUserClaim.builder()
                .id(user.getId())
                .nickName(user.getKakaoAccount().getProfile().getNickName())
                .accessToken(token.getAccessToken())
                .refreshToken(token.getRefreshToken())
                .build();
        String jwtToken = this.authService.generateJWTToken(claim);

        Cookie cookie = new Cookie("token", jwtToken);
        cookie.setMaxAge(60*60*24);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", this.authConfig.getClientRedirectUrl());
        return new ResponseEntity<>(headers,HttpStatus.TEMPORARY_REDIRECT);
    }
}
