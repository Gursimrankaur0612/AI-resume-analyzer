package com.example.demo.model;

import java.util.List;

public class ResumeAnalysisResponse {

    private List<String> skills;
    private int score;
    private int atsMatch;
    private List<String> missingSkills;

    public ResumeAnalysisResponse(
            List<String> skills,
            int score,
            int atsMatch,
            List<String> missingSkills) {

        this.skills = skills;
        this.score = score;
        this.atsMatch = atsMatch;
        this.missingSkills = missingSkills;
    }

    public List<String> getSkills() {
        return skills;
    }

    public int getScore() {
        return score;
    }

    public int getAtsMatch() {
        return atsMatch;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }
}