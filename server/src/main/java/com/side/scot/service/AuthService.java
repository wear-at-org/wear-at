package com.side.scot.service;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;

//@Slf4j
//public class AuthService {
//    public void getCode() {
//        var client = WebClient.builder()
//            .baseUrl("http://kauth.kakao.com")
//            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//            .build();
//        var resp = client.get()
//                .uri(uriBuilder -> uriBuilder
//                        .path("/oauth/authorize")
//                        .queryParam("client_id", "d27b18e9bec54a03247b4f05fa805d3f")
//                        .queryParam("redirect_uri", "http://localhost:8089/auth/callback")
//                        .queryParam("response_type", "code")
//                        .build())
//                .retrieve().bodyToMono(KakaoCodeResponse.class).block();
//        log.info("xxxxxxx"+resp.toString());
//    }
//}
//
//@Getter
//@Setter
//@ToString
//class KakaoCodeResponse {
//    private String code;
//    private String state;
//    private String error;
//    private String error_description;
//}
