package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.ResumeAnalysis;
import com.example.demo.repository.ResumeAnalysisRepository;

@Service
public class ResumeAnalysisService {

    private final ResumeAnalysisRepository repo;

    public ResumeAnalysisService(
            ResumeAnalysisRepository repo) {
        this.repo = repo;
    }

    public ResumeAnalysis save(
            ResumeAnalysis analysis) {

        return repo.save(analysis);
    }

    public List<ResumeAnalysis> getAll() {
        return repo.findAll();
    }
}