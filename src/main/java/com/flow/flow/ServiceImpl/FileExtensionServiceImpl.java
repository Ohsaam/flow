package com.flow.flow.ServiceImpl;

import com.flow.flow.Service.FileExtensionService;
import com.flow.flow.dao.FileExtensionDao;
import com.flow.flow.dto.FileExtensionDto;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class FileExtensionServiceImpl implements FileExtensionService {

	private final FileExtensionDao mapper;

	public FileExtensionServiceImpl(FileExtensionDao mapper) {
		this.mapper = mapper;
	}

	@Override
	public List<FileExtensionDto> getAllExtensions() {
		return mapper.getAllExtensions();
	}

	@Override
	@Transactional
	public void upsertExtension(FileExtensionDto dto) {
		if (StringUtils.isEmpty(dto.getExtensionName())) 
			return;
		
		mapper.upsertExtension(dto);
	}

	@Override
	@Transactional
	public void deleteExtensions(FileExtensionDto dto) {
		if (StringUtils.isNotEmpty(dto.getExtensionName())) {
			mapper.deleteExtensions(dto);
		}
	}
} 