package com.solvy.planning.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    private String id;
    private String userId;
    private String title;
    private String type; // e.g., "Principal", "Ahorro"
    private String iconName;
    private String iconBg;
    private String iconColor;
    private BigDecimal target;
    private BigDecimal saved;
    private List<Deposit> deposits;
    private LocalDate createdAt;

    public double getProgress() {
        if (target.compareTo(BigDecimal.ZERO) == 0) return 0;
        return saved.divide(target, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(new BigDecimal(100))
                .doubleValue();
    }
}
