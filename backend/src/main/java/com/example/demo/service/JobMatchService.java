package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.MatchResult;

@Service
public class JobMatchService {

    public MatchResult calculateMatch(
            List<String> resumeSkills,
            List<String> jdSkills) {

        List<String> matched = new ArrayList<>();
        List<String> missing = new ArrayList<>();

        for (String skill : jdSkills) {

            if (resumeSkills.contains(skill)) {
                matched.add(skill);
            } else {
                missing.add(skill);
            }
        }

        double percentage =
                ((double) matched.size() / jdSkills.size()) * 100;

        return new MatchResult(
                percentage,
                matched,
                missing
        );
    }
}