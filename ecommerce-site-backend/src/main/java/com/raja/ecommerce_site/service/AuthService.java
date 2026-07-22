package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.dto.LoginRequest;
import com.raja.ecommerce_site.dto.LoginResponse;
import com.raja.ecommerce_site.dto.RegisterRequest;


public interface AuthService {


      public void  register(RegisterRequest user);

      public LoginResponse login(LoginRequest user);

}
