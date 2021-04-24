package com.side.wearat.service;

import com.side.wearat.entity.Query;
import com.side.wearat.repository.SubscribeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscribeServiceImpl implements SubscribeService{

    private SubscribeRepository subscribeRepository;

    @Autowired
    public SubscribeServiceImpl(SubscribeRepository subscribeRepository) {
        this.subscribeRepository = subscribeRepository;
    }

    @Override
    public List<Query> listQueries() {
        return subscribeRepository.findAll();
    }
}
