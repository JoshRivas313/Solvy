package com.solvy.planning.application.usecase;

import com.solvy.planning.application.dto.GoalResponseDTO;
import com.solvy.planning.application.mapper.GoalMapper;
import com.solvy.planning.domain.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetGoalsUseCase {

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;

    public List<GoalResponseDTO> execute(String userId) {
        return goalRepository.findAllByUserId(userId).stream()
                .map(goalMapper::toResponse)
                .collect(Collectors.toList());
    }
}
