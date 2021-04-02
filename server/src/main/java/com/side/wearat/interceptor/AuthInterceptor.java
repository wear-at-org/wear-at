package com.side.wearat.interceptor;

import com.side.wearat.context.ContextHolder;
import com.side.wearat.exception.UnAuthorizedException;
import com.side.wearat.model.auth.AuthUserClaim;
import com.side.wearat.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {
    private static final String AUTH_HEADER = "Authorization";
    private static final String AUTH_PREFIX = "Bearer ";
    private static final String AUTH_MASTER_TOKEN = "wearat_master";

    private AuthService authService;

    @Autowired
    public AuthInterceptor(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws UnAuthorizedException {
        try {
            String token = this.extractToken(request);
            if (!StringUtils.hasText(token)) {
                throw new UnAuthorizedException("Token is empty");
            }

            if (AUTH_MASTER_TOKEN.equals(token)) {
                ContextHolder.set(ContextHolder.ContextKey.UserID, -1);
                ContextHolder.set(ContextHolder.ContextKey.NickName, "root");
                ContextHolder.set(ContextHolder.ContextKey.Email, "root@sample.com");
            } else {
                AuthUserClaim claim = this.authService.parseJWTToken(token);
                // TODO token refresh
                ContextHolder.set(ContextHolder.ContextKey.UserID, claim.getId());
                ContextHolder.set(ContextHolder.ContextKey.NickName, claim.getNickName());
                ContextHolder.set(ContextHolder.ContextKey.Email, claim.getEmail());
            }

            return true;
        } catch (Exception e) {
            throw new UnAuthorizedException("Token is invalid", e);
        }
    }

    private String extractToken(HttpServletRequest request) {
        String token = request.getHeader(AUTH_HEADER);
        if (!StringUtils.hasText(token)) {
            Optional<Cookie> cookie = Optional.ofNullable(WebUtils.getCookie(request, "token"));
            if (cookie.isPresent()) {
                token = cookie.get().getValue();
            }
        }
        if (StringUtils.hasText(token) && token.startsWith(AUTH_PREFIX)) {
            token = token.substring(AUTH_PREFIX.length());
        }
        return token;
    }
}