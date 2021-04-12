package com.side.wearat.config;

import lombok.Data;

@Data
public class AuthNaverConfig {
    private String codeUrl;
    private String tokenUrl;
    private String userUrl;
    private String logoutUrl;
    private String clientId;
    private String clientSecret;
}
