package com.jarongmedia_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jarongmedia_backend.entities.EndUser;

public interface EndUserRepo extends JpaRepository<EndUser, Long>{

	EndUser findByEmail(String email);

}
