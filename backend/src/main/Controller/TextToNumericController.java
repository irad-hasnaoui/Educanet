package com.example.texttonumeric.controller;

import com.example.texttonumeric.model.ConversionResult;
import com.example.texttonumeric.service.TextToNumericService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/convert")
public class TextToNumericController {
    private final TextToNumericService service;

    public TextToNumericController(TextToNumericService service) {
        this.service = service;
    }

    @PostMapping("/file")
    public ResponseEntity<ConversionResult> convertFile(@RequestParam("file") MultipartFile file) {
        try {
            StringBuilder sb = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line.trim());
                }
            }
            String content = sb.toString();
            ConversionResult result = service.convertAndSave(content);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
