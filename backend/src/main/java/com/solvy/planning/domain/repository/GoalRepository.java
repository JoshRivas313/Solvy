package com.solvy.planning.domain.repository;

import com.solvy.planning.domain.model.Deposit;
import com.solvy.planning.domain.model.Goal;
import java.util.List;
import java.util.Optional;

public interface GoalRepository {
    Goal save(Goal goal);
    Optional<Goal> findById(String id);
    List<Goal> findAllByUserId(String userId);
    void deleteById(String id);
    void saveDeposit(Deposit deposit);
}
