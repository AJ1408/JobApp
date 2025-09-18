package com.ashish.AppJob.service;

import com.ashish.AppJob.entity.User;
import com.ashish.AppJob.repo.UserRepo;
import com.ashish.AppJob.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private BCryptPasswordEncoder encoder; // shared bean from config

    public User saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword())); // encode before saving
        System.out.println("Encoded Password: " + user.getPassword());
        return repo.save(user);
    }
}
