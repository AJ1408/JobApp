package com.ashish.AppJob.controller;

import com.ashish.AppJob.entity.JobEntity;
import com.ashish.AppJob.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String addJob( @RequestBody JobEntity jobPost){
        service.addJob(jobPost);
        return "Job Added Successfully";
    }

    @PutMapping("/{postId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public String updateJob( @PathVariable Integer postId, @RequestBody JobEntity jobPost){
        jobPost.setPostId(postId);
        service.updateJob(jobPost);
        return "Job Updated Successfully";
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
