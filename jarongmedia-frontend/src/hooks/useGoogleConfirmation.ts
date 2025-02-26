import { fetchedResponse, httpUserService } from "@/services/httpUserService";
import { useEffect, useState } from "react";

const googleLoginService = new httpUserService("/auth/google");

const useGoogleConfirmation = (code: string) => {
  const [data, setData] = useState({} as fetchedResponse);
  const [error, setError] = useState({} as any);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    googleLoginService
      .googleLogin({
        params: {
          code: code,
        },
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isError, error, isLoading };
};

export default useGoogleConfirmation;
