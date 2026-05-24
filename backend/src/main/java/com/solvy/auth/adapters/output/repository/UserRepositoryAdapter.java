package com.solvy.auth.adapters.output.repository;

import com.solvy.auth.domain.model.User;
import com.solvy.auth.domain.repository.UserRepository;
import com.solvy.auth.infrastructure.persistence.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserRepositoryAdapter implements UserRepository {

    private final JpaUserRepository jpaUserRepository;

    @Override
    public User save(User user) {
        UserEntity entity = UserEntity.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .fullName(user.getFullName())
                .riskProfile(user.getRiskProfile())
                .financialLevel(user.getFinancialLevel())
                .build();
        UserEntity saved = jpaUserRepository.save(entity);
        return mapToDomain(saved);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email).map(this::mapToDomain);
    }

    @Override
    public Optional<User> findById(String id) {
        return jpaUserRepository.findById(id).map(this::mapToDomain);
    }

    private User mapToDomain(UserEntity entity) {
        return User.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .password(entity.getPassword())
                .fullName(entity.getFullName())
                .riskProfile(entity.getRiskProfile())
                .financialLevel(entity.getFinancialLevel())
                .build();
    }
}
