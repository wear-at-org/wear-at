package com.side.wearat.service;

import com.side.wearat.entity.User;
import com.side.wearat.model.user.UserRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> listUsers();

    Optional<User> getUser(Long id);

    User createUser(UserRequest req);
}
