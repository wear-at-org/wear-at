package com.side.wearat.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length=20)
    private String provider;

    @Column(length=20)
    private String providerId;

    @Column(length=20)
    private String name;

    @Column(length=255, unique = true, nullable = false)
    private String email;

    @Column(length=50)
    private String nickname;

    @Column(length=255)
    private String password;

    @Column(length=10)
    private String gender;

    @Column(length=2)
    private String birthday;

    @Column(length=2)
    private String birthmonth;

    @Column(length=4)
    private String birthyear;

    @Column(length=10)
    private String zipCode;

    @Column(length=500)
    private String address;

    @Column(length=500)
    private String profileImage;

    @Column(length=500)
    private String detailAddress;

    private Boolean checkServiceTerms;

    private Boolean checkPrivacyPolicy;

    private Boolean checkReceivingConsent;

    private LocalDateTime createAt;

    @Column(length=100)
    private String createUser;

    private LocalDateTime updateAt;

    @Column(length=100)
    private String updateUser;
}
