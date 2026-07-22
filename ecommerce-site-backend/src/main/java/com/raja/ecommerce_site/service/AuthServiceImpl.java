package com.raja.ecommerce_site.service;

import com.raja.ecommerce_site.dto.LoginRequest;
import com.raja.ecommerce_site.dto.LoginResponse;
import com.raja.ecommerce_site.dto.RegisterRequest;
import com.raja.ecommerce_site.entity.User;
import com.raja.ecommerce_site.exception.EmailAlreadyExistsException;
import com.raja.ecommerce_site.exception.InvalidCredentialsException;
import com.raja.ecommerce_site.repository.UserRepository;
import com.raja.ecommerce_site.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private  final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    public void register(RegisterRequest request ){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user=new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request ){

        Optional<User> optionalUser =userRepository.findByEmail(request.getEmail());

        if(optionalUser.isEmpty()){
            throw new InvalidCredentialsException("Invalid email or password");
        }

        User user=optionalUser.get();

        boolean matches=
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches){
            throw new InvalidCredentialsException("Invalid email or password");
        }

        UserDetails userDetails=userDetailsService.loadUserByUsername(user.getEmail());
        String jwt= jwtService.generateToken(userDetails);

        return new LoginResponse(
                jwt,
                user.getEmail(),
                user.getRole()
        );
    }


}
