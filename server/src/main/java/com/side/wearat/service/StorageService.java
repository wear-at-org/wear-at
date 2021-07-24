package com.side.wearat.service;

import com.side.wearat.api.storage.IStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class StorageService {
    private final IStorage storage;

    @Autowired
    public StorageService(@Qualifier("storage_s3") IStorage storage) {
        this.storage = storage;
    }

    public String upload(MultipartFile file) throws IOException {
        return storage.upload(file);
    }
}