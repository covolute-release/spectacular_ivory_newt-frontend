import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "@/routes/_main";
// MedusaCTA removed

export default function Footer() {
  const { collections, categories: productCategories } = useLoaderData<typeof loader>();

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <Link to="/" className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase">
              Shopable Store
            </Link>
            <Text className="txt-compact-small text-ui-fg-subtle mt-2">Template by Shopable</Text>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-2">
            {" "}
            {/* Adjusted grid columns */}
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Categories</span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li className="flex flex-col gap-2 text-ui-fg-subtle txt-small" key={c.id}>
                        <Link
                          className={cn("hover:text-ui-fg-base", children && "txt-small-plus")}
                          to={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </Link>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children?.map((child) => (
                              <li key={child.id}>
                                <Link
                                  className="hover:text-ui-fg-base"
                                  to={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Collections</span>
                <ul
                  className={cn("grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <Link className="hover:text-ui-fg-base" to={`/collections/${c.handle}`}>
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Medusa column removed */}
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">© {new Date().getFullYear()} Shopable Store. All rights reserved.</Text>
          {/* MedusaCTA removed */}
        </div>
      </div>
    </footer>
  );
}
