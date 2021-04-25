package com.side.wearat.entity;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="query_item")
public class QueryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="query_id")
    private Long queryId;

    @Column(length=500)
    private String title;

    @Column(length=500)
    private String url;

    private Long categoryId;
}
