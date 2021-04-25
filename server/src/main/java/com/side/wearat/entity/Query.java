package com.side.wearat.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="query")
public class Query {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length=500)
    private String title;

    @Column(length=500)
    private String subtitle;

    @Column(length=20)
    private String uiType;

    @OneToMany()
    @JoinColumn(name="query_id")
    private List<QueryItem> queryItems;

    @OneToMany()
    @JoinColumn(name="query_id")
    private List<QueryCategory> queryCategories;
}
