package com.solvy.education.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {
    private String id;
    private String title;
    private String category; // e.g., "Ahorro", "Inversión"
    private String duration;
    private String description;
    private List<Question> questions;
    private boolean completed;
}
