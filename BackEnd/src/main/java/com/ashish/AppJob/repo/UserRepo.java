package com.ashish.AppJob.repo;

import com.ashish.AppJob.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  UserRepo extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String Email);
    boolean existsByEmail(String email);
}
