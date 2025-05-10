import { XMark } from "@medusajs/icons";
import type { HttpTypes } from "@medusajs/types";
import { Link } from "@remix-run/react";
import Help from "@/modules/order/components/help";
import Items from "@/modules/order/components/items";
import OrderDetails from "@/modules/order/components/order-details";
import OrderSummary from "@/modules/order/components/order-summary";
import ShippingDetails from "@/modules/order/components/shipping-details";
import type React from "react";

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({ order }) => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl-semi">Order details</h1>
        <Link
          to="/account/orders"
          className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </Link>
      </div>
      <div className="flex flex-col gap-4 h-full bg-white w-full" data-testid="order-details-container">
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
