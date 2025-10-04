package com.ashish.AppJob.controller;

import com.ashish.AppJob.entity.JobEntity;
import com.ashish.AppJob.entity.User;
import com.ashish.AppJob.repo.JobRepo;
import com.ashish.AppJob.repo.UserRepo;
import com.ashish.AppJob.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173",allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    public JobService service;

    @Autowired
    public UserRepo userRepo ;

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

    @GetMapping("/my-jobs")
    @PreAuthorize("hasRole('RECRUITER')")
    public List<JobEntity> getJobsByRecruiter(Authentication authentication) {
        // Get the email of the currently logged-in user
        String email = authentication.getName();
        // Find the user object from the database
        User recruiter = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        System.out.println(service.getJobsByRecruiter(recruiter.getUserId()));

        // Use the new repository method to find jobs by the recruiter's ID
        return service.getJobsByRecruiter(recruiter.getUserId()); // You'll create this service method
    }

    @PostMapping()
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<JobEntity> addJob(@RequestBody JobEntity jobPost, Authentication authentication) {
        String email = authentication.getName();
        User recruiter = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        JobEntity savedJob = service.addJob(jobPost, recruiter);
        return ResponseEntity.ok(savedJob);
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
