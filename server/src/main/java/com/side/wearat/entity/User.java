package com.side.wearat.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String provider;

    private String providerId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    private String password;

    private String gender;

    private String birthday;

    private Boolean checkServiceTerms;

    private Boolean checkPrivacyPolicy;

    private Boolean checkReceivingConsent;

    private LocalDateTime createAt;

    private String createUser;

    private LocalDateTime updateAt;

    private String updateUser;
}
