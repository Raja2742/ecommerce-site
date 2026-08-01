package com.raja.ecommerce_site.repository;

import com.raja.ecommerce_site.entity.Order;
import com.raja.ecommerce_site.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

    List<OrderItem> findByOrder(Order order);
}
