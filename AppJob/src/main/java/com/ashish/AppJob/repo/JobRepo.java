package com.ashish.AppJob.repo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepo extends JpaRepository<JobId, Integer> {
}
