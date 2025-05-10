import repeat from "@/lib/util/repeat";
import type { HttpTypes } from "@medusajs/types";
import { cn } from "@/lib/utils";
import { Table } from "@/components/table";

import Item from "@/modules/cart/components/item";
import SkeletonLineItem from "@/modules/skeletons/components/skeleton-line-item";

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart;
};

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items;
  const hasOverflow = items && items.length > 4;

  return (
    <div
      className={cn({
        "pl-[1px] overflow-y-scroll overflow-x-hidden no-scrollbar max-h-[420px]": hasOverflow,
      })}
    >
      <Table>
        <Table.Body data-testid="items-table">
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
                })
                .map((item) => {
                  return <Item key={item.id} item={item} type="preview" currencyCode={cart.currency_code} />;
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />;
              })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ItemsPreviewTemplate;
