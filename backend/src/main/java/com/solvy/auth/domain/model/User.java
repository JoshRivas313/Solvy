package com.solvy.auth.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;
    private String email;
    private String password;
    private String fullName;
    private String riskProfile; // e.g., "Conservador", "Moderado", "Agresivo"
    private String financialLevel; // e.g., "Principiante", "Intermedio", "Avanzado"
}
