package com.side.wearat.repository;

import com.side.wearat.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    List<Recommend> findAllBySubscribeId(Long subscribeId);
}