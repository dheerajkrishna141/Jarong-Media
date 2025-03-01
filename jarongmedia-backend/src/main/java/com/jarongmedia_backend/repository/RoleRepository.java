package com.jarongmedia_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarongmedia_backend.entities.Roles;
@Repository
public interface RoleRepository extends JpaRepository<Roles, Long>{

	Roles findByName(String name);

}
