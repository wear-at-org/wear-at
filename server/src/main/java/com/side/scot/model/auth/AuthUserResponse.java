package com.side.scot.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthUserResponse {
    @JsonProperty("id")
    private String id;

    @JsonProperty("kakao_account")
    private AuthUserResponseAccount kakaoAccount;
}
