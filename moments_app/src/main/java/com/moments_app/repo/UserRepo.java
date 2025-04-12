package com.moments_app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moments_app.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

	public Optional<User> findByUsername(String username);

}
