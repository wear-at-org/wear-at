package com.side.wearat.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="recommend")
public class Recommend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long stylistId;

    @Column(nullable = false)
    private Long subscribeId;

    private LocalDateTime recommendAt;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="recommend_id", nullable = false)
    private List<RecommendItem> recommendItems;

    private Boolean completed;

    private LocalDateTime createAt;

    private Long createUser;

    private LocalDateTime updateAt;

    private Long updateUser;
}