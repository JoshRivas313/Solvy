package com.solvy.auth.domain.repository;

import com.solvy.auth.domain.model.User;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findById(String id);
}
