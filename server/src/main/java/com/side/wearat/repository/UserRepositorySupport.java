package com.side.wearat.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.side.wearat.entity.User;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import static com.side.wearat.entity.QUser.user;

@Repository
public class UserRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory jpaQueryFactory;

    public UserRepositorySupport(final JPAQueryFactory jpaQueryFactory) {
        super(User.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public void updateUserPassword(Long id, String password) {
        JPAUpdateClause update = new JPAUpdateClause(getEntityManager(), user);

        update.set(user.password, password)
                .where(user.id.eq(id))
                .execute();
    }
}
