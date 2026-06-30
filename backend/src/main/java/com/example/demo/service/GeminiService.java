package com.example.demo.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiService {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    public GeminiService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public String generateFeedback(String resumeText, String jobDescription) {

        String prompt = """
                You are an expert ATS resume reviewer.

                Resume:
                %s

                Job Description:
                %s

                Give:
                1. Strengths
                2. Weaknesses
                3. Missing skills
                4. Suggestions
                Keep the answer under 200 words.
                """.formatted(resumeText, jobDescription);

        String requestBody = """
                {
                  "contents":[
                    {
                      "parts":[
                        {
                          "text":"%s"
                        }
                      ]
                    }
                  ]
                }
                """.formatted(prompt.replace("\"", "\\\""));

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                        + apiKey;

       String response = webClient.post()
        .uri(url)
        .contentType(MediaType.APPLICATION_JSON)
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(String.class)
        .block();

try {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode root = mapper.readTree(response);

    return root.get("candidates")
            .get(0)
            .get("content")
            .get("parts")
            .get(0)
            .get("text")
            .asText();

} catch (Exception e) {
    e.printStackTrace();
    return "Unable to parse AI feedback.";
}
    
}
public String generateInterviewQuestions(String resumeText, String jobDescription) {

    String prompt = """
            You are an experienced technical interviewer.

            Resume:
            %s

            Job Description:
            %s

            Generate:

            1. Five Technical Questions
            2. Three HR Questions
            3. Two Scenario-Based Questions

            Return only the questions in plain text.
            """.formatted(resumeText, jobDescription);

    String requestBody = """
            {
              "contents":[
                {
                  "parts":[
                    {
                      "text":"%s"
                    }
                  ]
                }
              ]
            }
            """.formatted(prompt.replace("\"", "\\\""));

    String url =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                    + apiKey;

    String response = webClient.post()
            .uri(url)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(String.class)
            .block();

    try {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);

        return root
                .path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();

    } catch (Exception e) {
        return "Unable to generate interview questions.";
    }
  }

public String improveResume(String resumeText, String jobDescription) {

    String prompt = """
            You are an expert resume writer and ATS specialist.

            Resume:
            %s

            Job Description:
            %s

            Improve this resume by providing:

            1. Better Career Objective
            2. Improved Project Description
            3. Better Skills Section
            4. Better Experience Section
            5. Additional Keywords for ATS

            Keep the response under 300 words.
            Return only plain text.
            """.formatted(resumeText, jobDescription);

    String requestBody = """
            {
              "contents":[
                {
                  "parts":[
                    {
                      "text":"%s"
                    }
                  ]
                }
              ]
            }
            """.formatted(prompt.replace("\"", "\\\""));

    String url =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                    + apiKey;

    String response = webClient.post()
            .uri(url)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(String.class)
            .block();

    try {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);

        return root
                .path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();

    } catch (Exception e) {
        return "Unable to generate resume improvements.";
    }
  }
}