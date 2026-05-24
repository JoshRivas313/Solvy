package com.solvy.planning.application.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class DepositResponseDTO {
    private String id;
    private BigDecimal amount;
    private LocalDateTime date;
}
