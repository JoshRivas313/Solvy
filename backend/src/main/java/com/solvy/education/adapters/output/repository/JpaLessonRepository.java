package com.solvy.education.adapters.output.repository;

import com.solvy.education.infrastructure.persistence.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaLessonRepository extends JpaRepository<LessonEntity, String> {
}
