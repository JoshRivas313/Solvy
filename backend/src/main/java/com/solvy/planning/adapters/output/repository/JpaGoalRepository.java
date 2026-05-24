package com.solvy.planning.adapters.output.repository;

import com.solvy.planning.infrastructure.persistence.GoalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JpaGoalRepository extends JpaRepository<GoalEntity, String> {
    List<GoalEntity> findAllByUserId(String userId);
}
