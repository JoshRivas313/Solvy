package com.solvy.planning.application.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class GoalRequestDTO {
    private String title;
    private String type;
    private String iconName;
    private String iconBg;
    private String iconColor;
    private BigDecimal target;
}
