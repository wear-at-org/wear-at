package com.side.wearat.api.email;

import com.amazonaws.SDKGlobalConfiguration;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.*;
import com.side.wearat.config.AWSConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Slf4j
@Component("email_ses")
public class EmailSES implements IEmail {
    private final static String SENDER = "scot_corp@naver.com";

    private AmazonSimpleEmailService client;

    private final AWSConfig awsConfig;

    @Autowired
    public EmailSES(AWSConfig awsConfig) {
        this.awsConfig = awsConfig;
    }

    @PostConstruct
    public void setSESClient() {
        System.setProperty(SDKGlobalConfiguration.DISABLE_CERT_CHECKING_SYSTEM_PROPERTY, "true");

        AWSCredentials credentials = new BasicAWSCredentials(awsConfig.getAccessKey(), awsConfig.getSecretKey());

        client = AmazonSimpleEmailServiceClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(awsConfig.getS3Region())
                .build();
    }

    @Override
    public void send(String to, String subject, String body) {
        SendEmailRequest req = new SendEmailRequest();
        req.withSource(SENDER)
           .withDestination(new Destination().withToAddresses(to))
           .withMessage(new Message()
                   .withSubject(new Content().withCharset("UTF-8").withData(subject))
                   .withBody(new Body().withHtml(new Content().withCharset("UTF-8").withData(body))));
        client.sendEmail(req);
    }
}
