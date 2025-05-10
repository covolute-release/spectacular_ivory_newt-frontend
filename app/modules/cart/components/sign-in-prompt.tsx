import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { Heading } from "@/components/heading";
import { Link } from "@remix-run/react";

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Already have an account?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">Sign in for a better experience.</Text>
      </div>
      <div>
        <Link to="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignInPrompt;
