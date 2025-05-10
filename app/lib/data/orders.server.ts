import { sdk } from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import { getAuthHeaders } from "./cookies.server";
import type { HttpTypes } from "@medusajs/types";

export const retrieveOrder = async (request: Request, id: string) => {
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      method: "GET",
      query: {
        fields: "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product",
      },
      headers,
      cache: "force-cache",
    })
    .then(({ order }) => order)
    .catch((err) => medusaError(err));
};

export const listOrders = async (request: Request, limit = 10, offset = 0, filters?: Record<string, any>) => {
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.client
    .fetch<HttpTypes.StoreOrderListResponse>("/store/orders", {
      method: "GET",
      query: {
        limit,
        offset,
        order: "-created_at",
        fields: "*items,+items.metadata,*items.variant,*items.product",
        ...filters,
      },
      headers,
      cache: "force-cache",
    })
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err));
};

export const createTransferRequest = async (
  request: Request,
  formData: FormData,
): Promise<{
  success: boolean;
  error: string | null;
  order: HttpTypes.StoreOrder | null;
}> => {
  const id = formData.get("order_id") as string;

  if (!id) {
    return { success: false, error: "Order ID is required", order: null };
  }

  const headers = await getAuthHeaders(request);

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: "id, email",
      },
      headers,
    )
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }));
};

export const acceptTransferRequest = async (request: Request, id: string, token: string) => {
  const headers = await getAuthHeaders(request);

  return await sdk.store.order
    .acceptTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }));
};

export const declineTransferRequest = async (request: Request, id: string, token: string) => {
  const headers = await getAuthHeaders(request);

  return await sdk.store.order
    .declineTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }));
};
