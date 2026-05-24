package com.solvy.planning.application.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DepositRequestDTO {
    private BigDecimal amount;
}
