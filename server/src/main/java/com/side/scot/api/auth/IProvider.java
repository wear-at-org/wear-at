package com.side.scot.api.auth;

import com.side.scot.model.auth.AuthUserResponse;
import com.side.scot.model.auth.TokenResponse;

public interface IProvider {
    String getCodeUrl();
    TokenResponse issueToken(String code);
    String revokeToken(String token);
    AuthUserResponse getUser(String token);
}
