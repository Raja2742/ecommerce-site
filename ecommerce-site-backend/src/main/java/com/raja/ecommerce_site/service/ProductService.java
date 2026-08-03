package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.dto.ProductRequest;
import com.raja.ecommerce_site.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse addProduct(ProductRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);

    List<ProductResponse> getProductsByCategory(String category);

    List<ProductResponse> searchProducts(String keyword);
}