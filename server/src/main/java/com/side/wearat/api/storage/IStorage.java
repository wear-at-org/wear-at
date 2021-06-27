package com.side.wearat.api.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IStorage {
    String upload(MultipartFile file) throws IOException;
}
