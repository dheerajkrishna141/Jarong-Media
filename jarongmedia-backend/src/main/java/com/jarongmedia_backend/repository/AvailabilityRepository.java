package com.jarongmedia_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.jarongmedia_backend.documents.Availability;

public interface AvailabilityRepository extends MongoRepository<Availability, ObjectId>{

	Availability findByRoomId(String room_id);

}
