package com.side.scot.api.auth;

import com.side.scot.config.AuthConfig;
import com.side.scot.model.auth.AuthUserResponse;
import com.side.scot.model.auth.TokenResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class KakaoProvider implements IProvider {

    private final AuthConfig authConfig;

    public KakaoProvider(AuthConfig authConfig) {
        this.authConfig = authConfig;
    }

    @Override
    public String getCodeUrl() {
        String redirectUrl = URLEncoder.encode(this.authConfig.getCallbackUrl(), StandardCharsets.UTF_8);
        String urlStr = String.format("%s?client_id=%s&redirect_uri=%s&response_type=code&state=kakao", this.authConfig.getCodeUrl(), this.authConfig.getClientId(), redirectUrl);
        return urlStr;
    }

    @Override
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

    @Override
    public String revokeToken(String token) {
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

    @Override
    public AuthUserResponse getUser(String token) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getUserUrl())
                .build();

        AuthUserResponse resp = client.get()
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", token))
                .retrieve().bodyToMono(AuthUserResponse.class).block();
        return resp;
    }
}
