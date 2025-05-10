import { sdk } from "@/lib/config";
import type { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./cookies.server";

export const listCartShippingMethods = async (request: Request, cartId: string) => {
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>("/store/shipping-options", {
      method: "GET",
      query: {
        cart_id: cartId,
        fields: "+service_zone.fulfllment_set.type,*service_zone.fulfillment_set.location.address",
      },
      headers,
      cache: "force-cache",
    })
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null;
    });
};

export const calculatePriceForShippingOption = async (
  request: Request,
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>,
) => {
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  const body = { cart_id: cartId, data };

  if (data) {
    body.data = data;
  }

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(`/store/shipping-options/${optionId}/calculate`, {
      method: "POST",
      body,
      headers,
    })
    .then(({ shipping_option }) => shipping_option)
    .catch((_e) => {
      return null;
    });
};
