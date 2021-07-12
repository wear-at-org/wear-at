package com.side.wearat.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="subscribe")
public class Subscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private LocalDateTime subscribeAt;

    private Boolean completed;

    private Boolean recommended;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="subscribe_id", nullable = false)
    private List<SubscribeAnswer> subscribeAnswers;

    private LocalDateTime createAt;

    private Long createUser;

    private LocalDateTime updateAt;

    private Long updateUser;
}
