package com.side.wearat.repository;

import com.side.wearat.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    @Override
    List<Subscribe> findAll();
    List<Subscribe> findAllByUserIdAndCompleted(Long userId, Boolean completed);
}
