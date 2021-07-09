package com.side.wearat.service;

import com.side.wearat.entity.Recommend;
import com.side.wearat.model.recommend.RecommendRequest;

import java.util.List;
import java.util.Optional;

public interface RecommendService {
    Optional<Recommend> getRecommend(Long id);
    List<Recommend> listRecommendBySubscribe(Long subscribeId);
    Recommend recommend(RecommendRequest req) throws Exception;
    void deleteRecommend(Long id);
}
