package com.side.wearat.model.recommend;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RecommendItemRequest {
    private Long id;

    private String title;

    private String imageUrl;

    private String linkUrl;

    private String brand;

    private Long price;

    private String description;
}
