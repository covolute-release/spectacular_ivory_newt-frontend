import { isManual, isStripe } from "@/lib/constants";
import type { HttpTypes } from "@medusajs/types";
import { Button } from "@/components/button";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import type React from "react";
import { useEffect, useState } from "react";
import ErrorMessage from "./error-message";
import { useFetcher } from "@remix-run/react";

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart;
  "data-testid": string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ cart, "data-testid": dataTestId }) => {
  const notReady =
    !cart || !cart.shipping_address || !cart.billing_address || !cart.email || (cart.shipping_methods?.length ?? 0) < 1;

  const paymentSession = cart.payment_collection?.payment_sessions?.[0];

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return <StripePaymentButton notReady={notReady} cart={cart} data-testid={dataTestId} />;
    case isManual(paymentSession?.provider_id):
      return <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />;
    default:
      return <Button disabled>Select a payment method</Button>;
  }
};

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart;
  notReady: boolean;
  "data-testid"?: string;
}) => {
  const fetcher = useFetcher();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (fetcher.state === "idle") {
      setSubmitting(false);
      setErrorMessage(null);
    }

    if (fetcher.data?.error) {
      setErrorMessage(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data?.error]);

  const onPaymentCompleted = async () => {
    fetcher.submit(new FormData(), {
      method: "post",
      action: "/cart/place-order",
    });
  };

  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement("card");

  const session = cart.payment_collection?.payment_sessions?.find((s) => s.status === "pending");

  const disabled = !stripe || !elements;

  const handlePayment = async () => {
    setSubmitting(true);

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false);
      return;
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name: cart.billing_address?.first_name + " " + cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent;

          if ((pi && pi.status === "requires_capture") || (pi && pi.status === "succeeded")) {
            onPaymentCompleted();
          }

          setErrorMessage(error.message || null);
          return;
        }

        if ((paymentIntent && paymentIntent.status === "requires_capture") || paymentIntent.status === "succeeded") {
          return onPaymentCompleted();
        }

        return;
      });
  };

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <ErrorMessage error={errorMessage} data-testid="stripe-payment-error-message" />
    </>
  );
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const fetcher = useFetcher();

  const handlePayment = () => {
    fetcher.submit(new FormData(), {
      method: "post",
      action: "/cart/place-order",
    });
  };

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={fetcher.state === "submitting"}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      <ErrorMessage error={fetcher.data?.error} data-testid="manual-payment-error-message" />
    </>
  );
};

export default PaymentButton;
