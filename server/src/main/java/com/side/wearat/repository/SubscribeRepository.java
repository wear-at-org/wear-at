package com.side.wearat.repository;

import com.side.wearat.entity.Subscribe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    @Override
    List<Subscribe> findAll();

    Optional<Subscribe> findById(Long id);

    Page<Subscribe> findAllByUserId(Long userId, Pageable pageable);

    Page<Subscribe> findAllByRecommendedFalseAndCompletedTrue(Pageable pageable);
}
