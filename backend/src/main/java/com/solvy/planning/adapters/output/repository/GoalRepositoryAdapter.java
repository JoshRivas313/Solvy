package com.solvy.planning.adapters.output.repository;

import com.solvy.planning.domain.model.Deposit;
import com.solvy.planning.domain.model.Goal;
import com.solvy.planning.domain.repository.GoalRepository;
import com.solvy.planning.infrastructure.persistence.DepositEntity;
import com.solvy.planning.infrastructure.persistence.GoalEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GoalRepositoryAdapter implements GoalRepository {

    private final JpaGoalRepository jpaGoalRepository;
    private final JpaDepositRepository jpaDepositRepository;

    @Override
    public Goal save(Goal goal) {
        GoalEntity entity = GoalEntity.builder()
                .id(goal.getId())
                .userId(goal.getUserId())
                .title(goal.getTitle())
                .type(goal.getType())
                .iconName(goal.getIconName())
                .iconBg(goal.getIconBg())
                .iconColor(goal.getIconColor())
                .target(goal.getTarget())
                .saved(goal.getSaved())
                .createdAt(goal.getCreatedAt())
                .build();
        
        GoalEntity saved = jpaGoalRepository.save(entity);
        return mapToDomain(saved);
    }

    @Override
    public Optional<Goal> findById(String id) {
        return jpaGoalRepository.findById(id).map(this::mapToDomain);
    }

    @Override
    public List<Goal> findAllByUserId(String userId) {
        return jpaGoalRepository.findAllByUserId(userId).stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(String id) {
        jpaGoalRepository.deleteById(id);
    }

    @Override
    public void saveDeposit(Deposit deposit) {
        DepositEntity entity = DepositEntity.builder()
                .id(deposit.getId())
                .goalId(deposit.getGoalId())
                .amount(deposit.getAmount())
                .date(deposit.getDate())
                .build();
        jpaDepositRepository.save(entity);
    }

    private Goal mapToDomain(GoalEntity entity) {
        // Mapear depósitos del entity si están cargados
        List<Deposit> deposits = entity.getDeposits() != null
                ? entity.getDeposits().stream()
                        .map(d -> Deposit.builder()
                                .id(d.getId())
                                .goalId(d.getGoalId())
                                .amount(d.getAmount())
                                .date(d.getDate())
                                .build())
                        .collect(Collectors.toList())
                : java.util.Collections.emptyList();

        return Goal.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .title(entity.getTitle())
                .type(entity.getType())
                .iconName(entity.getIconName())
                .iconBg(entity.getIconBg())
                .iconColor(entity.getIconColor())
                .target(entity.getTarget())
                .saved(entity.getSaved())
                .createdAt(entity.getCreatedAt())
                .deposits(deposits)
                .build();
    }
}
