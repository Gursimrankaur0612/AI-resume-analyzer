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
public String generateInterviewQuestions(
        String resumeText,
        String jobDescription,
        String difficulty) {

    String prompt = """
            You are an experienced technical interviewer.

            Resume:
            %s

            Job Description:
            %s

            Difficulty: %s

            Generate:

Generate EXACTLY 10 interview questions.

Rules:

1. Number every question separately.
2. Do NOT group questions under headings.
3. Do NOT use bullet points.
4. Do NOT write "Technical Questions", "HR Questions", or "Scenario Questions".
5. Return exactly in this format:

1. Technical question
2. Technical question
3. Technical question
4. Technical question
5. Technical question
6. HR question
7. HR question
8. HR question
9. Scenario question
10. Scenario question

Return ONLY the numbered questions.
            """.formatted(resumeText, jobDescription, difficulty);

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
  public String generateInterviewAnswer(String question) {

    String prompt = """
            You are an experienced software engineer and interviewer.

            Give an ideal interview answer for the following question.

            Question:
            %s

            Rules:
            - Keep the answer between 150 and 250 words.
            - Be professional and interview-ready.
            - Include a practical example whenever possible.
            - Return only the answer.
            """.formatted(question);

    return callGemini(prompt);
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
  private String callGemini(String prompt) {

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

        e.printStackTrace();

        return "Unable to generate AI response.";

    }
}
}