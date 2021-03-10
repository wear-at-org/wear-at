package com.side.scot.api.auth.kakao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.side.scot.api.auth.IProvider;
import com.side.scot.config.AuthConfig;
import com.side.scot.model.auth.AuthUserResponse;
import com.side.scot.model.auth.TokenResponse;
import lombok.*;
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

        KakaoAuthResponse resp = client.get()
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", token))
                .retrieve().bodyToMono(KakaoAuthResponse.class).block();

        AuthUserResponse user = AuthUserResponse.builder()
                .id(resp.getId())
                .nickName(resp.getKakaoAccount().getProfile().getNickName())
                .email(resp.getKakaoAccount().getEmail())
                .ageRange(resp.getKakaoAccount().getAgeRange())
                .birthDay(resp.getKakaoAccount().getBirthDay())
                .birthYear(resp.getKakaoAccount().getBirthYear())
                .gender(resp.getKakaoAccount().getGender())
                .profileImage(resp.getKakaoAccount().getProfile().getProfileImage())
                .build();
        return user;
    }
}

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
class KakaoAuthResponse {
    @JsonProperty("id")
    private String id;

    @JsonProperty("kakao_account")
    private KakaoAuthAccount kakaoAccount;
}

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
class KakaoAuthAccount {
    @JsonProperty("profile")
    private KakaoAuthProfile profile;

    @JsonProperty("email")
    private String email;

    @JsonProperty("age_range")
    private String ageRange;

    @JsonProperty("birthyear")
    private String birthYear;

    @JsonProperty("birthday")
    private String birthDay;

    @JsonProperty("gender")
    private String gender;
}

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
class KakaoAuthProfile {
    @JsonProperty("nickname")
    private String nickName;

    @JsonProperty("thumbnail_image_url")
    private String thumbnailImageUrl;

    @JsonProperty("profile_image_url")
    private String profileImage;
}