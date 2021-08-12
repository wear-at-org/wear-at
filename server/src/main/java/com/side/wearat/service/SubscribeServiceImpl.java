package com.side.wearat.service;

import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.Query;
import com.side.wearat.entity.Subscribe;
import com.side.wearat.entity.SubscribeAnswer;
import com.side.wearat.model.subscribe.SubscribeRequest;
import com.side.wearat.repository.QueryRepository;
import com.side.wearat.repository.SubscribeRepository;
import com.side.wearat.repository.SubscribeRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SubscribeServiceImpl implements SubscribeService{

    private QueryRepository queryRepository;
    private SubscribeRepository subscribeRepository;
    private SubscribeRepositorySupport subscribeRepositorySupport;


    @Autowired
    public SubscribeServiceImpl(QueryRepository queryRepository, SubscribeRepository subscribeRepository, SubscribeRepositorySupport subscribeRepositorySupport) {
        this.queryRepository = queryRepository;
        this.subscribeRepository = subscribeRepository;
        this.subscribeRepositorySupport = subscribeRepositorySupport;
    }

    @Override
    public List<Query> listQueries() {
        return queryRepository.findAll();
    }

    @Override
    public Optional<Subscribe> getSubscribe(Long id) {
//        Long userId = ContextHolder.getUserID();
//        return subscribeRepository.findByIdAndUserId(id, userId);
        // user일 경우 아이디체크, 스타일리스트는 모두 접근 가능
        Optional<Subscribe> subOpt = subscribeRepository.findById(id);
        if (subOpt.isPresent()) {
            Subscribe s = subOpt.get();
            s.setProgress(getProgress(s));
        }
        return subOpt;
    }

    @Override
    public Page<Subscribe> listSubscribes(Pageable pageable) {
        Long userId = ContextHolder.getUserID();

        Page<Subscribe> res = subscribeRepository.findAllByUserId(userId, pageable);
        res.get().forEach((s) -> {
            s.setProgress(getProgress(s));
        });
        return res;
    }

    private int getProgress(Subscribe s) {
        if (s.getCompleted()) {
            return 100;
        } else {
            HashSet<Long> queryIdSet = new HashSet<>();
            for (SubscribeAnswer sa: s.getSubscribeAnswers()) {
                queryIdSet.add(sa.getQueryId());
            }
            return (int)((float)(queryIdSet.size()) / 6 * 100);
        }
    }

    @Override
    public Page<Subscribe> listByStylist(Pageable pageable, Boolean recommended) {
        Long userId = ContextHolder.getUserID();
        return subscribeRepositorySupport.findByStylist(userId, recommended, pageable);
    }

    @Override
    public Page<Subscribe> listNotRecommended(Pageable pageable) {
        return subscribeRepository.findAllByRecommendedFalseAndRecommendStartedFalseAndCompletedTrue(pageable);
    }

    @Override
    @Transactional
    public Subscribe subscribe(SubscribeRequest req) throws Exception {
        Boolean recommended = req.getRecommended();
        if (recommended != null && recommended) {
            throw new Exception("이미 추천 작업이 진행중입니다.");
        }

        Long userId = ContextHolder.getUserID();

        if (req.getId() != null) {
            subscribeRepositorySupport.deleteSubscribeAnswer(req.getId());
        }

        List<SubscribeAnswer> sas = req.getAnswers().stream().map(sar ->
            SubscribeAnswer.builder()
                    .queryId(sar.getQueryId())
                    .queryItemId(sar.getQueryItemId())
                    .answer(sar.getAnswer())
                    .build()
        ).collect(Collectors.toList());

        Subscribe s = Subscribe.builder()
                .userId(userId)
                .completed(req.getCompleted())
                .recommended(false)
                .recommendStarted(false)
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
