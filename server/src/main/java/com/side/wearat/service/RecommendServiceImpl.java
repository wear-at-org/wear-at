package com.side.wearat.service;

import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.Recommend;
import com.side.wearat.entity.RecommendItem;
import com.side.wearat.model.recommend.RecommendRequest;
import com.side.wearat.repository.RecommendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecommendServiceImpl implements RecommendService {
    private RecommendRepository recommendRepository;

    @Autowired
    public RecommendServiceImpl(RecommendRepository recommendRepository) {
        this.recommendRepository = recommendRepository;
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
    public Recommend recommend(RecommendRequest req) {
        Long userId = ContextHolder.getUserID();

        List<RecommendItem> items = req.getItems().stream().map(item -> {
            RecommendItem ri = RecommendItem.builder()
                    .title(item.getTitle())
                    .imageUrl(item.getImageUrl())
                    .linkUrl(item.getLinkUrl())
                    .brand(item.getBrand())
                    .price(item.getPrice())
                    .build();
            if (item.getId() != null) {
                ri.setId(item.getId());
            }
            return ri;
        }).collect(Collectors.toList());

        Recommend r = Recommend.builder()
                .stylistId(userId)
                .subscribeId(req.getSubscribeId())
                .recommendAt(LocalDateTime.now())
                .completed(req.getCompleted())
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
