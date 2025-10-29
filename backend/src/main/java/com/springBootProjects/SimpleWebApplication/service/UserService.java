package com.springBootProjects.SimpleWebApplication.service;

import com.springBootProjects.SimpleWebApplication.exception.UserNotLoggedInException;
import com.springBootProjects.SimpleWebApplication.model.User;
import com.springBootProjects.SimpleWebApplication.model.UserPrincipal;
import com.springBootProjects.SimpleWebApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User nicht gefunden: " + username);
        }

        return new UserPrincipal(user);
    }

    public User register(User user){
        return repo.save(user);
    }

    public User getAuthenticatedUser(){
        // checks whether the client is logged in
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()){
            throw new UserNotLoggedInException("User is nicht eingeloggt.");
        }
        String username = authentication.getName();
        return repo.findByUsername(username);
    }
}
