package com.flow.flow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.flow.flow.Service.FileExtensionService;
import com.flow.flow.dto.FileExtensionDto;

@RestController
@RequestMapping("/api/file-extensions")
public class FileExtensionRestController {

    private final FileExtensionService fileExtensionService;

    public FileExtensionRestController(FileExtensionService fileExtensionService) {
        this.fileExtensionService = fileExtensionService;
    }

    @GetMapping
    public List<FileExtensionDto> getAllExtensions() {
        return fileExtensionService.getAllExtensions();
    }

    @PostMapping
    public void upsert(@RequestBody FileExtensionDto dto) {
        fileExtensionService.upsertExtension(dto); 
    }

    @DeleteMapping
    public void delete(@RequestBody FileExtensionDto dto) {
        fileExtensionService.deleteExtensions(dto);
    }
}
