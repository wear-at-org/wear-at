package com.side.wearat.service;

import com.side.wearat.api.email.IEmail;
import com.side.wearat.config.AuthConfig;
import com.side.wearat.context.ContextHolder;
import com.side.wearat.entity.Recommend;
import com.side.wearat.entity.RecommendItem;
import com.side.wearat.entity.Subscribe;
import com.side.wearat.entity.User;
import com.side.wearat.model.recommend.RecommendRequest;
import com.side.wearat.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

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

    private UserRepository userRepository;

    private final IEmail emailClient;

    private final AuthConfig authConfig;

    @Autowired
    public RecommendServiceImpl(RecommendRepository recommendRepository, SubscribeRepositorySupport subscribeRepositorySupport, RecommendRepositorySupport recommendRepositorySupport, SubscribeRepository subscribeRepository, UserRepository userRepository, @Qualifier("email_ses") IEmail emailClient, AuthConfig authConfig) {
        this.recommendRepository = recommendRepository;
        this.recommendRepositorySupport = recommendRepositorySupport;
        this.subscribeRepository = subscribeRepository;
        this.subscribeRepositorySupport = subscribeRepositorySupport;
        this.userRepository = userRepository;
        this.emailClient = emailClient;
        this.authConfig = authConfig;
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

        Optional<Subscribe> subOpt = subscribeRepository.findById(req.getSubscribeId());
        if (subOpt.isEmpty()) {
            throw new Exception("스타일테스트 내역이 존재하지 않습니다.");
        }
        Subscribe s = subOpt.get();

        if (req.getId() == null) {
            if (s.getRecommendStarted()) {
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

        List<RecommendItem> items = new ArrayList<>();
        if (req.getItems() != null) {
            items = req.getItems().stream().map(item ->
                    RecommendItem.builder()
                            .title(item.getTitle())
                            .imageUrl(item.getImageUrl())
                            .linkUrl(item.getLinkUrl())
                            .brand(item.getBrand())
                            .price(item.getPrice())
                            .description(item.getDescription())
                            .build()
            ).collect(Collectors.toList());
        }
        Recommend r = Recommend.builder()
                .stylistId(userId)
                .subscribeId(req.getSubscribeId())
                .recommendAt(LocalDateTime.now())
                .completed(completed)
                .recommendItems(items)
                .imageUrl(req.getImageUrl())
                .description(req.getDescription())
                .createAt(LocalDateTime.now())
                .createUser(userId)
                .updateAt(LocalDateTime.now())
                .updateUser(userId)
                .build();
        if (req.getId() != null) {
            r.setId(req.getId());
        }
        Recommend result = recommendRepository.save(r);

        if (completed) {
            subscribeRepositorySupport.updateSubscribeRecommended(req.getSubscribeId());
            sendRecommendEmail(s.getUserId(), result.getId());
        }
        return result;
    }

    private void sendRecommendEmail(Long userId, Long recommendID) throws Exception {
        Optional<User> u = userRepository.findById(userId);
        if (u.isEmpty()) {
            throw new Exception("user " + userId + " doesn't exists");
        }

        String receiver = u.get().getEmail();
        String subject = "[WEAR-AT] 스타일테스트 추천이 완료되었습니다.";
        String body = makeEmailTemplate().formatted(makeRecommendUrl(recommendID));
        emailClient.send(receiver, subject, body);
    }

    @Override
    public void deleteRecommend(Long id) {
        recommendRepository.deleteById(id);
    }

    private String makeRecommendUrl(Long recommendID) {
        return authConfig.getClientRedirectUrl() + "/styleTestList/detail/" + recommendID;
    }

    private String makeEmailTemplate() {
        return """
            <html>
                <body>
                   recommend completely
                   <br>
                   %s
                </body>
            </html>
        """;
    }
}
