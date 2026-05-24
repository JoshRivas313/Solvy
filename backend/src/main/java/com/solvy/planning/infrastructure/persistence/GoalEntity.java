package com.solvy.planning.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "goals")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalEntity {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String userId;
    
    @Column(nullable = false)
    private String title;
    
    private String type;
    private String iconName;
    private String iconBg;
    private String iconColor;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal target;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal saved;
    
    private LocalDate createdAt;

    @OneToMany(mappedBy = "goalId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<DepositEntity> deposits;
}
