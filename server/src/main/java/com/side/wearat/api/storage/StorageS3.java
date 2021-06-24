package com.side.wearat.api.storage;

import com.amazonaws.SDKGlobalConfiguration;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.side.wearat.config.AWSConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.UUID;

@Component("storage_s3")
public class StorageS3 implements IStorage {
    private AmazonS3 s3Client;

    private final AWSConfig awsConfig;

    @Autowired
    public StorageS3(AWSConfig awsConfig) {
        this.awsConfig = awsConfig;
    }

    @PostConstruct
    public void setS3Client() {
        System.setProperty(SDKGlobalConfiguration.DISABLE_CERT_CHECKING_SYSTEM_PROPERTY, "true");

        AWSCredentials credentials = new BasicAWSCredentials(awsConfig.getAccessKey(), awsConfig.getSecretKey());

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(awsConfig.getS3Region())
                .build();
    }

    @Override
    public String upload(MultipartFile file) throws IOException {
        String bucket = awsConfig.getS3Bucket();

        String filename = UUID.randomUUID().toString();
        String path = "upload/"+filename;

        ObjectMetadata meta = new ObjectMetadata();
        meta.setContentType("image/jpeg");

        s3Client.putObject(new PutObjectRequest(bucket, path, file.getInputStream(), meta)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return s3Client.getUrl(bucket, path).toString();
    }
}
