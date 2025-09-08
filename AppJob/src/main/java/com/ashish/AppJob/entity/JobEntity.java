package com.ashish.AppJob.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;
    private String postProfile;
    private String postDesc;
    private Integer reqExperience;
    private String postTechStack; // Store as a comma-separated string

}
