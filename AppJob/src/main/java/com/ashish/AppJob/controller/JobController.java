package com.ashish.AppJob.controller;

import com.ashish.AppJob.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobController {

    @Autowired
    public JobService service;

    @GetMapping("home")
    public String loadData() {
        service.load();
        return "Data Loaded Successfully";
    }

}
