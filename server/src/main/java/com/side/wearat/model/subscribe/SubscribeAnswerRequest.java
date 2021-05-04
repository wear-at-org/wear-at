package com.side.wearat.model.subscribe;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SubscribeAnswerRequest {
    private Long queryId;

    private Long queryItemId;

    private String answer;
}
