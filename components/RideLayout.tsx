import { View, Image, TouchableOpacity, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import tw from "@/lib/tw";
import { icons } from "@/constants/data";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Map from "./Map";

const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}) => {
  const router = useRouter();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View style={tw.style("flex-1 bg-white")}>
        <View style={tw.style("flex flex-col h-screen bg-blue-500")}>
          <View
            style={tw.style(
              "flex flex-row absolute z-10 top-16 items-center justify-start px-5",
            )}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <View
                style={tw.style(
                  "size-10 bg-white rounded-full items-center justify-center",
                )}
              >
                <Image
                  source={icons.backArrow}
                  style={tw.style("w-6 h-6")}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <Text style={tw.style("text-xl font-JakartaSemiBold ml-5")}>
              {title || "Go Back"}
            </Text>
          </View>
          <Map />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
