package com.raja.ecommerce_site.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDashboardResponse {
    private long totalProducts;
    private long totalOrders;
    private long totalUsers;
    private double totalRevenue;
}