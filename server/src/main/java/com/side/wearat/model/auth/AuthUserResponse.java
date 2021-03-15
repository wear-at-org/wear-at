package com.side.wearat.model.auth;

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

    @JsonProperty("nickname")
    private String nickName;

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

    @JsonProperty("profile_image_url")
    private String profileImage;
}
