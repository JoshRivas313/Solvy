package com.solvy.planning.application.usecase;

import com.solvy.planning.domain.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteGoalUseCase {

    private final GoalRepository goalRepository;

    public void execute(String goalId) {
        goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found: " + goalId));
        goalRepository.deleteById(goalId);
    }
}
