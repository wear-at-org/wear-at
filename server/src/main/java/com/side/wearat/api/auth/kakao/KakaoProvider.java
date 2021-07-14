package com.side.wearat.api.auth.kakao;

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
import java.util.HashMap;

public class KakaoProvider implements IProvider {

    private final AuthConfig authConfig;

    public KakaoProvider(AuthConfig authConfig) {
        this.authConfig = authConfig;
    }

    @Override
    public String getCodeUrl() {
        String redirectUrl = URLEncoder.encode(this.authConfig.getCallbackUrl(), StandardCharsets.UTF_8);
        String urlStr = String.format("%s?client_id=%s&redirect_uri=%s&response_type=code&state=kakao", this.authConfig.getKakao().getCodeUrl(), this.authConfig.getKakao().getClientId(), redirectUrl);
        return urlStr;
    }

    @Override
    public TokenResponse issueToken(String code) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getKakao().getTokenUrl())
                .build();

        KakaoTokenResponse resp = client.post()
                .header(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8")
                .body(BodyInserters.fromFormData("grant_type","authorization_code")
                        .with("client_id", this.authConfig.getKakao().getClientId())
                        .with("redirect_uri", this.authConfig.getCallbackUrl())
                        .with("client_secret", this.authConfig.getKakao().getClientSecret())
                        .with("code", code)
                )
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                        ,statusResp ->  statusResp.bodyToMono(String.class).map(b->new Exception(b)))
                .bodyToMono(KakaoTokenResponse.class).block();

        TokenResponse tResp = TokenResponse.builder()
                .accessToken(resp.getAccessToken())
                .refreshToken(resp.getRefreshToken())
                .tokenType(resp.getTokenType())
                .expiresIn(resp.getExpiresIn())
                .refreshTokenExpiresIn(resp.getRefreshTokenExpiresIn())
                .build();
        return tResp;
    }

    @Override
    public String revokeToken(String token) {
        WebClient client = WebClient.builder()
                .baseUrl(this.authConfig.getKakao().getLogoutUrl())
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
                .baseUrl(this.authConfig.getKakao().getUserUrl())
                .build();

        KakaoAuthResponse resp = client.get()
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", token))
                .retrieve().bodyToMono(KakaoAuthResponse.class).block();


        String birthday = "";
        String birthmonth = "";
        String birth = resp.getKakaoAccount().getBirthDay();
        if (StringUtils.hasText(birth)) {
            birthday = birth.substring(0,2);
            birthmonth = birth.substring(2,4);
        }
        AuthUserResponse user = AuthUserResponse.builder()
                .id(resp.getId().toString())
                .nickName(resp.getKakaoAccount().getProfile().getNickName())
                .email(resp.getKakaoAccount().getEmail())
                .age(resp.getKakaoAccount().getAgeRange())
                .birthday(birthday)
                .birthmonth(birthmonth)
                .birthyear(resp.getKakaoAccount().getBirthYear())
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
    private Long id;

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

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
class KakaoTokenResponse {
    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("expires_in")
    private Integer expiresIn;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("refresh_token_expires_in")
    private Integer refreshTokenExpiresIn;

    @JsonProperty("scope")
    private String scope;
}