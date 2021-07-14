package com.side.wearat.model.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateUserRequest {
    private Long id;

    private String name;

    private String email;

    private String nickname;

    private String gender;

    private String birthday;

    private String birthmonth;

    private String birthyear;

    private String zipCode;

    private String address;

    private String detailAddress;

    private Boolean checkServiceTerms;

    private Boolean checkPrivacyPolicy;

    private Boolean checkReceivingConsent;
}
