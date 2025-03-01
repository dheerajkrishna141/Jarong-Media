package com.jarongmedia_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarongmedia_backend.entities.EndUser;

@Repository
public interface EndUserRepo extends JpaRepository<EndUser, Long>{

	EndUser findByEmail(String email);

}
