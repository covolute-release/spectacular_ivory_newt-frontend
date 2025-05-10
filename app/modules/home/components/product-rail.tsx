import type { HttpTypes } from "@medusajs/types";
import { Text } from "@/components/text";

import InteractiveLink from "@/modules/common/components/interactive-link";
import ProductPreview from "@/modules/products/components/product-preview";

export default function ProductRail({
  collection,
  region,
  products: pricedProducts,
}: {
  collection: HttpTypes.StoreCollection;
  region: HttpTypes.StoreRegion;
  products: HttpTypes.StoreProduct[];
}) {
  if (!pricedProducts) {
    return null;
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink to={`/collections/${collection.handle}`}>View all</InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {pricedProducts?.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  );
}
