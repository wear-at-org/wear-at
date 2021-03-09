package com.side.scot.service;

import com.side.scot.config.AuthConfig;
import com.side.scot.exception.UnAuthorizedException;
import com.side.scot.model.auth.AuthUserClaim;
import com.side.scot.model.auth.AuthUserResponse;
import com.side.scot.model.auth.TokenResponse;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import io.jsonwebtoken.security.Keys;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;

@Slf4j
@Service
public class AuthService {

    private final AuthConfig authConfig;

    @Autowired
    public AuthService(AuthConfig authConfig) {
        this.authConfig = authConfig;
    }

    public String getCodeUrl() {
        String redirectUrl = URLEncoder.encode(this.authConfig.getCallbackUrl(), StandardCharsets.UTF_8);
        String urlStr = String.format("%s?client_id=%s&redirect_uri=%s&response_type=code", this.authConfig.getCodeUrl(), this.authConfig.getClientId(), redirectUrl);
        return urlStr;
    }

    public TokenResponse issueToken(String code) {
        WebClient client = WebClient.builder()
            .baseUrl(this.authConfig.getTokenUrl())
            .build();

        TokenResponse resp = client.post()
                .header(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8")
                .body(BodyInserters.fromFormData("grant_type","authorization_code")
                        .with("client_id", this.authConfig.getClientId())
                        .with("redirect_uri", this.authConfig.getCallbackUrl())
                        .with("client_secret", this.authConfig.getClientSecret())
                        .with("code", code)
                )
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                        ,statusResp ->  statusResp.bodyToMono(String.class).map(b->new Exception(b)))
                .bodyToMono(TokenResponse.class).block();
        return resp;
    }

    public AuthUserResponse getUser(String token) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getUserUrl())
                .build();

        AuthUserResponse resp = client.get()
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", token))
                .retrieve().bodyToMono(AuthUserResponse.class).block();
        return resp;
    }

    public String logout(String token) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getLogoutUrl())
                .build();

        HashMap<String, Integer> resp = client.post()
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", token))
                .retrieve().bodyToMono(HashMap.class).block();
        if (resp.containsKey("id")) {
            return resp.get("id").toString();
        }
        return "";
    }

    public String generateJWTToken(AuthUserClaim claim) {
        LocalDateTime expiredAt = LocalDateTime.now().plusSeconds(this.authConfig.getJwtExpireInSeconds());
        String token = Jwts.builder()
            .setHeaderParam("typ","JWT")
            .setHeaderParam("alg", "HS256")
            .claim("accessToken", claim.getAccessToken())
            .claim("refreshToken", claim.getRefreshToken())
            .claim("id", claim.getId())
            .claim("nickName", claim.getNickName())
            .setExpiration(Date.from(expiredAt.toInstant(ZoneOffset.UTC)))
            .signWith(Keys.hmacShaKeyFor(this.authConfig.getJwtKey().getBytes()))
            .compact()
        ;
        return token;
    }

    public AuthUserClaim parseJWTToken(String token) throws UnAuthorizedException {
        try {
            Claims claim = Jwts.parserBuilder()
                    .setSigningKey(this.authConfig.getJwtKey().getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            AuthUserClaim user = AuthUserClaim.builder()
                    .accessToken(claim.get("accessToken", String.class))
                    .refreshToken(claim.get("refreshToken", String.class))
                    .id(claim.get("id", String.class))
                    .nickName(claim.get("nickName", String.class))
                    .build();
            return user;

        } catch (SignatureException ex) {
            throw new UnAuthorizedException("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            throw new UnAuthorizedException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new UnAuthorizedException("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new UnAuthorizedException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new UnAuthorizedException("JWT claims string is empty.");
        } catch (Exception ex) {
            throw new UnAuthorizedException("parse jwt token exception", ex);
        }
    }
}
