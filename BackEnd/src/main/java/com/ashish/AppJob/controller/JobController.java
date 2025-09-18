package com.ashish.AppJob.controller;

import com.ashish.AppJob.entity.JobEntity;
import com.ashish.AppJob.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class JobController {

    @Autowired
    public JobService service;

    @GetMapping("/")
    public String Welcome(){
        return "Welcome to Job Portal" ;
    }

    @GetMapping("/jobpost")
    public List<JobEntity> getAllJobs() {
        return service.getAllJobs();
    }

    @GetMapping("/jobpost/{postId}")
    public JobEntity getJobById (@PathVariable Integer postId){
        return service.getJob(postId);
    }
    @GetMapping("/jobpost/keyword/{keyword}")
    public List<JobEntity> searchByKeyword(@PathVariable("keyword") String keyword) {
        return service.search(keyword);
    }

    @PostMapping("/jobpost/")
    public String addJob( @RequestBody JobEntity jobPost){
        service.addJob(jobPost);
        return "Job Added Successfully";
    }

    @PutMapping("/jobpost")
    public String updateJob( @RequestBody JobEntity jobPost){
        service.updateJob(jobPost);
        return "Job Updated Successfully";
    }

    @DeleteMapping("/jobpost/{postId}")
    public String deleteJob(@PathVariable Integer postID) {
        service.deleteJob(postID);
        return "Job Deleted Successfully";
    }



    @GetMapping("/home")
    public String loadData() {
        service.load();
        return "Data Loaded Successfully";
    }

}
