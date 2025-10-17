package com.springBootProjects.SimpleWebApplication.service;

import com.springBootProjects.SimpleWebApplication.model.User;
import com.springBootProjects.SimpleWebApplication.model.UserPrincipal;
import com.springBootProjects.SimpleWebApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return new UserPrincipal(user);
    }

    public User register(User user){
        return repo.save(user);
    }
}
