package com.example.demo.service;

import java.io.ByteArrayOutputStream;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import com.example.demo.model.ResumeAnalysis;

@Service
public class PdfReportService {

    public byte[] generateReport(ResumeAnalysis analysis)
            throws Exception {

        PDDocument document = new PDDocument();

        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream content =
                new PDPageContentStream(document, page);

        content.beginText();
        content.setFont(PDType1Font.HELVETICA_BOLD, 18);
        content.newLineAtOffset(50, 700);

        content.showText("AI Resume Analyzer Report");

        content.newLineAtOffset(0, -40);
        content.setFont(PDType1Font.HELVETICA, 12);

        content.showText("User Email: "
                + analysis.getUserEmail());

        content.newLineAtOffset(0, -20);
        content.showText("Job Title: "
                + analysis.getJobTitle());

        content.newLineAtOffset(0, -20);
        content.showText("Company: "
                + analysis.getCompanyName());

        content.newLineAtOffset(0, -20);
        content.showText("Resume Score: "
                + analysis.getScore());

        content.newLineAtOffset(0, -20);
        content.showText("ATS Match: "
                + analysis.getAtsMatch() + "%");

        content.newLineAtOffset(0, -20);
        content.showText("Missing Skills: "
                + analysis.getMissingSkills());

        content.endText();
        content.close();

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        document.save(out);
        document.close();

        return out.toByteArray();
    }
}