package com.side.wearat.service;

import com.side.wearat.entity.User;
import com.side.wearat.model.user.CreateUserRequest;
import com.side.wearat.model.user.PasswordRequest;
import com.side.wearat.model.user.UpdateUserRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> listUsers();

    Optional<User> getUser(Long id);

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByProvider(String provider, String providerId);

    Optional<User> getUserByNameAndBirth(String name, String year, String month, String day);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    User createUser(CreateUserRequest req);

    void updateUser(UpdateUserRequest req);

    void updatePassword(long id, String password);
}
