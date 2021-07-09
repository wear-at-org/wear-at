package com.side.wearat.repository;

import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPADeleteClause;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.side.wearat.entity.Subscribe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.side.wearat.entity.QRecommendItem.recommendItem;

@Repository
public class RecommendRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    public RecommendRepositorySupport(final JPAQueryFactory jpaQueryFactory) {
        super(Subscribe.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public void deleteRecommendItem(Long recommendId) {
        JPADeleteClause delete = new JPADeleteClause(getEntityManager(), recommendItem);
        delete.where(recommendItem.recommendId.eq(recommendId)).execute();
    }
}
