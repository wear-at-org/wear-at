package com.side.wearat.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SignInRequest {
    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}