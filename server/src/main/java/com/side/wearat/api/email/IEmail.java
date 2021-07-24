package com.side.wearat.api.email;

public interface IEmail {
    void send(String to, String subject, String body);
}
