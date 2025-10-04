package com.ashish.AppJob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    private String postProfile;
    private String postDesc;
    private Integer reqExperience;

    @ElementCollection
    @CollectionTable(
            name = "job_tech_stack",
            joinColumns = @JoinColumn(name = "job_id")
    )
    @Column(name = "tech")
    private List<String> postTechStack;

    // Add recruiter relationship
    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = true) // allow null first
    private User recruiter;

}
