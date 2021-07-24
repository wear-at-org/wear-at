package com.side.wearat.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties("spring.aws")
public class AWSConfig {
    private String accessKey;
    private String secretKey;
    private String s3Bucket;
    private String s3Region;
}