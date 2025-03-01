package com.jarongmedia_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jarongmedia_backend.documents.Hotel;
@Repository
public interface HotelRepository extends MongoRepository<Hotel, ObjectId> {

	Hotel findByName(String name);

	String findNameById(String hotelId);

}
