package com.side.wearat.interceptor;

import com.side.wearat.config.AuthConfig;
import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.User;
import com.side.wearat.exception.UnAuthorizedException;
import com.side.wearat.model.auth.AuthUserClaim;
import com.side.wearat.service.AuthService;
import com.side.wearat.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.Option;
import java.util.Optional;

@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {
    private static final String AUTH_HEADER = "Authorization";
    private static final String AUTH_PREFIX = "Bearer ";
    private static final String AUTH_MASTER_TOKEN = "wearat_master";
    private static final String COOKIE_TOKEN = "_watt";

    private final AuthService authService;
    private final UserService userService;

    private final AuthConfig authConfig;

    @Autowired
    public AuthInterceptor(AuthService authService, UserService userService, AuthConfig authConfig) {
        this.authService = authService;
        this.userService = userService;
        this.authConfig = authConfig;
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
            } else {
                AuthUserClaim claim = this.authService.parseJWTToken(token);

                Optional<User> user = this.userService.getUser(claim.getId());
                if (user.isEmpty()) {
                    throw new UnAuthorizedException("User data doesn't exist");
                }

                User u = user.get();
                if (StringUtils.hasText(claim.getProvider()) && !isSNSAuthCompletely(u)) {
                    String redirectUrl = String.format("%s/sns-login", this.authConfig.getClientRedirectUrl());
                    response.sendRedirect(redirectUrl);
                    return false;
                }

                ContextHolder.set(ContextHolder.ContextKey.UserID, claim.getId());
                // TODO token refresh
            }

            return true;
        } catch (Exception e) {
            throw new UnAuthorizedException("Token is invalid", e);
        }
    }

    private String extractToken(HttpServletRequest request) {
        String token = request.getHeader(AUTH_HEADER);
        if (!StringUtils.hasText(token)) {
            Optional<Cookie> cookie = Optional.ofNullable(WebUtils.getCookie(request, COOKIE_TOKEN));
            if (cookie.isPresent()) {
                token = cookie.get().getValue();
            }
        }
        if (StringUtils.hasText(token) && token.startsWith(AUTH_PREFIX)) {
            token = token.substring(AUTH_PREFIX.length());
        }
        return token;
    }

    private boolean isSNSAuthCompletely(User u) {
        return StringUtils.hasText(u.getEmail()) && StringUtils.hasText(u.getName()) && StringUtils.hasText(u.getNickname());
    }

}