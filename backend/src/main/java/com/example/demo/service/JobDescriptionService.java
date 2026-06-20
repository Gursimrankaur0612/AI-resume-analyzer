package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.JobDescription;
import com.example.demo.repository.JobDescriptionRepository;

@Service
public class JobDescriptionService {

    @Autowired
    private JobDescriptionRepository repository;

    public JobDescription save(JobDescription jobDescription) {
        return repository.save(jobDescription);
    }

    public List<JobDescription> getAll() {
        return repository.findAll();
    }

    public JobDescription getById(Long id) {
        return repository.findById(id).orElse(null);
    }
}