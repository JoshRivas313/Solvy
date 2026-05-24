package com.solvy.planning.application.usecase;

import com.solvy.planning.application.dto.GoalRequestDTO;
import com.solvy.planning.application.dto.GoalResponseDTO;
import com.solvy.planning.application.mapper.GoalMapper;
import com.solvy.planning.domain.model.Goal;
import com.solvy.planning.domain.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateGoalUseCase {

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;

    public GoalResponseDTO execute(GoalRequestDTO request, String userId) {
        Goal goal = goalMapper.toDomain(request, userId);
        Goal savedGoal = goalRepository.save(goal);
        return goalMapper.toResponse(savedGoal);
    }
}
