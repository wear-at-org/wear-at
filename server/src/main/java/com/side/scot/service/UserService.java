package com.side.scot.service;

import com.side.scot.entity.User;
import com.side.scot.model.user.UserRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> listUsers();

    Optional<User> getUser(Long id);

    User createUser(UserRequest req);
}
