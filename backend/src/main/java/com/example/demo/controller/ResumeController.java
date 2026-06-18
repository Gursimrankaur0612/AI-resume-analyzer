package com.example.demo.controller;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Resume;
import com.example.demo.model.ResumeAnalysisResponse;
import com.example.demo.service.PdfService;
import com.example.demo.service.ResumeService;

@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService service;
    private final PdfService pdfService;

    public ResumeController(ResumeService service, PdfService pdfService) {
        this.service = service;
        this.pdfService = pdfService;
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

int atsMatch = service.calculateATSMatch(skills, jobSkills);

List<String> missingSkills = service.findMissingSkills(skills, jobSkills);
System.out.println("ATS Match = " + atsMatch);
System.out.println("Missing Skills = " + missingSkills);
return new ResumeAnalysisResponse(skills, score, atsMatch, missingSkills);
}
}