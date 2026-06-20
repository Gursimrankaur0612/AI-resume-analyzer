package com.example.demo.model;

import java.util.List;

public class ResumeAnalysisResponse {

    private String jobTitle;
    private String companyName;

    private List<String> skills;
    private List<String> matchedSkills;
    private List<String> missingSkills;

    private int score;
    private int atsMatch;

    private List<String> suggestions;

    public ResumeAnalysisResponse(
            String jobTitle,
            String companyName,
            List<String> skills,
            List<String> matchedSkills,
            int score,
            int atsMatch,
            List<String> missingSkills,
            List<String> suggestions) {

        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.skills = skills;
        this.matchedSkills = matchedSkills;
        this.score = score;
        this.atsMatch = atsMatch;
        this.missingSkills = missingSkills;
        this.suggestions = suggestions;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public List<String> getSkills() {
        return skills;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
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

    public List<String> getSuggestions() {
        return suggestions;
    }
}