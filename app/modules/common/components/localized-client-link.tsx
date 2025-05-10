import type React from "react";
import { Link, useParams } from "@remix-run/react";

const LocalizedClientLink = ({
  children,
  to,
  ...props
}: {
  children?: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
  [x: string]: any;
}) => {
  const { countryCode } = useParams();

  return (
    <Link to={to?.startsWith("/") ? `/${countryCode}${to}` : to} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedClientLink;
