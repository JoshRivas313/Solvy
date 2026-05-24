package com.solvy.planning.application.usecase;

import com.solvy.planning.application.dto.DepositRequestDTO;
import com.solvy.planning.application.dto.DepositResponseDTO;
import com.solvy.planning.application.mapper.GoalMapper;
import com.solvy.planning.domain.model.Deposit;
import com.solvy.planning.domain.model.Goal;
import com.solvy.planning.domain.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddDepositUseCase {

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;

    @Transactional
    public DepositResponseDTO execute(String goalId, DepositRequestDTO request) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        Deposit deposit = Deposit.builder()
                .id(UUID.randomUUID().toString())
                .goalId(goalId)
                .amount(request.getAmount())
                .date(LocalDateTime.now())
                .build();

        // Actualizar el progreso de la meta
        goal.setSaved(goal.getSaved().add(request.getAmount()));
        
        goalRepository.save(goal);
        goalRepository.saveDeposit(deposit);

        return goalMapper.toDepositResponse(deposit);
    }
}
