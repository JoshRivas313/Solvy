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
public class UpdateGoalUseCase {

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;

    public GoalResponseDTO execute(String goalId, GoalRequestDTO request) {
        Goal existing = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found: " + goalId));

        // Actualizar solo los campos enviados (no null)
        if (request.getTitle() != null) existing.setTitle(request.getTitle());
        if (request.getType() != null) existing.setType(request.getType());
        if (request.getIconName() != null) existing.setIconName(request.getIconName());
        if (request.getIconBg() != null) existing.setIconBg(request.getIconBg());
        if (request.getIconColor() != null) existing.setIconColor(request.getIconColor());
        if (request.getTarget() != null) existing.setTarget(request.getTarget());

        Goal updated = goalRepository.save(existing);
        return goalMapper.toResponse(updated);
    }
}
