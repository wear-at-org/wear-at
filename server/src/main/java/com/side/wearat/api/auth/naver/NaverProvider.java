package com.side.wearat.api.auth.naver;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.side.wearat.api.auth.IProvider;
import com.side.wearat.config.AuthConfig;
import com.side.wearat.model.auth.AuthUserResponse;
import com.side.wearat.model.auth.TokenResponse;
import lombok.*;
import org.springframework.http.HttpHeaders;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class NaverProvider implements IProvider {

    private final AuthConfig authConfig;

    public NaverProvider(AuthConfig authConfig) {
        this.authConfig = authConfig;
    }

    @Override
    public String getCodeUrl() {
        String redirectUrl = URLEncoder.encode(this.authConfig.getCallbackUrl(), StandardCharsets.UTF_8);
        String urlStr = String.format("%s?client_id=%s&redirect_uri=%s&response_type=code&state=naver", this.authConfig.getNaver().getCodeUrl(), this.authConfig.getNaver().getClientId(), redirectUrl);
        return urlStr;
    }

    @Override
    public TokenResponse issueToken(String code) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getNaver().getTokenUrl())
                .build();

        NaverTokenResponse resp = client.post()
                .header(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8")
                .body(BodyInserters.fromFormData("grant_type","authorization_code")
                        .with("client_id", this.authConfig.getNaver().getClientId())
                        .with("client_secret", this.authConfig.getNaver().getClientSecret())
                        .with("code", code)
                )
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                        ,statusResp ->  statusResp.bodyToMono(String.class).map(b->new Exception(b)))
                .bodyToMono(NaverTokenResponse.class).block();

        TokenResponse tResp = TokenResponse.builder()
                .accessToken(resp.getAccessToken())
                .refreshToken(resp.getRefreshToken())
                .tokenType(resp.getTokenType())
                .expiresIn(resp.getExpiresIn())
                .build();
        return tResp;
    }

    @Override
    public String revokeToken(String token) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getNaver().getLogoutUrl())
                .build();

        NaverTokenResponse resp = client.post()
                .header(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8")
                .body(BodyInserters.fromFormData("grant_type","delete")
                        .with("client_id", this.authConfig.getNaver().getClientId())
                        .with("client_secret", this.authConfig.getNaver().getClientSecret())
                        .with("access_token", token)
                        .with("service_provider", "NAVER")
                )
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                        ,statusResp ->  statusResp.bodyToMono(String.class).map(b->new Exception(b)))
                .bodyToMono(NaverTokenResponse.class).block();
        // TODO resp error handle
        return "";
    }

    @Override
    public AuthUserResponse getUser(String token) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getNaver().getUserUrl())
                .build();

        NaverAuthResponse resp = client.get()
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", token))
                .retrieve().bodyToMono(NaverAuthResponse.class).block();

        String birthday = "";
        String birthmonth = "";
        String birth = resp.getPayload().getBirthDay();
        if (StringUtils.hasText(birth)) {
            birthday = birth.substring(0,2);
            birthmonth = birth.substring(3,5);
        }

        AuthUserResponse user = AuthUserResponse.builder()
                .id(resp.getPayload().getId())
                .nickName(resp.getPayload().getNickname())
                .email(resp.getPayload().getEmail())
                .age(resp.getPayload().getAge())
                .birthday(birthday)
                .birthmonth(birthmonth)
                .birthyear(resp.getPayload().getBirthYear())
                .gender(resp.getPayload().getGender())
                .profileImage(resp.getPayload().getProfileImage())
                .build();
        return user;
    }
}

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
class NaverAuthResponse {
    @JsonProperty("resultcode")
    private String resultCode;

    @JsonProperty("message")
    private String message;

    @JsonProperty("response")
    private NaverAuthResponsePayload payload;
}

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
class NaverAuthResponsePayload {
    @JsonProperty("id")
    private String id;

    @JsonProperty("nickname")
    private String nickname;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("age")
    private String age;

    @JsonProperty("birthyear")
    private String birthYear;

    @JsonProperty("birthday")
    private String birthDay;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("profile_image")
    private String profileImage;
}

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
class NaverTokenResponse {
    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("expires_in")
    private Integer expiresIn;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("error")
    private String error;

    @JsonProperty("error_description")
    private String errorDescription;
}