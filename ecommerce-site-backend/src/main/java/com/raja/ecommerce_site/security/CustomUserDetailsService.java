package com.raja.ecommerce_site.security;

import com.raja.ecommerce_site.entity.User;
import com.raja.ecommerce_site.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
        return new CustomUserDetails(user);
    }
}
