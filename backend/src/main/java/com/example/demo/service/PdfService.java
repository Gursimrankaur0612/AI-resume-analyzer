package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PdfService {

    public String extractText(MultipartFile file) throws IOException {

        PDDocument document = PDDocument.load(file.getInputStream());

        PDFTextStripper stripper = new PDFTextStripper();

        String text = stripper.getText(document);

        document.close();

        return text;
    }
   public List<String> extractSkills(String text) {

    List<String> skills = new ArrayList<>();

    String[] knownSkills = {
            "Java",
            "Spring Boot",
            "MySQL",
            "AWS",
            "React",
            "Python",
            "JavaScript",
            "Docker",
            "Git",
            "MongoDB",
            "Hibernate",
            "JPA",
            "HTML",
            "CSS",
            "Bootstrap",
            "Node.js",
            "REST API",
            "Microservices"
    };

    for (String skill : knownSkills) {

        if (text.toLowerCase().contains(skill.toLowerCase())) {
            skills.add(skill);
        }
    }

    return skills;
}
public int calculateScore(List<String> skills) {

    int score = 0;

    score += skills.size() * 10;

    if(score > 100) {
        score = 100;
    }

    return score;
}
}