package com.jarongmedia_backend.serviceImpl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jarongmedia_backend.dto.RequestFormDTO;
import com.jarongmedia_backend.entities.RequestForm;
import com.jarongmedia_backend.exceptions.EntityNotFoundException;
import com.jarongmedia_backend.repository.RequestFormRepository;
import com.jarongmedia_backend.service.RequestFormService;

@Service
public class RequestFromServiceImpl implements RequestFormService {

	@Autowired
	private RequestFormRepository formRepository;

	@Autowired
	private ModelMapper mapper;

	@Override
	public RequestForm createRequest(RequestFormDTO dto) {

		RequestForm form = mapper.map(dto, RequestForm.class);

		return formRepository.save(form);

	}

	public String deleteRequest(long id) {
		RequestForm form = formRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Request Form with id: " + id + " not found!"));
		formRepository.delete(form);
		return "Request entry successfully deleted!";
	}

	public String updateRequestStatus(String status, long id) {
		RequestForm form = formRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Request Form with id: " + id + " not found!"));
		form.setStatus(status);
		formRepository.save(form);
		return "Request entry status successfully updated to " + status;
	}

	public Page<RequestForm> getAllRequests(Integer pageNo, Integer pageSize) {
		Pageable page = PageRequest.of(pageNo, pageSize);
		return formRepository.findAll(page);
	}

}
