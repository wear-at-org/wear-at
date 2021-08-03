package com.side.wearat.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FindEmailRequest {
    @JsonProperty("name")
    private String name;

    @JsonProperty("birthyear")
    private String birthyear;

    @JsonProperty("birthmonth")
    private String birthmonth;

    @JsonProperty("birthday")
    private String birthday;
}