package com.example.demo.model;

public class DashboardResponse {

    private long totalAnalyses;
    private double averageScore;
    private double averageAtsMatch;

    public DashboardResponse(
            long totalAnalyses,
            double averageScore,
            double averageAtsMatch) {

        this.totalAnalyses = totalAnalyses;
        this.averageScore = averageScore;
        this.averageAtsMatch = averageAtsMatch;
    }

    public long getTotalAnalyses() {
        return totalAnalyses;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public double getAverageAtsMatch() {
        return averageAtsMatch;
    }
}