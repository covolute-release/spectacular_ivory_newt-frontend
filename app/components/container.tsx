import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Container = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg px-6 py-4", className)}
      {...props}
    />
  );
});
Container.displayName = "Container";

export { Container };
