import { Alert, View, Image, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";

import { useStripe } from "@stripe/stripe-react-native";
import { PaymentProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { createNewIntentApi, createPayApi } from "@/apis/stripe";
import { createRideApi } from "@/apis/ride";
import { useLocationStore } from "@/store";
import { useAuth } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import tw from "@/lib/tw";
import { images } from "@/constants/data";
import { router } from "expo-router";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { userId } = useAuth();
  const [success, setSuccess] = useState(false);

  const {
    userAddress,
    userLatitude,
    userLongitude,
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { mutate: pay } = useMutation({
    mutationFn: createPayApi,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: create } = useMutation({
    mutationFn: createNewIntentApi,
  });

  const { mutate: createRide } = useMutation({
    mutationFn: createRideApi,
  });

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "KingMalitha Rides",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "USD",
        },
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
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
                          if (
                            !userAddress ||
                            !destinationAddress ||
                            !userLatitude ||
                            !userLongitude ||
                            !destinationLatitude ||
                            !destinationLongitude
                          ) {
                            return;
                          }

                          createRide({
                            origin_address: userAddress,
                            destination_address: destinationAddress,
                            origin_latitude: userLatitude,
                            origin_longitude: userLongitude,
                            destination_latitude: destinationLatitude,
                            destination_longitude: destinationLongitude,
                            ride_time: rideTime.toFixed(0),
                            fare_price: parseInt(amount) * 100,
                            payment_status: "paid",
                            user_id: userId!,
                            driver_id: driverId,
                          });

                          intentCreationCallback({
                            clientSecret: data.result.client_secret,
                          });
                        }
                      },
                    },
                  );
                }
              },
            },
          );
        },
      },
      returnURL: "myapp://book-ride",
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

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        style="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => {
          setSuccess(false);
        }}
      >
        <View
          style={tw.style(
            "flex flex-col items-center justify-center bg-white p-7 rounded-2xl",
          )}
        >
          <Image source={images.check} style={tw.style("w-28 h-28 mt-5")} />

          <Text style={tw.style("text-2xl text-center font-JakartaBold mt-5")}>
            Ride booked!
          </Text>

          <Text
            style={tw.style(
              "text-base text-general-200 text-center font-JakartaMedium mt-3",
            )}
          >
            Thank you for booking a ride with us. Your ride has been booked.
            Please proceed to the pickup location.
          </Text>

          <CustomButton
            title="Back to Home"
            style="mt-5"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
