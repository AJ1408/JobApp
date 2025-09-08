package com.ashish.AppJob.repo;

import com.ashish.AppJob.entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobEntity, Integer> {
    List<JobEntity> findByPostProfileContainingIgnoreCaseOrPostDescContainingIgnoreCase(String postProfile, String postDesc);
}
