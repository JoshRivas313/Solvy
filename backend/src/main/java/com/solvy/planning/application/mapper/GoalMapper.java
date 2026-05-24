package com.solvy.planning.application.mapper;

import com.solvy.planning.application.dto.DepositResponseDTO;
import com.solvy.planning.application.dto.GoalRequestDTO;
import com.solvy.planning.application.dto.GoalResponseDTO;
import com.solvy.planning.domain.model.Deposit;
import com.solvy.planning.domain.model.Goal;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class GoalMapper {

    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Goal toDomain(GoalRequestDTO dto, String userId) {
        return Goal.builder()
                .id(UUID.randomUUID().toString())
                .userId(userId)
                .title(dto.getTitle())
                .type(dto.getType())
                .iconName(dto.getIconName())
                .iconBg(dto.getIconBg())
                .iconColor(dto.getIconColor())
                .target(dto.getTarget())
                .saved(BigDecimal.ZERO)
                .createdAt(LocalDate.now())
                .build();
    }

    public GoalResponseDTO toResponse(Goal goal) {
        List<Deposit> deposits = goal.getDeposits() != null ? goal.getDeposits() : Collections.emptyList();

        // Ordenar depósitos por fecha descendente
        List<Deposit> sorted = deposits.stream()
                .sorted(Comparator.comparing(Deposit::getDate).reversed())
                .collect(Collectors.toList());

        BigDecimal lastDeposit = sorted.isEmpty() ? null : sorted.get(0).getAmount();
        String lastDepositDate = sorted.isEmpty() ? null
                : sorted.get(0).getDate().toLocalDate().format(DATE_FORMATTER);

        // Últimos 5 movimientos como recentActivity
        List<GoalResponseDTO.ActivityDTO> recentActivity = sorted.stream()
                .limit(5)
                .map(d -> GoalResponseDTO.ActivityDTO.builder()
                        .title("Aporte a " + goal.getTitle())
                        .date(d.getDate().toLocalDate().format(DATE_FORMATTER))
                        .amount("S/ " + d.getAmount().toPlainString())
                        .build())
                .collect(Collectors.toList());

        return GoalResponseDTO.builder()
                .id(goal.getId())
                .title(goal.getTitle())
                .type(goal.getType())
                .iconName(goal.getIconName())
                .iconBg(goal.getIconBg())
                .iconColor(goal.getIconColor())
                .target(goal.getTarget())
                .saved(goal.getSaved())
                .progress(goal.getProgress())
                .createdAt(goal.getCreatedAt())
                .lastDeposit(lastDeposit)
                .lastDepositDate(lastDepositDate)
                .recentActivity(recentActivity)
                .build();
    }

    public DepositResponseDTO toDepositResponse(Deposit deposit) {
        return DepositResponseDTO.builder()
                .id(deposit.getId())
                .amount(deposit.getAmount())
                .date(deposit.getDate())
                .build();
    }
}
