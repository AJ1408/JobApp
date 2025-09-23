package com.ashish.AppJob.controller;

import com.ashish.AppJob.entity.JobEntity;
import com.ashish.AppJob.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173",allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    public JobService service;

// //   @GetMapping("/")
//    public String Welcome(){
//        return "Welcome to Job Portal" ;
//    }

    //ToGetAllJobs
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<JobEntity> getAllJobs() {
        return service.getAllJobs();
    }
    //GetJobById
    @GetMapping("/{postId}")
    @PreAuthorize("isAuthenticated()")
    public JobEntity getJobById(@PathVariable Integer postId){
        return service.getJob(postId);
    }
    //SearchJob
    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    public List<JobEntity> searchByKeyword(@RequestParam("keyword") String keyword) {
        return service.search(keyword);
    }

    @PostMapping()
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<JobEntity> addJob(@RequestBody JobEntity jobPost) {
        try {
            // Debug log the received data
            System.out.println("Received job data: " + jobPost);
            System.out.println("Tech stack received: " + jobPost.getPostTechStack());

            JobEntity savedJob = service.addJob(jobPost);  // Make sure service.addJob returns JobEntity

            // Debug log the saved data
            System.out.println("Saved job: " + savedJob);
            System.out.println("Saved tech stack: " + savedJob.getPostTechStack());

            return ResponseEntity.ok(savedJob);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to add job: " + e.getMessage());
        }
    }

    @PutMapping("/{postId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<JobEntity> updateJob(@PathVariable Integer postId, @RequestBody JobEntity jobPost) {
        try {
            // Debug log the received data
            System.out.println("Received job data: " + jobPost);
            System.out.println("Tech stack received: " + jobPost.getPostTechStack());

            jobPost.setPostId(postId);
            JobEntity updatedJob = service.updateJob(jobPost);  // Make sure service.updateJob returns JobEntity

            // Debug log the saved data
            System.out.println("Updated job: " + updatedJob);
            System.out.println("Saved tech stack: " + updatedJob.getPostTechStack());

            return ResponseEntity.ok(updatedJob);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update job: " + e.getMessage());
        }
    }

    @DeleteMapping("/{postId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public String deleteJob(@PathVariable Integer postId) {
        service.deleteJob(postId);
        return "Job Deleted Successfully";
    }

//    @GetMapping("/home")
//    public String loadData() {
//        service.load();
//        return "Data Loaded Successfully";
//    }

}
