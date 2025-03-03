import { toaster } from "@/Components/UI/toaster";
import {
  httpUserService,
  requestForm,
  requestFormWithId,
} from "@/services/httpUserService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useCreateRequest = () => {
  const navigate = useNavigate();
  const requestClient = new httpUserService("/public");
  return useMutation({
    mutationKey: ["createRequest"],
    mutationFn: (data: requestForm) => {
      return requestClient.createRequest({
        data: data,
      });
    },
    onSuccess: () => {
      toaster.create({
        title: "Request Created",
        type: "success",
        description: "Request created successfully",
        duration: 5 * 1000,
      });
      navigate("/");
    },
    onError: (error: any) => {
      toaster.create({
        title: "Error Creating Request",
        type: "error",
        description: error.response.data.message,
        duration: 5 * 1000,
      });
    },
  });
};

export default useCreateRequest;
