package com.jarongmedia_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jarongmedia_backend.documents.Features;

@Repository
public interface FeatureRepository extends MongoRepository<Features, String>{

}
