package com.side.wearat.controller;

import com.side.wearat.entity.Query;
import com.side.wearat.entity.Subscribe;
import com.side.wearat.model.subscribe.SubscribeRequest;
import com.side.wearat.service.SubscribeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/v1/subscribe")
public class SubscribeController {
    private final SubscribeService subscribeService;

    @Autowired
    public SubscribeController(SubscribeService subscribeService) {
        this.subscribeService = subscribeService;
    }

    @GetMapping(path = "query")
    public ResponseEntity<List<Query>> listQueries() {
        List<Query> query = this.subscribeService.listQueries();
        return ResponseEntity.ok().body(query);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Subscribe> get(@PathVariable("id") Long id) {
        Optional<Subscribe> sub = this.subscribeService.getSubscribe(id);
        return sub.map(s -> ResponseEntity.ok().body(s))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(path = "")
    public ResponseEntity<Page<Subscribe>> list(final Pageable pageable) {
        Page<Subscribe> subs = this.subscribeService.listSubscribes(pageable);
        return ResponseEntity.ok().body(subs);
    }

    @GetMapping(path = "/not-recommended")
    public ResponseEntity<Page<Subscribe>> listNotRecommended(final Pageable pageable) {
        Page<Subscribe> subs = this.subscribeService.listNotRecommended(pageable);
        return ResponseEntity.ok().body(subs);
    }

    @GetMapping(path = "/stylist")
    public ResponseEntity<Page<Subscribe>> listByStylist(@RequestParam(name="recommended", required = false) Boolean recommended, final Pageable pageable) {
        Page<Subscribe> subs = this.subscribeService.listByStylist(pageable, recommended);
        return ResponseEntity.ok().body(subs);
    }

    @PostMapping(path = "")
    public Subscribe subscribe(@RequestBody SubscribeRequest req) throws Exception {
        return this.subscribeService.subscribe(req);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteSubscribe(@PathVariable("id") Long id) {
        this.subscribeService.deleteSubscribe(id);
        return ResponseEntity.ok().build();
    }
}
