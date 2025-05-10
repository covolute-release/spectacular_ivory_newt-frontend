import { Heading } from "@/components/heading";
import { Link } from "@remix-run/react";

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">Need help?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/contact">Returns & Exchanges</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
