package com.moments_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.moments_app.entity.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {

	@Query(nativeQuery = true, value = "select * from cart where id=(select cart_id from cart_item where id=?1)")
	Cart findByCartItemId(Long id);
}
