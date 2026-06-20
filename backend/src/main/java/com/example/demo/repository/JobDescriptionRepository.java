package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.JobDescription;

public interface JobDescriptionRepository
        extends JpaRepository<JobDescription, Long> {
}