package com.solvy.education.adapters.output.repository;

import com.solvy.education.domain.model.Lesson;
import com.solvy.education.domain.repository.LessonRepository;
import com.solvy.education.infrastructure.persistence.LessonEntity;
import com.solvy.education.infrastructure.persistence.UserProgressEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class LessonRepositoryAdapter implements LessonRepository {

    private final JpaLessonRepository jpaLessonRepository;
    private final JpaUserProgressRepository jpaUserProgressRepository;

    @Override
    public List<Lesson> findAll() {
        return jpaLessonRepository.findAll().stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Lesson> findById(String id) {
        return jpaLessonRepository.findById(id).map(this::mapToDomain);
    }

    @Override
    public void saveProgress(String userId, String lessonId, boolean completed) {
        UserProgressEntity progress = jpaUserProgressRepository
                .findByUserIdAndLessonId(userId, lessonId)
                .orElse(UserProgressEntity.builder()
                        .userId(userId)
                        .lessonId(lessonId)
                        .build());
        
        progress.setCompleted(completed);
        progress.setCompletionDate(completed ? LocalDateTime.now() : null);
        jpaUserProgressRepository.save(progress);
    }

    @Override
    public boolean isCompleted(String userId, String lessonId) {
        return jpaUserProgressRepository.findByUserIdAndLessonId(userId, lessonId)
                .map(UserProgressEntity::isCompleted)
                .orElse(false);
    }

    private Lesson mapToDomain(LessonEntity entity) {
        return Lesson.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .category(entity.getCategory())
                .duration(entity.getDuration())
                .description(entity.getDescription())
                .build();
    }
}
