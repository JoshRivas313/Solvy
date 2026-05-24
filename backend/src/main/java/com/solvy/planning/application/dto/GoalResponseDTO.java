package com.solvy.planning.application.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class GoalResponseDTO {
    private String id;
    private String title;
    private String type;
    private String iconName;
    private String iconBg;
    private String iconColor;
    private BigDecimal target;
    private BigDecimal saved;
    private double progress;
    private LocalDate createdAt;
    // Campos que el frontend necesita para mostrar actividad reciente
    private BigDecimal lastDeposit;
    private String lastDepositDate;
    private List<ActivityDTO> recentActivity;

    @Data
    @Builder
    public static class ActivityDTO {
        private String title;
        private String date;
        private String amount;
    }
}
