package com.side.scot.controller;

import com.side.scot.entity.User;
import com.side.scot.model.UserRequest;
//import com.side.scot.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@Slf4j
//@RestController
//@RequestMapping("/v1/auth")
//public class AuthController {
////
////    private final AuthService authService;
////
////    @Autowired
////    public AuthController(AuthService authService) {
////        this.authService = authService;
////    }
////
////    @PostMapping(path = "/login")
////    public void login() {
////        this.authService.getCode();
////    }
////
//////    @PostMapping(path = "/logout")
//////    public ResponseEntity<> logout(Long userId) {
//////
//////    }
////
////    @GetMapping(path = "/callback")
////    public void callback(@RequestBody String param) {
////        log.info("callback"+param);
////    }
//}
