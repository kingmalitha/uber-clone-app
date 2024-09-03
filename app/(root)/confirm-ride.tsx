import { FlatList, View } from "react-native";
import React from "react";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import tw from "@/lib/tw";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id)!)}
          />
        )}
        ListFooterComponent={() => (
          <View style={tw.style("mx-5 mt-10")}>
            <CustomButton
              title="Confirm Ride"
              onPress={() => router.push("/(root)/book-ride")}
              style="mt-5"
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
