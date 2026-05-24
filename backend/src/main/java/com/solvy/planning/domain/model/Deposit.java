package com.solvy.planning.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Deposit {
    private String id;
    private String goalId;
    private BigDecimal amount;
    private LocalDateTime date;
}
