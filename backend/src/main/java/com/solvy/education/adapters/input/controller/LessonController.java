package com.solvy.education.adapters.input.controller;

import com.solvy.education.application.dto.LessonDTO;
import com.solvy.education.application.usecase.GetLessonsUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final GetLessonsUseCase getLessonsUseCase;

    @GetMapping
    public ResponseEntity<List<LessonDTO>> getLessons() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth != null ? (String) auth.getPrincipal() : null;
        return ResponseEntity.ok(getLessonsUseCase.execute(userId));
    }
}
