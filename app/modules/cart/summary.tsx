import { Heading } from "@/components/heading";
import { Button } from "@/components/button";

import CartTotals from "@/modules/common/components/cart-totals";
import Divider from "@/modules/common/components/divider";
import DiscountCode from "@/modules/checkout/components/discount-code";
import { Link } from "@remix-run/react";
import type { HttpTypes } from "@medusajs/types";

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[];
  };
};

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  }
  if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  }
  return "payment";
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart);

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      <Link to={"/checkout?step=" + step} data-testid="checkout-button">
        <Button className="w-full h-10">Go to checkout</Button>
      </Link>
    </div>
  );
};

export default Summary;
