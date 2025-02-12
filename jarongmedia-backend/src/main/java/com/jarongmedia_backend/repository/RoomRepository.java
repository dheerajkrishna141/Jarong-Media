package com.jarongmedia_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jarongmedia_backend.documents.Room;

public interface RoomRepository extends MongoRepository<Room, String> {

}
