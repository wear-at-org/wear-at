package com.side.wearat.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="recommend_item")
public class RecommendItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length=500)
    private String title;

    @Column(length=500)
    private String imageUrl;

    @Column(length=500)
    private String linkUrl;

    @Column(length=500)
    private String brand;

    @Column()
    private Long price;
}