package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

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

    public int calculateATSMatch(
            List<String> resumeSkills,
            List<String> jobSkills) {

        int matched = 0;

        for (String skill : resumeSkills) {
            if (jobSkills.contains(skill.toLowerCase())) {
                matched++;
            }
        }

        return (matched * 100) / jobSkills.size();
    }

    public List<String> findMissingSkills(
            List<String> resumeSkills,
            List<String> jobSkills) {

        List<String> missingSkills = new ArrayList<>();

        for (String skill : jobSkills) {

            boolean found = false;

            for (String resumeSkill : resumeSkills) {

                if (skill.equalsIgnoreCase(resumeSkill)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                missingSkills.add(skill);
            }
        }

        return missingSkills;
    }

    public List<String> generateSuggestions(
            List<String> missingSkills) {

        List<String> suggestions = new ArrayList<>();

        for (String skill : missingSkills) {
            suggestions.add("Consider learning " + skill);
        }

        return suggestions;
    }
}