package com.side.wearat.model.recommend;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RecommendRequest {
    private Long id;

    private Long subscribeId;

    private Boolean completed;

    private List<RecommendItemRequest> items;
}
