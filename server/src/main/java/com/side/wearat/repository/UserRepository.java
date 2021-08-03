package com.side.wearat.repository;

import com.side.wearat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderAndProviderId(String provider, String providerId);
    boolean existsByIdNotAndEmail(Long id, String email);
    boolean existsByIdNotAndNickname(Long id, String nickname);
    Optional<User> findByNameAndBirthyearAndBirthmonthAndBirthday(String name, String birthyear, String birthmonth, String birthday);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
