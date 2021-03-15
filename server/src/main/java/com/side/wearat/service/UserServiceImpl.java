package com.side.wearat.service;

import com.side.wearat.entity.User;
import com.side.wearat.model.user.UserRequest;
import com.side.wearat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> listUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public Optional<User> getUser(Long id) {
        return this.userRepository.findById(id);
    }

    @Override
    public User createUser(UserRequest req) {
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .build();
        return this.userRepository.save(user);
    }
}
