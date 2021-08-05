package com.side.wearat.controller;

import com.google.gson.JsonObject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/debug")
public class DebugController {
    @PostMapping(path = "/ping")
    public ResponseEntity<String> ping() {
        JsonObject resp = new JsonObject();
        resp.addProperty("result", "ok");
        return new ResponseEntity(resp.toString(), HttpStatus.OK);
    }
}