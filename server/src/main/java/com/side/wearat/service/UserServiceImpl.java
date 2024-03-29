package com.side.wearat.service;

import com.side.wearat.entity.User;
import com.side.wearat.model.user.CreateUserRequest;
import com.side.wearat.model.user.UpdateUserRequest;
import com.side.wearat.repository.UserRepository;
import com.side.wearat.repository.UserRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private UserRepositorySupport userRepositorySupport;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserRepositorySupport userRepositorySupport) {
        this.userRepository = userRepository;
        this.userRepositorySupport = userRepositorySupport;
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
    public Optional<User> getUserByNameAndBirth(String name, String year, String month, String day) {
        return this.userRepository.findFirstByNameAndBirthyearAndBirthmonthAndBirthday(name, year, month, day);
    }

    @Override
    public boolean existsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByNickname(Long id, String nickname) {
        return this.userRepository.existsByIdNotAndNickname(id, nickname);
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
                .birthmonth(req.getBirthmonth())
                .birthyear(req.getBirthyear())
                .zipCode(req.getZipCode())
                .address(req.getAddress())
                .detailAddress(req.getDetailAddress())
                .profileImage(req.getProfileImage())
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

    @Override
    public void updateUser(UpdateUserRequest req) {
        Optional<User> userOpt = this.getUser(req.getId());
        userOpt.ifPresent(user -> {
            if (StringUtils.hasText(req.getName())) {
                user.setName(req.getName());
            }
            if (StringUtils.hasText(req.getEmail())) {
                user.setEmail(req.getEmail());
            }
            if (StringUtils.hasText(req.getNickname())) {
                user.setNickname(req.getNickname());
            }
            if (StringUtils.hasText(req.getGender())) {
                user.setGender(req.getGender());
            }
            if (StringUtils.hasText(req.getBirthday())) {
                user.setBirthday(req.getBirthday());
            }
            if (StringUtils.hasText(req.getBirthmonth())) {
                user.setBirthmonth(req.getBirthmonth());
            }
            if (StringUtils.hasText(req.getBirthyear())) {
                user.setBirthyear(req.getBirthyear());
            }
            if (StringUtils.hasText(req.getZipCode())) {
                user.setZipCode(req.getZipCode());
            }
            if (StringUtils.hasText(req.getAddress())) {
                user.setAddress(req.getAddress());
            }
            if (StringUtils.hasText(req.getDetailAddress())) {
                user.setDetailAddress(req.getDetailAddress());
            }
            if (StringUtils.hasText(req.getProfileImage())) {
                user.setProfileImage(req.getProfileImage());
            }
            if (req.getCheckServiceTerms() != null) {
                user.setCheckServiceTerms(req.getCheckServiceTerms());
            }
            if (req.getCheckPrivacyPolicy() != null) {
                user.setCheckPrivacyPolicy(req.getCheckPrivacyPolicy());
            }
            if (req.getCheckServiceTerms() != null) {
                user.setCheckReceivingConsent(req.getCheckReceivingConsent());
            }
            user.setUpdateUser(req.getId().toString());
            user.setUpdateAt(LocalDateTime.now());
            this.userRepository.save(user);
        });
    }

    @Override
    @Transactional
    public void updatePassword(long id, String password) {
        userRepositorySupport.updateUserPassword(id, password);
    }
}
