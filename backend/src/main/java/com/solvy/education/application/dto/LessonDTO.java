package com.solvy.education.application.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class LessonDTO {
    private String id;
    private String title;
    private String category;
    private String duration;
    private String description;
    private boolean completed;
}
