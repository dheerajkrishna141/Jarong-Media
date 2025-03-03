import httpRequestService from "@/services/httpRequestService";
import { useQuery } from "@tanstack/react-query";

export interface QueryObject {
  pageNo: number;
  pageSize: number;
}
const useRequests = (queryObject: QueryObject) => {
  const requestClient = new httpRequestService("/admin");

  return useQuery({
    queryKey: ["requests", queryObject.pageNo],
    queryFn: () => {
      return requestClient.getRequests({
        params: {
          pageNo: queryObject.pageNo,
          pageSize: queryObject.pageSize,
        },
      });
    },

    staleTime: 15 * 60 * 1000, // 15 mins
  });
};

export default useRequests;
