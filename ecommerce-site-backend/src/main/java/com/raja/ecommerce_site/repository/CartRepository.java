package com.raja.ecommerce_site.repository;

import com.raja.ecommerce_site.entity.CartItem;
import com.raja.ecommerce_site.entity.Product;
import com.raja.ecommerce_site.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem,Long> {


    Optional<CartItem> findByUserAndProduct(User user, Product product);

    List<CartItem> findByUser(User user);

    void deleteByUser(User user);
}
