package com.side.scot.controller;

import com.side.scot.entity.User;
import com.side.scot.model.UserRequest;
import com.side.scot.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public List<User> listUsers() {
        return this.userService.listUsers();
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<User> getUser(@PathVariable("userId") Long userId) {
        Optional<User> user = this.userService.getUser(userId);
        return user.map(u -> ResponseEntity.ok().body(u))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(path = "")
    public User createUser(@RequestBody UserRequest req) {
        return this.userService.createUser(req);
    }
}
