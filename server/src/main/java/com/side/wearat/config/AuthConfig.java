package com.side.wearat.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties("spring.auth")
public class AuthConfig {
    private String jwtKey;
    private Integer jwtExpireInSeconds;
    private String callbackUrl;
    private String clientRedirectUrl;
    private AuthKakaoConfig kakao;
}
