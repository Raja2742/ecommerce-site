
package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.dto.AdminDashboardResponse;
import com.raja.ecommerce_site.repository.OrderRepository;
import com.raja.ecommerce_site.repository.ProductRepository;
import com.raja.ecommerce_site.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;


    @Override
    public AdminDashboardResponse getDashboardData() {

        long totalProducts = productRepository.count();

        long totalOrders = orderRepository.count();

        long totalUsers = userRepository.count();

        Double revenue = orderRepository.getTotalRevenue();

        double totalRevenue = revenue != null ? revenue : 0.0;


        return new AdminDashboardResponse(

                totalProducts,

                totalOrders,

                totalUsers,

                totalRevenue

        );

    }

}

