package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.DashboardResponse;
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
    public DashboardResponse getDashboardStats() {

    List<ResumeAnalysis> analyses = repo.findAll();

    long total = analyses.size();

    double avgScore = analyses.stream()
            .mapToInt(ResumeAnalysis::getScore)
            .average()
            .orElse(0);

    double avgAts = analyses.stream()
            .mapToInt(ResumeAnalysis::getAtsMatch)
            .average()
            .orElse(0);

    return new DashboardResponse(
            total,
            avgScore,
            avgAts
    );
}
}