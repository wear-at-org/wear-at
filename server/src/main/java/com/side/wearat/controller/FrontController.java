package com.side.wearat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class FrontController {
    @RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!v1$).*$}/**/{y:[\\w\\-]+}", "/{x:^(?!_admin$).*$}/**/{y:[\\w\\-]+}" })
    public String getWebIndex(HttpServletRequest request) {
        return "/index.html";
    }

    @RequestMapping(value = { "/_admin", "/_admin/{x:[\\w\\-]+}", "/_admin/**/{y:[\\w\\-]+}"})
    public String getAdminWebIndex(HttpServletRequest request) {
        return "/_admin/index.html";
    }
}