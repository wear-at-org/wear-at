package com.side.wearat.service;

import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.User;
import com.side.wearat.model.user.CreateUserRequest;
import com.side.wearat.model.user.UpdateUserRequest;
import com.side.wearat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public Optional<User> getUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> getUserByProvider(String provider, String providerId) {
        return this.userRepository.findByProviderAndProviderId(provider, providerId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByNickname(String nickname) {
        return this.userRepository.existsByNickname(nickname);
    }

    @Override
    public User createUser(CreateUserRequest req) {
        User user = User.builder()
                .name(req.getName())
                .provider(req.getProvider())
                .providerId(req.getProviderID())
                .email(req.getEmail())
                .nickname(req.getNickname())
                .password(req.getPassword())
                .gender(req.getGender())
                .birthday(req.getBirthday())
                .zipCode(req.getZipCode())
                .address(req.getAddress())
                .detailAddress(req.getDetailAddress())
                .checkReceivingConsent(req.getCheckReceivingConsent())
                .checkPrivacyPolicy(req.getCheckPrivacyPolicy())
                .checkServiceTerms(req.getCheckServiceTerms())
                .createAt(LocalDateTime.now())
                .createUser(req.getEmail())
                .updateAt(LocalDateTime.now())
                .updateUser(req.getEmail())
                .build();
        return this.userRepository.save(user);
    }

    public void updateUser(UpdateUserRequest req) {
        String userId = ContextHolder.get(ContextHolder.ContextKey.UserID).toString();
        Optional<User> userOpt = this.getUser(req.getId());
        userOpt.ifPresent(user -> {
            if (!req.getName().isEmpty()) {
                user.setName(req.getName());
            }
            if (!req.getEmail().isEmpty()) {
                user.setEmail(req.getEmail());
            }
            if (!req.getNickname().isEmpty()) {
                user.setNickname(req.getNickname());
            }
            if (!req.getGender().isEmpty()) {
                user.setGender(req.getGender());
            }
            if (!req.getBirthday().isEmpty()) {
                user.setBirthday(req.getBirthday());
            }
            if (!req.getZipCode().isEmpty()) {
                user.setZipCode(req.getZipCode());
            }
            if (!req.getAddress().isEmpty()) {
                user.setAddress(req.getAddress());
            }
            if (!req.getDetailAddress().isEmpty()) {
                user.setDetailAddress(req.getDetailAddress());
            }
            user.setCheckServiceTerms(req.getCheckServiceTerms());
            user.setCheckPrivacyPolicy(req.getCheckPrivacyPolicy());
            user.setCheckReceivingConsent(req.getCheckReceivingConsent());
            user.setUpdateUser(userId);
            user.setUpdateAt(LocalDateTime.now());
            this.userRepository.save(user);
        });
    }
}
