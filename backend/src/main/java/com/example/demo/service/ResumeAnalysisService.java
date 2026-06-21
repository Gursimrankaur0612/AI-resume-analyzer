package com.example.demo.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.model.DashboardResponse;
import com.example.demo.model.ResumeAnalysis;
import com.example.demo.model.SkillCount;
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
    public DashboardResponse getDashboardStats()
    {

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
public List<SkillCount> getTopMissingSkills() {

    List<ResumeAnalysis> analyses = repo.findAll();

    Map<String, Long> skillCounts =
            analyses.stream()
                    .filter(a -> a.getMissingSkills() != null)
                    .flatMap(a ->
                            Arrays.stream(
                                    a.getMissingSkills().split(",")))
                    .map(String::trim)
.map(String::toLowerCase)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.groupingBy(
                            s -> s,
                            Collectors.counting()));

    return skillCounts.entrySet()
            .stream()
            .sorted((a, b) ->
                    Long.compare(
                            b.getValue(),
                            a.getValue()))
            .limit(10)
            .map(e ->
                    new SkillCount(
                            e.getKey(),
                            e.getValue()))
            .toList();
}
}