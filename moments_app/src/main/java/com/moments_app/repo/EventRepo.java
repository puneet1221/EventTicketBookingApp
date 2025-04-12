package com.moments_app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moments_app.entity.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Long>{

	List<Event> findAllByAddress_City(String city);

	List<Event> findByGenreAndAddress_City(String genre,String city);
}
