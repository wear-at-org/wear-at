package com.side.wearat.api.auth;

import com.side.wearat.api.auth.kakao.KakaoProvider;
import com.side.wearat.api.auth.naver.NaverProvider;
import com.side.wearat.config.AuthConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class OAuthProvider {
    private final AuthConfig authConfig;

    private HashMap<String, IProvider> providerMap;

    @Autowired
    public OAuthProvider(AuthConfig authConfig) {
        this.authConfig = authConfig;

        this.providerMap = new HashMap<>();
        this.providerMap.put("kakao", new KakaoProvider(this.authConfig));
        this.providerMap.put("naver", new NaverProvider(this.authConfig));
    }

    public IProvider getProvider(String provider) throws Exception{
        if (!this.providerMap.containsKey(provider)) {
            throw new Exception("provider doesn't exist " +   provider);
        }
        return this.providerMap.get(provider);
    }
}
