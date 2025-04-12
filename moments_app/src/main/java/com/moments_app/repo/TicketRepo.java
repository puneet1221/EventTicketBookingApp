package com.moments_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moments_app.entity.EventTicket;

@Repository
public interface TicketRepo extends JpaRepository<EventTicket, String> {

}
