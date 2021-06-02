package com.side.wearat.service;

import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.Query;
import com.side.wearat.entity.Subscribe;
import com.side.wearat.entity.SubscribeAnswer;
import com.side.wearat.model.subscribe.SubscribeRequest;
import com.side.wearat.repository.QueryRepository;
import com.side.wearat.repository.SubscribeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubscribeServiceImpl implements SubscribeService{

    private QueryRepository queryRepository;
    private SubscribeRepository subscribeRepository;


    @Autowired
    public SubscribeServiceImpl(QueryRepository queryRepository, SubscribeRepository subscribeRepository) {
        this.queryRepository = queryRepository;
        this.subscribeRepository = subscribeRepository;
    }

    @Override
    public List<Query> listQueries() {
        return queryRepository.findAll();
    }

    @Override
    public Optional<Subscribe> getSubscribe(Long id) {
        return subscribeRepository.findById(id);
    }

    @Override
    public List<Subscribe> getTempSubscribes() {
        Long userId = ContextHolder.getUserID();
        return subscribeRepository.findAllByUserIdAndCompleted(userId, false);
    }

    @Override
    @Transactional
    public Subscribe subscribe(SubscribeRequest req) {
        Long userId = ContextHolder.getUserID();

        List<SubscribeAnswer> sas = req.getAnswers().stream().map(sar -> {
            SubscribeAnswer sa = SubscribeAnswer.builder()
                    .queryId(sar.getQueryId())
                    .queryItemId(sar.getQueryItemId())
                    .answer(sar.getAnswer())
                    .build();
            if (sar.getId() != null) {
                sa.setId(sar.getId());
            }
            return sa;
        }).collect(Collectors.toList());

        Subscribe s = Subscribe.builder()
                .userId(userId)
                .completed(req.getCompleted())
                .subscribeAnswers(sas)
                .subscribeAt(LocalDateTime.now())
                .createAt(LocalDateTime.now())
                .createUser(userId)
                .updateAt(LocalDateTime.now())
                .updateUser(userId)
                .build();
        if (req.getId() != null) {
            s.setId(req.getId());
        }
        return subscribeRepository.save(s);
    }

    @Override
    public void deleteSubscribe(Long id) {
        subscribeRepository.deleteById(id);
    }
}
