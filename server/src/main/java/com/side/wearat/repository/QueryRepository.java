package com.side.wearat.repository;

import com.side.wearat.entity.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long> {
    @Override
    List<Query> findAll();
}
