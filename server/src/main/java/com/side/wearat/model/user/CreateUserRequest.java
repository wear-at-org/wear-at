package com.side.wearat.model.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CreateUserRequest {
    private String name;

    private String email;

    private String nickname;

    private String provider;

    private String providerID;

    private String password;

    private String gender;

    private String birthday;

    private String zipCode;

    private String address;

    private String detailAddress;

    private Boolean checkServiceTerms;

    private Boolean checkPrivacyPolicy;

    private Boolean checkReceivingConsent;
}
