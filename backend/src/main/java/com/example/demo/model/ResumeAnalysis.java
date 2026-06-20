package com.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private int score;

    private int atsMatch;
    private Long jobId;

private String jobTitle;

private String companyName;

    @Column(length = 1000)
    private String missingSkills;

    private LocalDateTime analyzedAt = LocalDateTime.now();

    public ResumeAnalysis() {}

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getAtsMatch() {
        return atsMatch;
    }

    public void setAtsMatch(int atsMatch) {
        this.atsMatch = atsMatch;
    }

    public String getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(String missingSkills) {
        this.missingSkills = missingSkills;
    }

    public LocalDateTime getAnalyzedAt() {
        return analyzedAt;
    }
    public Long getJobId() {
    return jobId;
}

public void setJobId(Long jobId) {
    this.jobId = jobId;
}

public String getJobTitle() {
    return jobTitle;
}

public void setJobTitle(String jobTitle) {
    this.jobTitle = jobTitle;
}

public String getCompanyName() {
    return companyName;
}

public void setCompanyName(String companyName) {
    this.companyName = companyName;
}
}