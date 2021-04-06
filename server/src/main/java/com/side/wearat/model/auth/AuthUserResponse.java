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
    private Long id;

    @JsonProperty("nickname")
    private String nickName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("age")
    private String age;

    @JsonProperty("birthday")
    private String birthday;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("profile_image_url")
    private String profileImage;
}
