package com.side.wearat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="subscribe_answer")
public class SubscribeAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @Column(name="subscribe_id", insertable = false, updatable = false)
    private Long subscribeId;

    @Column(nullable = false)
    private Long queryId;

    private Long queryItemId;

    @Column(length=500)
    private String answer;
}
