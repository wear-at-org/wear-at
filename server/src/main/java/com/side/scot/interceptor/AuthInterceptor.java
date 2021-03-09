package com.side.scot.interceptor;

import com.side.scot.context.ContextHolder;
import com.side.scot.exception.UnAuthorizedException;
import com.side.scot.model.auth.AuthUserClaim;
import com.side.scot.service.AuthService;
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

            AuthUserClaim claim = this.authService.parseJWTToken(token);

            ContextHolder.set(ContextHolder.ContextKey.UserID, claim.getId());

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