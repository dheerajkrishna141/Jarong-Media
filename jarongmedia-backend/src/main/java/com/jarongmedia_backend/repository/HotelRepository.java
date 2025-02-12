package com.jarongmedia_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.jarongmedia_backend.documents.Hotel;

public interface HotelRepository extends MongoRepository<Hotel, ObjectId> {

	Hotel findByName(String name);

}
