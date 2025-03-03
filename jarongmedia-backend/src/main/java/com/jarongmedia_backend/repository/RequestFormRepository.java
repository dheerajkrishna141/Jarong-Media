package com.jarongmedia_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jarongmedia_backend.entities.RequestForm;

public interface RequestFormRepository extends JpaRepository<RequestForm, Long>{

}
