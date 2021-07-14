package com.side.wearat.service;

import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.Recommend;
import com.side.wearat.entity.RecommendItem;
import com.side.wearat.entity.Subscribe;
import com.side.wearat.model.recommend.RecommendRequest;
import com.side.wearat.repository.RecommendRepository;
import com.side.wearat.repository.RecommendRepositorySupport;
import com.side.wearat.repository.SubscribeRepository;
import com.side.wearat.repository.SubscribeRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RecommendServiceImpl implements RecommendService {

    private RecommendRepository recommendRepository;
    private RecommendRepositorySupport recommendRepositorySupport;

    private SubscribeRepository subscribeRepository;
    private SubscribeRepositorySupport subscribeRepositorySupport;

    @Autowired
    public RecommendServiceImpl(RecommendRepository recommendRepository, SubscribeRepositorySupport subscribeRepositorySupport, RecommendRepositorySupport recommendRepositorySupport, SubscribeRepository subscribeRepository) {
        this.recommendRepository = recommendRepository;
        this.recommendRepositorySupport = recommendRepositorySupport;
        this.subscribeRepository = subscribeRepository;
        this.subscribeRepositorySupport = subscribeRepositorySupport;
    }

    @Override
    public Optional<Recommend> getRecommend(Long id) {
        return recommendRepository.findById(id);
    }

    @Override
    public List<Recommend> listRecommendBySubscribe(Long subscribeId) {
        return recommendRepository.findAllBySubscribeId(subscribeId);
    }

    @Override
    @Transactional
    public Recommend recommend(RecommendRequest req) throws Exception {
        Long userId = ContextHolder.getUserID();

        if (req.getId() == null) {
            Optional<Subscribe> s = subscribeRepository.findById(req.getSubscribeId());
            if (s.isEmpty()) {
                throw new Exception("스타일테스트 내역이 존재하지 않습니다.");
            } else if (s.get().getRecommendStarted()) {
                throw new Exception("스타일테스트 추천이 이미 진행중입니다.");
            }
            subscribeRepositorySupport.updateSubscribeRecommendStarted(req.getSubscribeId());
        } else {
            recommendRepositorySupport.deleteRecommendItem(req.getId());
        }

        Boolean completed = req.getCompleted();
        if (completed == null) {
            completed = false;
        }
        if (completed) {
            subscribeRepositorySupport.updateSubscribeRecommended(req.getSubscribeId());
        }

        List<RecommendItem> items = new ArrayList<>();
        if (req.getItems() != null) {
            items = req.getItems().stream().map(item ->
                    RecommendItem.builder()
                            .title(item.getTitle())
                            .imageUrl(item.getImageUrl())
                            .linkUrl(item.getLinkUrl())
                            .brand(item.getBrand())
                            .price(item.getPrice())
                            .build()
            ).collect(Collectors.toList());
        }
        Recommend r = Recommend.builder()
                .stylistId(userId)
                .subscribeId(req.getSubscribeId())
                .recommendAt(LocalDateTime.now())
                .completed(completed)
                .recommendItems(items)
                .createAt(LocalDateTime.now())
                .createUser(userId)
                .updateAt(LocalDateTime.now())
                .updateUser(userId)
                .build();
        if (req.getId() != null) {
            r.setId(req.getId());
        }
        return recommendRepository.save(r);
    }

    @Override
    public void deleteRecommend(Long id) {
        recommendRepository.deleteById(id);
    }
}
