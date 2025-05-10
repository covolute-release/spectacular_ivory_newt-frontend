import { Button } from "@/components/button";

import OrderCard from "./order-card";
import type { HttpTypes } from "@medusajs/types";
import { Link } from "@remix-run/react";

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {orders.map((o) => (
          <div key={o.id} className="border-b border-gray-200 pb-6 last:pb-0 last:border-none">
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4" data-testid="no-orders-container">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">You don&apos;t have any orders yet, let us change that {":)"}</p>
      <div className="mt-4">
        <Link to="/">
          <Button data-testid="continue-shopping-button">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderOverview;
