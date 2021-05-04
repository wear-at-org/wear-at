package com.side.wearat.service;

import com.side.wearat.entity.Query;
import com.side.wearat.entity.Subscribe;
import com.side.wearat.model.subscribe.SubscribeRequest;

import java.util.List;
import java.util.Optional;

public interface SubscribeService {
    List<Query> listQueries();
    Optional<Subscribe> getSubscribe(Long id);
    List<Subscribe> getTempSubscribes();
    Subscribe subscribe(SubscribeRequest req);
    void deleteSubscribe(Long id);
}
