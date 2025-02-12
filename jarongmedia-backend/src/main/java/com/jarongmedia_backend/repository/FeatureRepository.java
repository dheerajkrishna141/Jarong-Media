package com.jarongmedia_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jarongmedia_backend.documents.Features;

public interface FeatureRepository extends MongoRepository<Features, String>{

}
