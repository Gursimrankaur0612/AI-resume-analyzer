package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.DashboardResponse;
import com.example.demo.model.JobDescription;
import com.example.demo.model.Resume;
import com.example.demo.model.ResumeAnalysis;
import com.example.demo.model.ResumeAnalysisResponse;
import com.example.demo.model.SkillCount;
import com.example.demo.repository.JobDescriptionRepository;
import com.example.demo.repository.ResumeAnalysisRepository;
import com.example.demo.service.GeminiService;
import com.example.demo.service.PdfReportService;
import com.example.demo.service.PdfService;
import com.example.demo.service.ResumeAnalysisService;
import com.example.demo.service.ResumeService;

@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService service;
    private final PdfService pdfService;
    private final ResumeAnalysisService analysisService;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final PdfReportService pdfReportService;
    private final ResumeAnalysisRepository analysisRepository;
    private final GeminiService geminiService;

public ResumeController(
       ResumeService service,
        PdfService pdfService,
        ResumeAnalysisService analysisService,
        JobDescriptionRepository jobDescriptionRepository,
        PdfReportService pdfReportService,
        ResumeAnalysisRepository analysisRepository,
        GeminiService geminiService) {

        this.service = service;
        this.pdfService = pdfService;
        this.analysisService = analysisService;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.pdfReportService = pdfReportService;
        this.analysisRepository = analysisRepository;
        this.geminiService = geminiService;
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
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobId") Long jobId)
            throws Exception {

        String text = pdfService.extractText(file);

        List<String> skills = pdfService.extractSkills(text);

        JobDescription jobDescription =
                jobDescriptionRepository.findById(jobId)
                .orElse(null);

        List<String> jobSkills =
                jobDescription != null
                ? pdfService.extractSkills(
                        jobDescription.getDescription())
                : List.of();

        int score = pdfService.calculateScore(skills);

        int atsMatch =
                service.calculateATSMatch(skills, jobSkills);

        List<String> missingSkills =
                service.findMissingSkills(skills, jobSkills);
        List<String> matchedSkills = skills.stream()
        .filter(jobSkills::contains)
        .toList();

        List<String> suggestions =
                service.generateSuggestions(missingSkills);
                String aiFeedback =
        geminiService.generateFeedback(
                text,
                jobDescription != null
                        ? jobDescription.getDescription()
                        : ""
        );

        ResumeAnalysis analysis = new ResumeAnalysis();

        analysis.setUserEmail("demo@test.com");
        //analysis.setAiFeedback(aiFeedback);

        analysis.setMissingSkills(
                String.join(", ", missingSkills));
        analysis.setJobId(jobId);
        analysis.setJobTitle(jobDescription != null ? jobDescription.getJobTitle() : null);
        analysis.setCompanyName(jobDescription != null ? jobDescription.getCompanyName() : null);
         analysis.setScore(score);
        analysis.setAtsMatch(atsMatch);


        analysisService.save(analysis);

       return new ResumeAnalysisResponse(
        jobDescription != null ? jobDescription.getJobTitle() : null,
        jobDescription != null ? jobDescription.getCompanyName() : null,
        skills,
        matchedSkills,
        score,
        atsMatch,
        missingSkills,
        suggestions,
        aiFeedback
);
    }
    @PostMapping("/interview-questions")
public String generateInterviewQuestions(
        @RequestParam("file") MultipartFile file,
        @RequestParam("jobId") Long jobId)
        throws Exception {
                System.out.println("Interview endpoint reached!");

    String resumeText = pdfService.extractText(file);

    JobDescription jobDescription =
            jobDescriptionRepository.findById(jobId)
            .orElseThrow();

    return geminiService.generateInterviewQuestions(
            resumeText,
            jobDescription.getDescription());
}
    @GetMapping("/dashboard")
public DashboardResponse getDashboard() {
    return analysisService.getDashboardStats();
}

    @GetMapping("/history")
    public List<ResumeAnalysis> getHistory() {
        return analysisService.getAll();
    }
    @GetMapping("/top-missing-skills")
public List<SkillCount> getTopMissingSkills() {
    return analysisService.getTopMissingSkills();
}
@GetMapping("/report/{id}")
public ResponseEntity<byte[]> downloadReport(
        @PathVariable Long id)
        throws Exception {

    ResumeAnalysis analysis =
            analysisRepository.findById(id)
            .orElseThrow();

    byte[] pdf =
            pdfReportService.generateReport(analysis);

    return ResponseEntity.ok()
            .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=report.pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdf);
}
@DeleteMapping("/history/{id}")
public void deleteHistory(
        @PathVariable Long id) {

    analysisService.delete(id);
}
}