import { cva, type VariantProps } from "class-variance-authority";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "flex shrink-0 items-center justify-center overflow-hidden shadow-borders-base bg-ui-bg-base",
  {
    variants: {
      variant: {
        squared: "",
        rounded: "rounded-full",
      },
      size: {
        "2xsmall": "h-5 w-5",
        xsmall: "h-6 w-6",
        small: "h-7 w-7",
        base: "h-8 w-8",
        large: "h-10 w-10",
        xlarge: "h-12 w-12",
      },
    },
    compoundVariants: [
      {
        variant: "squared",
        size: "2xsmall",
        className: "rounded",
      },
      {
        variant: "squared",
        size: "xsmall",
        className: "rounded-md",
      },
      {
        variant: "squared",
        size: "small",
        className: "rounded-md",
      },
      {
        variant: "squared",
        size: "base",
        className: "rounded-md",
      },
      {
        variant: "squared",
        size: "large",
        className: "rounded-lg",
      },
      {
        variant: "squared",
        size: "xlarge",
        className: "rounded-xl",
      },
    ],
    defaultVariants: {
      variant: "rounded",
      size: "base",
    },
  },
);

const innerVariants = cva({
  base: "aspect-square object-cover object-center",
  variants: {
    variant: {
      squared: "",
      rounded: "rounded-full",
    },
    size: {
      "2xsmall": "txt-compact-xsmall-plus size-4",
      xsmall: "txt-compact-xsmall-plus size-5",
      small: "txt-compact-small-plus size-6",
      base: "txt-compact-small-plus size-7",
      large: "txt-compact-medium-plus size-9",
      xlarge: "txt-compact-large-plus size-11",
    },
  },
  compoundVariants: [
    {
      variant: "squared",
      size: "2xsmall",
      className: "rounded-sm",
    },
    {
      variant: "squared",
      size: "xsmall",
      className: "rounded",
    },
    {
      variant: "squared",
      size: "small",
      className: "rounded",
    },
    {
      variant: "squared",
      size: "base",
      className: "rounded",
    },
    {
      variant: "squared",
      size: "large",
      className: "rounded-md",
    },
    {
      variant: "squared",
      size: "xlarge",
      className: "rounded-[10px]",
    },
  ],
  defaultVariants: {
    variant: "rounded",
    size: "base",
  },
});

interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, "asChild" | "children" | "size">,
    VariantProps<typeof avatarVariants> {
  src?: string;
  fallback: string;
}

const Avatar = forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  (
    {
      /**
       * The URL of the image used in the Avatar.
       */
      src,
      /**
       * Text to show in the avatar if the URL provided in `src` can't be opened.
       */
      fallback,
      /**
       * The style of the avatar.
       */
      variant = "rounded",
      /**
       * The size of the avatar's border radius.
       */
      size = "base",
      className,
      ...props
    }: AvatarProps,
    ref,
  ) => {
    return (
      <AvatarPrimitive.Root ref={ref} {...props} className={cn(avatarVariants({ variant, size }), className)}>
        {src && <AvatarPrimitive.Image src={src} className={innerVariants({ variant, size })} />}
        <AvatarPrimitive.Fallback
          className={cn(
            innerVariants({ variant, size }),
            "bg-ui-bg-component-hover text-ui-fg-subtle pointer-events-none flex select-none items-center justify-center",
          )}
        >
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  },
);
Avatar.displayName = "Avatar";

export { Avatar };
