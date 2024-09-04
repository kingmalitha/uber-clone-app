import { Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";

import { useStripe } from "@stripe/stripe-react-native";
import { PaymentProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { createNewIntentApi, createPayApi } from "@/apis/stripe";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const { mutate: pay } = useMutation({
    mutationFn: createPayApi,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: create } = useMutation({
    mutationFn: createNewIntentApi,
  });

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
    await create(
      {
        email: email,
        name: fullName || email.split("@")[0],
        amount: amount,
        paymentMethodId: paymentMethod.id,
      },
      {
        onSuccess(data, variables, context) {
          if (data.paymentIntent.client_secret) {
            pay(
              {
                payment_method_id: paymentMethod.id,
                payment_intent_id: data.paymentIntent.id,
                customer_id: data.customer,
              },
              {
                onSuccess(data, variables, context) {
                  if (data.result.client_secret) {
                    //TODO: CREATE RIDE
                  }
                },
              },
            );
          }
        },
        onError(error) {
          intentCreationCallback(error);
        },
      },
    );
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        style="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
