package com.side.scot.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
public class AuthKakaoConfig {
    private String codeUrl;
    private String tokenUrl;
    private String userUrl;
    private String logoutUrl;
    private String clientId;
    private String clientSecret;
}
