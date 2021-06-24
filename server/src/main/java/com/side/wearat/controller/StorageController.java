package com.side.wearat.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.side.wearat.service.StorageService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;

@Slf4j
@RestController
@RequestMapping("/v1/storage")
public class StorageController {
    private final StorageService storageService;

    @Autowired
    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping(path = "/upload")
    public ResponseEntity<String> upload(@RequestParam("files") MultipartFile[] files) throws IOException {
        ArrayList<String> urls = new ArrayList<>();
        for (MultipartFile f: files) {
            String result = storageService.upload(f);
            urls.add(result);
        }

        JsonObject resp = new JsonObject();
        JsonArray arr = new JsonArray();
        urls.forEach((u) -> arr.add(u));
        resp.add("urls", arr);
        return new ResponseEntity(resp.toString(), HttpStatus.OK);
    }
}
