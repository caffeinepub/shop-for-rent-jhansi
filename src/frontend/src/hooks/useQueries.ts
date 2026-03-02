import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Shop } from "../backend.d";
import { useActor } from "./useActor";

export function useGetShop() {
  const { actor, isFetching } = useActor();
  return useQuery<Shop>({
    queryKey: ["shop"],
    queryFn: async () => {
      if (!actor) {
        return {
          title: "Shop For Rent",
          features: [
            "Ground Floor Location",
            "High Footfall Area",
            "Water Connection",
            "Electricity Connection",
            "24/7 Access",
            "Parking Available",
          ],
          size: "19 x 11 ft",
          isAvailable: true,
          address: "Back of Dr Tapan Sinha, Sipri Bazar, Jhansi",
          monthlyRent: BigInt(8000),
        };
      }
      return actor.getShop();
    },
    enabled: !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      phone,
      email,
      message,
    }: {
      name: string;
      phone: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.submitInquiry(name, phone, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
