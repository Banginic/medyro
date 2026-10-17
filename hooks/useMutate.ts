import { useQueryClient } from "@tanstack/react-query";
import { MutationFunction, QueryKey, useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

// Constrain TData to always have success + message
interface MutationResponse {
  success: boolean;
  message?: string;
}

export function useMutate<TData extends MutationResponse, TVariables>({
  
  mutationFn,
  queriesToInvalidate = [],
  handleSubmitSuccess,
}: {

  mutationFn: MutationFunction<TData, TVariables>;
  queriesToInvalidate?: QueryKey[];
  handleSubmitSuccess?: (response: TData) => void;
}) {
  const queryClient = useQueryClient();



  return useMutation({
    
    mutationFn,

    onSuccess: async (response) => {
      if (!response.success) {
        toast.error(response.message || "Operation failed.");
        return;
      }
      if (handleSubmitSuccess) {
        handleSubmitSuccess?.(response);
      }
      toast.success(response.message || "Operation successful.");

      await Promise.all(
        queriesToInvalidate.map((queryKey) =>
          queryClient.invalidateQueries({
            queryKey,
          }),
        ),
      );
      
    },

    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong.");
    },
  });
}
