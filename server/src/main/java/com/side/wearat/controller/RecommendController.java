package com.side.wearat.controller;

import com.side.wearat.entity.Recommend;
import com.side.wearat.model.recommend.RecommendRequest;
import com.side.wearat.service.RecommendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/v1/recommend")
public class RecommendController {
    private final RecommendService recommendService;

    @Autowired
    public RecommendController(RecommendService recommendService) {
        this.recommendService = recommendService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Recommend> get(@PathVariable("id") Long id) {
        Optional<Recommend> rs = this.recommendService.getRecommend(id);
        return rs.map(r -> ResponseEntity.ok().body(r))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(path = "")
    public ResponseEntity<List<Recommend>> listBySubscribe(@RequestParam("subscribeId") Long subscribeID) {
        List<Recommend> rs = this.recommendService.listRecommendBySubscribe(subscribeID);
        return ResponseEntity.ok().body(rs);
    }

    @PostMapping(path = "")
    public Recommend recommend(@RequestBody RecommendRequest req) throws Exception {
        return this.recommendService.recommend(req);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteRecommend(@PathVariable("id") Long id) {
        this.recommendService.deleteRecommend(id);
        return ResponseEntity.ok().build();
    }
}
