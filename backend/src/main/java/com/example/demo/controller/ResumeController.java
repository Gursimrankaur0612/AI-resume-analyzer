package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Resume;
import com.example.demo.model.ResumeAnalysis;
import com.example.demo.model.ResumeAnalysisResponse;
import com.example.demo.service.PdfService;
import com.example.demo.service.ResumeAnalysisService;
import com.example.demo.service.ResumeService;

@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService service;
    private final PdfService pdfService;
    private final ResumeAnalysisService analysisService;

    public ResumeController(
            ResumeService service,
            PdfService pdfService,
            ResumeAnalysisService analysisService) {

        this.service = service;
        this.pdfService = pdfService;
        this.analysisService = analysisService;
    }

    @PostMapping("/upload")
    public Resume uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email) {

        Resume resume = new Resume();

        resume.setFileName(file.getOriginalFilename());
        resume.setUploadedBy(email);

        return service.saveResume(resume);
    }

    @PostMapping("/analyze")
    public ResumeAnalysisResponse analyzeResume(
            @RequestParam("file") MultipartFile file)
            throws Exception {

        String text = pdfService.extractText(file);

        List<String> skills = pdfService.extractSkills(text);

        List<String> jobSkills = List.of(
                "java",
                "spring boot",
                "mysql",
                "rest api",
                "postgresql",
                "microservices"
        );

        int score = pdfService.calculateScore(skills);

        int atsMatch =
                service.calculateATSMatch(skills, jobSkills);

        List<String> missingSkills =
                service.findMissingSkills(skills, jobSkills);

        List<String> suggestions =
                service.generateSuggestions(missingSkills);

        ResumeAnalysis analysis = new ResumeAnalysis();

        analysis.setUserEmail("demo@test.com");
        analysis.setScore(score);
        analysis.setAtsMatch(atsMatch);
        analysis.setMissingSkills(
                String.join(", ", missingSkills));

        analysisService.save(analysis);

        return new ResumeAnalysisResponse(
                skills,
                score,
                atsMatch,
                missingSkills,
                suggestions
        );
    }
    @GetMapping("/history")
public List<ResumeAnalysis> getHistory() {
    return analysisService.getAll();
}
}