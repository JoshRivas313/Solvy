package com.solvy.planning.adapters.output.repository;

import com.solvy.planning.infrastructure.persistence.DepositEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaDepositRepository extends JpaRepository<DepositEntity, String> {
}
