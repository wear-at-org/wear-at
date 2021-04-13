package com.side.wearat.controller;

import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.User;
import com.side.wearat.model.user.CreateUserRequest;
import com.side.wearat.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "")
    public ResponseEntity<User> getUser() {
        Long userId = ContextHolder.getUserID();
        Optional<User> user = this.userService.getUser(userId);
        return user.map(u -> ResponseEntity.ok().body(u))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<User> getUserByID(@PathVariable("userId") Long userId) {
        Optional<User> user = this.userService.getUser(userId);
        return user.map(u -> ResponseEntity.ok().body(u))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(path = "check-email")
    public ResponseEntity<Void> checkEmailRegistered(@PathVariable("email") String email) {
        boolean exists = this.userService.existsByEmail(email);
        if (exists) {
            return ResponseEntity.ok().build();
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "check-nickname")
    public ResponseEntity<User> checkNicknameRegistered(@PathVariable("nickname") String nickname) {
        boolean exists = this.userService.existsByNickname(nickname);
        if (exists) {
            return ResponseEntity.ok().build();
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @PostMapping(path = "/find")
    public void find() {
    }

    @PostMapping(path = "/find-password")
    public void findPassword() {
    }

    @PutMapping(path = "")
    public User updateUser(@RequestBody CreateUserRequest req) {
        return this.userService.createUser(req);
    }
}
