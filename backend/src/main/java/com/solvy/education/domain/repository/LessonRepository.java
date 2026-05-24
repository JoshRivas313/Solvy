package com.solvy.education.domain.repository;

import com.solvy.education.domain.model.Lesson;
import java.util.List;
import java.util.Optional;

public interface LessonRepository {
    List<Lesson> findAll();
    Optional<Lesson> findById(String id);
    void saveProgress(String userId, String lessonId, boolean completed);
    boolean isCompleted(String userId, String lessonId);
}
