package com.flow.flow.dao;

import com.flow.flow.dto.FileExtensionDto;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FileExtensionDao {
	List<FileExtensionDto> getAllExtensions();
	int upsertExtension(FileExtensionDto dto);
	int deleteExtensions(FileExtensionDto dto);
} 