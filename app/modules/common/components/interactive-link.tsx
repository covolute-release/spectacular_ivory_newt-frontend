import { ArrowUpRightMini } from "@medusajs/icons";
import { Text } from "@/components/text";
import { Link } from "@remix-run/react";

type InteractiveLinkProps = {
  to: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const InteractiveLink = ({ to, children, onClick, ...props }: InteractiveLinkProps) => {
  return (
    <Link className="flex gap-x-1 items-center group" to={to} onClick={onClick} {...props}>
      <Text className="text-ui-fg-interactive">{children}</Text>
      <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" color="var(--fg-interactive)" />
    </Link>
  );
};

export default InteractiveLink;
