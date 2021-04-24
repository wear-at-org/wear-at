package com.side.wearat.controller;

import com.side.wearat.entity.Query;
import com.side.wearat.service.SubscribeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
