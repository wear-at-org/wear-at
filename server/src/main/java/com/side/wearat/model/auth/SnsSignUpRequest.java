package com.side.wearat.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SnsSignUpRequest {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("email")
    private String email;

    @JsonProperty("name")
    private String name;

    @JsonProperty("nickname")
    private String nickname;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("birthday")
    private String birthday;

    @JsonProperty("birthmonth")
    private String birthmonth;

    @JsonProperty("birthyear")
    private String birthyear;

    @JsonProperty("checkServiceTerms")
    private Boolean checkServiceTerms;

    @JsonProperty("checkPrivacyPolicy")
    private Boolean checkPrivacyPolicy;

    @JsonProperty("checkReceivingConsent")
    private Boolean checkReceivingConsent;

}