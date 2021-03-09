package com.side.scot.model.user;

import lombok.*;

@Data
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String email;
}
