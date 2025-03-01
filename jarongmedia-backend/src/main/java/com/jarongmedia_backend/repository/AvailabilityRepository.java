package com.jarongmedia_backend.repository;

import java.time.LocalDate;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jarongmedia_backend.documents.Availability;

@Repository
public interface AvailabilityRepository extends MongoRepository<Availability, ObjectId>{

	Availability findByRoomId(String room_id);

    Set<Availability> findByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(LocalDate checkin, LocalDate checkout);

	Set<Availability> findByStatus(String string);
}
