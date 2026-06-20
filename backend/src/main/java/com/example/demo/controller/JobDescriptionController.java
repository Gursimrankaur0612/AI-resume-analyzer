package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.JobDescription;
import com.example.demo.service.JobDescriptionService;

@RestController
@RequestMapping("/api/jobdescriptions")
public class JobDescriptionController {

    @Autowired
    private JobDescriptionService service;

    @PostMapping
    public JobDescription createJobDescription(
            @RequestBody JobDescription jobDescription) {

        return service.save(jobDescription);
    }

    @GetMapping
    public List<JobDescription> getAllJobDescriptions() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public JobDescription getJobDescriptionById(
            @PathVariable Long id) {

        return service.getById(id);
    }
}