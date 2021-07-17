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

import static com.side.wearat.entity.QRecommend.recommend;
import static com.side.wearat.entity.QSubscribe.subscribe;
import static com.side.wearat.entity.QSubscribeAnswer.subscribeAnswer;

@Repository
public class SubscribeRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    public SubscribeRepositorySupport(final JPAQueryFactory jpaQueryFactory) {
        super(Subscribe.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public Page<Subscribe> findByStylist(final Long id, Boolean recommended, Pageable pageable) {
        var cond = subscribe.completed.isTrue()
                .and(subscribe.recommended.isTrue())
                .and(recommend.stylistId.eq(id));
        if (recommended != null) {
            cond = cond.and(recommend.completed.eq(recommended));
        }
        JPQLQuery<Subscribe> query = jpaQueryFactory.selectFrom(subscribe)
                .join(recommend).on(subscribe.id.eq(recommend.subscribeId))
                .where(cond);

        long totalCount = query.fetchCount();
        List<Subscribe> results = getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<>(results, pageable, totalCount);

    }

    public void updateSubscribeRecommendStarted(Long id) {
        JPAUpdateClause update = new JPAUpdateClause(getEntityManager(), subscribe);
        update.set(subscribe.recommendStarted, true)
                .where(subscribe.id.eq(id))
                .execute();
    }

    public void updateSubscribeRecommended(Long id) {
        JPAUpdateClause update = new JPAUpdateClause(getEntityManager(), subscribe);
        update.set(subscribe.recommended, true)
                .where(subscribe.id.eq(id))
                .execute();
    }

    public void deleteSubscribeAnswer(Long subscribeID) {
        JPADeleteClause delete = new JPADeleteClause(getEntityManager(), subscribeAnswer);
        delete.where(subscribeAnswer.subscribeId.eq(subscribeID)).execute();
    }
}
