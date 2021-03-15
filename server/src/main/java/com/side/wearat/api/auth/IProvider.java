package com.side.wearat.api.auth;

import com.side.wearat.model.auth.AuthUserResponse;
import com.side.wearat.model.auth.TokenResponse;

public interface IProvider {
    String getCodeUrl();
    TokenResponse issueToken(String code);
    String revokeToken(String token);
    AuthUserResponse getUser(String token);
}
