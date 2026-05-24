package com.solvy.education.application.usecase;

import com.solvy.education.application.dto.LessonDTO;
import com.solvy.education.domain.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetLessonsUseCase {

    private final LessonRepository lessonRepository;

    public List<LessonDTO> execute(String userId) {
        return lessonRepository.findAll().stream()
                .map(lesson -> LessonDTO.builder()
                        .id(lesson.getId())
                        .title(lesson.getTitle())
                        .category(lesson.getCategory())
                        .duration(lesson.getDuration())
                        .description(lesson.getDescription())
                        .completed(lessonRepository.isCompleted(userId, lesson.getId()))
                        .build())
                .collect(Collectors.toList());
    }
}
