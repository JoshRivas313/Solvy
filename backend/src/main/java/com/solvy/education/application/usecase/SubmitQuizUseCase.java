package com.solvy.education.application.usecase;

import com.solvy.education.domain.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubmitQuizUseCase {

    private final LessonRepository lessonRepository;

    public void execute(String userId, String lessonId, boolean passed) {
        if (passed) {
            lessonRepository.saveProgress(userId, lessonId, true);
        }
    }
}
