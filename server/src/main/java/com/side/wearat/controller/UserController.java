package com.side.wearat.controller;

import com.google.gson.JsonObject;
import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.User;
import com.side.wearat.model.user.UpdateUserRequest;
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

    @PutMapping(path = "")
    public ResponseEntity<Void> updateUser(@RequestBody UpdateUserRequest req) {
        req.setId(ContextHolder.getUserID());
        this.userService.updateUser(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/{userId}/partial")
    public ResponseEntity<User> getUserByID(@PathVariable("userId") Long userId) {
        Optional<User> user = this.userService.getUser(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User u = user.get();
        User result = User.builder()
                .id(u.getId())
                .provider(u.getProvider())
                .providerId(u.getProviderId())
                .name(u.getName())
                .email(u.getEmail())
                .nickname(u.getNickname())
                .gender(u.getGender())
                .birthday(u.getBirthday())
                .birthmonth(u.getBirthmonth())
                .birthyear(u.getBirthyear())
                .build();
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(path = "/check-email")
    public ResponseEntity<String> checkEmailRegistered(@RequestParam(name = "id", required = false) Long id, @RequestParam("email") String email) {
        if (id == null) {
            id = -999L;
        }
        boolean duplicated = this.userService.existsByEmail(email);

        JsonObject resp = new JsonObject();
        resp.addProperty("duplicated", duplicated);
        return new ResponseEntity(resp.toString(), HttpStatus.OK);
    }

    @GetMapping(path = "/check-nickname")
    public ResponseEntity<String> checkNicknameRegistered(@RequestParam(name = "id", required = false) Long id, @RequestParam("nickname") String nickname) {
        if (id == null) {
            id = -999L;
        }
        boolean duplicated = this.userService.existsByNickname(id, nickname);

        JsonObject resp = new JsonObject();
        resp.addProperty("duplicated", duplicated);
        return new ResponseEntity(resp.toString(), HttpStatus.OK);
    }
}
