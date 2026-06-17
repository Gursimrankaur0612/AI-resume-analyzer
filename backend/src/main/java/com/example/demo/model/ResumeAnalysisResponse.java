package com.example.demo.model;

import java.util.List;

public class ResumeAnalysisResponse {

    private List<String> skills;
    private int score;

    public ResumeAnalysisResponse(List<String> skills, int score) {
        this.skills = skills;
        this.score = score;
    }

    public List<String> getSkills() {
        return skills;
    }

    public int getScore() {
        return score;
    }
}