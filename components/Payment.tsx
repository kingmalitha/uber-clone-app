import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const Payment = () => {
  const openPaymentSheet = () => {
    console.log("Opening Payment Sheet");
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
