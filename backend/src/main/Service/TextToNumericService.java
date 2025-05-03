package com.example.texttonumeric.service;

import com.example.texttonumeric.model.ConversionResult;
import com.example.texttonumeric.repository.ConversionResultRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.NumberUtils;

import java.time.LocalDateTime;

@Service
public class TextToNumericService {
    private final ConversionResultRepository repository;

    public TextToNumericService(ConversionResultRepository repository) {
        this.repository = repository;
    }

    public ConversionResult convertAndSave(String text) {
        Double numericValue = null;
        try {
            // Utilisation de NumberUtils pour gérer différents formats[5]
            numericValue = NumberUtils.parseNumber(text.trim(), Double.class);
        } catch (Exception e) {
            // Si conversion impossible, numericValue reste null
        }
        ConversionResult result = new ConversionResult(text, numericValue, LocalDateTime.now());
        return repository.save(result);
    }
}
