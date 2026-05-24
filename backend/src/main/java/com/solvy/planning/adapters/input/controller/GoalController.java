package com.solvy.planning.adapters.input.controller;

import com.solvy.planning.application.dto.DepositRequestDTO;
import com.solvy.planning.application.dto.DepositResponseDTO;
import com.solvy.planning.application.dto.GoalRequestDTO;
import com.solvy.planning.application.dto.GoalResponseDTO;
import com.solvy.planning.application.usecase.AddDepositUseCase;
import com.solvy.planning.application.usecase.CreateGoalUseCase;
import com.solvy.planning.application.usecase.DeleteGoalUseCase;
import com.solvy.planning.application.usecase.GetGoalsUseCase;
import com.solvy.planning.application.usecase.UpdateGoalUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final CreateGoalUseCase createGoalUseCase;
    private final AddDepositUseCase addDepositUseCase;
    private final GetGoalsUseCase getGoalsUseCase;
    private final UpdateGoalUseCase updateGoalUseCase;
    private final DeleteGoalUseCase deleteGoalUseCase;

    @PostMapping
    public ResponseEntity<GoalResponseDTO> createGoal(@RequestBody GoalRequestDTO request) {
        return ResponseEntity.ok(createGoalUseCase.execute(request, getUserId()));
    }

    @GetMapping
    public ResponseEntity<List<GoalResponseDTO>> getGoals() {
        return ResponseEntity.ok(getGoalsUseCase.execute(getUserId()));
    }

    @PostMapping("/{id}/deposits")
    public ResponseEntity<DepositResponseDTO> addDeposit(@PathVariable String id,
                                                          @RequestBody DepositRequestDTO request) {
        return ResponseEntity.ok(addDepositUseCase.execute(id, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalResponseDTO> updateGoal(@PathVariable String id,
                                                       @RequestBody GoalRequestDTO request) {
        return ResponseEntity.ok(updateGoalUseCase.execute(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable String id) {
        deleteGoalUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }

    private String getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) {
            throw new RuntimeException("Usuario no autenticado");
        }
        return (String) auth.getPrincipal();
    }
}
