package com.side.wearat.service;

import com.side.wearat.api.auth.IProvider;
import com.side.wearat.api.auth.OAuthProvider;
import com.side.wearat.config.AuthConfig;
import com.side.wearat.exception.UnAuthorizedException;
import com.side.wearat.model.auth.AuthUserClaim;
import com.side.wearat.model.auth.AuthUserResponse;
import com.side.wearat.model.auth.SignInRequest;
import com.side.wearat.model.auth.TokenResponse;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Slf4j
@Service
public class AuthService {

    private static final String PASSWORD_SALT = "fjawliefjl769qlehw5665";

    private final AuthConfig authConfig;

    private final OAuthProvider oAuthProvider;

    @Autowired
    public AuthService(AuthConfig authConfig, OAuthProvider oAuthProvider) {
        this.authConfig = authConfig;
        this.oAuthProvider = oAuthProvider;
    }

    public String getCodeUrl(String provider) throws Exception {
        IProvider iProvider = this.oAuthProvider.getProvider(provider);
        return iProvider.getCodeUrl();
    }

    public TokenResponse issueToken(String provider, String code) throws Exception {
        IProvider iProvider = this.oAuthProvider.getProvider(provider);
        return iProvider.issueToken(code);
    }

    public String revokeToken(String provider, String token) throws Exception {
        IProvider iProvider = this.oAuthProvider.getProvider(provider);
        return iProvider.revokeToken(token);
    }

    public AuthUserResponse getUser(String provider, String token) throws Exception {
        IProvider iProvider = this.oAuthProvider.getProvider(provider);
        return iProvider.getUser(token);
    }

    public String generateJWTToken(AuthUserClaim claim) {
        LocalDateTime expiredAt = LocalDateTime.now().plusSeconds(this.authConfig.getJwtExpireInSeconds());
        String token = Jwts.builder()
            .setHeaderParam("typ","JWT")
            .setHeaderParam("alg", "HS256")
            .claim("accessToken", claim.getAccessToken())
            .claim("refreshToken", claim.getRefreshToken())
            .claim("id", claim.getId())
            .claim("nickName", claim.getNickName())
            .setExpiration(Date.from(expiredAt.toInstant(ZoneOffset.UTC)))
            .signWith(Keys.hmacShaKeyFor(this.authConfig.getJwtKey().getBytes()))
            .compact()
        ;
        return token;
    }

    public AuthUserClaim parseJWTToken(String token) throws UnAuthorizedException {
        try {
            Claims claim = Jwts.parserBuilder()
                    .setSigningKey(this.authConfig.getJwtKey().getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            AuthUserClaim user = AuthUserClaim.builder()
                    .accessToken(claim.get("accessToken", String.class))
                    .refreshToken(claim.get("refreshToken", String.class))
                    .id(claim.get("id", Long.class))
                    .nickName(claim.get("nickName", String.class))
                    .email(claim.get("email", String.class))
                    .build();
            return user;

        } catch (SignatureException ex) {
            throw new UnAuthorizedException("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            throw new UnAuthorizedException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new UnAuthorizedException("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new UnAuthorizedException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new UnAuthorizedException("JWT claims string is empty.");
        } catch (Exception ex) {
            throw new UnAuthorizedException("parse jwt token exception", ex);
        }
    }

    public String encryptPassword(String password) throws Exception{
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(PASSWORD_SALT.getBytes(StandardCharsets.UTF_8));
        byte[] bytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for(int i=0; i< bytes.length ;i++){
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }
}
