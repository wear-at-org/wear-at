package com.side.scot.model;

import lombok.*;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private String status;
    private String message;
}
