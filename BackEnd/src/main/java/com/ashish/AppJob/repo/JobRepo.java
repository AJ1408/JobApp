package com.ashish.AppJob.repo;

import com.ashish.AppJob.entity.JobEntity;
import com.ashish.AppJob.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobEntity, Integer> {
    List<JobEntity> findByPostProfileContainingIgnoreCaseOrPostDescContainingIgnoreCase(String postProfile, String postDesc);

    // for finding job by recruiter ID
    List<JobEntity> findByRecruiter_UserId(int userId);


}
