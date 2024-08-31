import { View, Text, Image } from "react-native";
import React from "react";
import tw from "@/lib/tw";
import CustomButton from "./CustomButton";
import { icons } from "@/constants/data";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <View>
      <View
        style={tw.style(
          "flex flex-row justify-center items-center mt-4 gap-x-3 px-5",
        )}
      >
        <View style={tw.style("flex-1 h-[1px] bg-general-100")} />
        <Text style={tw.style("text-lg")}>Or</Text>
        <View style={tw.style("flex-1 h-[1px] bg-general-100")} />
      </View>
      <CustomButton
        title="Login with Google"
        bgVariant="outline"
        textVariant="primary"
        style="mt-5  shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            style={tw.style("size-5 mx-2")}
          />
        )}
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
