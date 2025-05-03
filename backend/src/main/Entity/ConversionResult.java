package com.example.texttonumeric.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ConversionResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2048)
    private String originalText;

    private Double numericValue;

    private LocalDateTime convertedAt;

    public ConversionResult() {}

    public ConversionResult(String originalText, Double numericValue, LocalDateTime convertedAt) {
        this.originalText = originalText;
        this.numericValue = numericValue;
        this.convertedAt = convertedAt;
    }

    // Getters et setters
    public Long getId() { return id; }
    public String getOriginalText() { return originalText; }
    public void setOriginalText(String originalText) { this.originalText = originalText; }
    public Double getNumericValue() { return numericValue; }
    public void setNumericValue(Double numericValue) { this.numericValue = numericValue; }
    public LocalDateTime getConvertedAt() { return convertedAt; }
    public void setConvertedAt(LocalDateTime convertedAt) { this.convertedAt = convertedAt; }
}
