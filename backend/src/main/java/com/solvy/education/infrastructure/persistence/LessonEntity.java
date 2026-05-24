package com.solvy.education.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lessons")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonEntity {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String title;
    
    private String category;
    private String duration;
    
    @Column(length = 1000)
    private String description;
}
