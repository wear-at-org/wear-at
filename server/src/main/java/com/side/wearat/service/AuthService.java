package com.side.wearat.service;

import com.side.wearat.api.auth.IProvider;
import com.side.wearat.api.auth.OAuthProvider;
import com.side.wearat.api.email.IEmail;
import com.side.wearat.config.AuthConfig;
import com.side.wearat.entity.User;
import com.side.wearat.exception.UnAuthorizedException;
import com.side.wearat.model.auth.AuthUserClaim;
import com.side.wearat.model.auth.AuthUserResponse;
import com.side.wearat.model.auth.TokenResponse;
import com.side.wearat.model.auth.UserPasswordClaim;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Service
public class AuthService {

    private final AuthConfig authConfig;

    private final OAuthProvider oAuthProvider;

    private final IEmail emailClient;

    @Autowired
    public AuthService(AuthConfig authConfig, OAuthProvider oAuthProvider, @Qualifier("email_ses") IEmail emailClient) {
        this.authConfig = authConfig;
        this.oAuthProvider = oAuthProvider;
        this.emailClient = emailClient;
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
            .claim("id", claim.getId())
            .claim("provider", claim.getProvider())
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
                    .id(claim.get("id", Long.class))
                    .provider(claim.get("provider", String.class))
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
        md.update(authConfig.getPasswordSalt().getBytes(StandardCharsets.UTF_8));
        byte[] bytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for(int i=0; i< bytes.length ;i++){
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }

    public void sendPasswordEmail(User u) {
        String receiver = u.getEmail();
        String subject = "[WEAR-AT] 비밀번호 변경 안내드립니다";
        String body = makeEmailTemplate().formatted(makePasswordUrl(u));
        emailClient.send(receiver, subject, body);
    }

    private String makePasswordUrl(User u) {
        String token = createPasswordToken(u);
        return authConfig.getClientRedirectUrl() + "/password?token=" + token;
    }

    private String createPasswordToken(User u) {
        UserPasswordClaim claim = UserPasswordClaim.builder()
                .id(u.getId())
                .build();

        LocalDateTime expiredAt = LocalDateTime.now().plusSeconds(86400);
        String token = Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setHeaderParam("alg", "HS256")
                .claim("id", claim.getId())
                .setExpiration(Date.from(expiredAt.toInstant(ZoneOffset.UTC)))
                .signWith(Keys.hmacShaKeyFor(authConfig.getJwtKey().getBytes()))
                .compact()
                ;
        return token;
    }

    public UserPasswordClaim parsePasswordToken(String token) throws Exception {
        try {
            Claims claim = Jwts.parserBuilder()
                    .setSigningKey(authConfig.getJwtKey().getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            UserPasswordClaim result = UserPasswordClaim.builder()
                    .id(claim.get("id", Long.class))
                    .build();
            return result;

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

    private String makeEmailTemplate() {
        return """
            <html>
                <body>
                   password reset
                   <br>
                   %s
                </body>
            </html>
        """;
    }

    public boolean isSNSAuthCompletely(User u) {
        return StringUtils.hasText(u.getEmail())
                && StringUtils.hasText(u.getNickname())
                && StringUtils.hasText(u.getName())
                && (u.getCheckPrivacyPolicy() != null && u.getCheckPrivacyPolicy())
                && (u.getCheckServiceTerms() != null && u.getCheckServiceTerms());
    }

}
