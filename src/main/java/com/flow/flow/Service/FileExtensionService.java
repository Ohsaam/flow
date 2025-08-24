package com.flow.flow.Service;

import com.flow.flow.dto.FileExtensionDto;

import java.util.List;

public interface FileExtensionService {
	List<FileExtensionDto> getAllExtensions();
	void upsertExtension(FileExtensionDto dto);  
	void deleteExtensions(FileExtensionDto dto);
} 