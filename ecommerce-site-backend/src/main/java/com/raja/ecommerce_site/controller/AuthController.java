package com.raja.ecommerce_site.controller;

import com.raja.ecommerce_site.dto.LoginRequest;
import com.raja.ecommerce_site.dto.LoginResponse;
import com.raja.ecommerce_site.dto.RegisterRequest;
import com.raja.ecommerce_site.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest user){
        authService.register(user);
        return "User registerd successfully";
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest user){
        return ResponseEntity.ok(authService.login(user));

    }


}

