import { Button } from "@/components/button";
import { Heading } from "@/components/heading";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
            Ecommerce Starter Template
          </Heading>
          <Heading level="h2" className="text-3xl leading-10 text-ui-fg-subtle font-normal">
            Template by Shopable
          </Heading>
        </span>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/shopable-60057.firebasestorage.app/o/stores%2Fa891465c-9d36-4151-98d7-2c2eeaf6322b%2Fimages%2Fgenerated-32e7237c-7767-4c8b-a2be-8ea8337d405d.png?alt=media"
          alt="Ugly Cat Sketch"
          className="w-48 h-48 object-contain my-4"
        />
        <a
          href="https://shopable.dev/"
          target="_blank"
          rel="noopener noreferrer" // Added rel for security best practices
        >
          <Button variant="secondary">
            Learn More about Shopable
            <span className="ml-2">🛍️</span> {/* Replaced sparkle emoji with shopping bag emoji */}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Hero;