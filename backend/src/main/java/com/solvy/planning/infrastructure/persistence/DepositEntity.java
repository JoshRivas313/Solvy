package com.solvy.planning.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "deposits")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepositEntity {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String goalId;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal amount;
    
    private LocalDateTime date;
}
