package com.ashish.AppJob.service;

import com.ashish.AppJob.entity.JobEntity;
import com.ashish.AppJob.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepo repo ;

    public JobEntity addJob(JobEntity jobPost){
        repo.save(jobPost);
        return jobPost;
    }

    public List<JobEntity> getAllJobs()
    {
        return repo.findAll();
    }

    public JobEntity getJob(int postId){
        return repo .findById(postId).orElse(null);
    }

    public void deleteJob(int postId){
        repo.deleteById(postId);
    }

    public JobEntity updateJob(JobEntity jobPost){
        repo.save(jobPost);
        return jobPost;
    }

    public List<JobEntity> search(String keyword){
        return repo.findByPostProfileContainingIgnoreCaseOrPostDescContainingIgnoreCase(keyword, keyword);
    }
//    public void load() {
//        List<JobEntity> jobs = List.of(
//                new JobEntity(0, "Java Developer", "Must have good experience in core Java and advanced Java", 2,
//                        List.of("Core Java", "J2EE", "Spring Boot", "Hibernate")),
//                new JobEntity(0, "Frontend Developer", "Experience in building responsive web applications using React", 3,
//                        List.of("HTML", "CSS", "JavaScript", "React")),
//                new JobEntity(0, "Data Scientist", "Strong background in machine learning and data analysis", 4,
//                        List.of("Python", "Machine Learning", "Data Analysis")),
//                new JobEntity(0, "Network Engineer", "Design and implement computer networks for efficient data communication", 5,
//                        List.of("Networking", "Cisco", "Routing", "Switching")),
//                new JobEntity(0, "Mobile App Developer", "Experience in mobile app development for iOS and Android", 3,
//                        List.of("iOS Development", "Android Development", "Mobile App"))
//        );
//        repo.saveAll(jobs);
//    }
}
