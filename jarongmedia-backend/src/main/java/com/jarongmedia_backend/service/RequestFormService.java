package com.jarongmedia_backend.service;

import org.springframework.data.domain.Page;

import com.jarongmedia_backend.dto.RequestFormDTO;
import com.jarongmedia_backend.entities.RequestForm;

public interface RequestFormService {

	public RequestForm createRequest(RequestFormDTO dto);

	public Page<RequestForm> getAllRequests(Integer pageNo, Integer pageSize);

	public String updateRequestStatus(String status, long id);

	public String deleteRequest(long id);

}
