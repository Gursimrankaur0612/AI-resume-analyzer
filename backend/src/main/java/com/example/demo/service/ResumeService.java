package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.model.Resume;
import com.example.demo.repository.ResumeRepository;

@Service
public class ResumeService {

    private final ResumeRepository repo;

    public ResumeService(ResumeRepository repo) {
        this.repo = repo;
    }

    public Resume saveResume(Resume resume) {
        return repo.save(resume);
    }
}