package com.side.wearat.model.subscribe;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SubscribeRequest {
    private Long id;

    private Boolean completed;

    private Boolean recommended;

    private List<SubscribeAnswerRequest> answers;
}
