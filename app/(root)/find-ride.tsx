import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import tw from "@/lib/tw";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants/data";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  const router = useRouter();
  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <View style={tw.style("my-3")}>
        <Text style={tw.style("text-lg font-JakartaSemiBold mb-3")}>From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View style={tw.style("my-3")}>
        <Text style={tw.style("text-lg font-JakartaSemiBold mb-3")}>To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Find Now"
        onPress={() => router.push(`/(root)/confirm-ride`)}
        style="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
