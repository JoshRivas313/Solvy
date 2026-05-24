package com.solvy.education.adapters.output.repository;

import com.solvy.education.infrastructure.persistence.UserProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JpaUserProgressRepository extends JpaRepository<UserProgressEntity, Long> {
    Optional<UserProgressEntity> findByUserIdAndLessonId(String userId, String lessonId);
}
