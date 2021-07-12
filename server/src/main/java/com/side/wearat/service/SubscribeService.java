package com.side.wearat.service;

import com.side.wearat.entity.Query;
import com.side.wearat.entity.Subscribe;
import com.side.wearat.model.subscribe.SubscribeRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SubscribeService {
    List<Query> listQueries();
    Optional<Subscribe> getSubscribe(Long id);
    Page<Subscribe> listSubscribes(Pageable pageable);
    Page<Subscribe> listNotRecommended(Pageable pageable);
    Page<Subscribe> listByStylist(Pageable pageable, Boolean recommended);
    Subscribe subscribe(SubscribeRequest req) throws Exception;
    void deleteSubscribe(Long id);
}
