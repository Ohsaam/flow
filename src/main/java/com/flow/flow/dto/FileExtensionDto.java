package com.flow.flow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileExtensionDto {
	private Long id;                 
	private String extensionName;    
	private String extensionType;    
	private String isChecked;        
	private LocalDateTime createdAt; 
	private LocalDateTime updatedAt; 
} 