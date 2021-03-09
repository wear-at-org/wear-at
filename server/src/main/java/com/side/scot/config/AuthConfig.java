package com.side.scot.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties("spring.auth")
public class AuthConfig {
    private String codeUrl;
    private String tokenUrl;
    private String userUrl;
    private String logoutUrl;
    private String clientId;
    private String clientSecret;
    private String jwtKey;
    private Integer jwtExpireInSeconds;
    private String callbackUrl;
    private String clientRedirectUrl;
}
