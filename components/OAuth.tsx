import { View, Text, Image, Alert } from "react-native";
import React from "react";
import tw from "@/lib/tw";
import CustomButton from "./CustomButton";
import { icons } from "@/constants/data";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "@/lib/auth";
import { useRouter } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const handleGoogleSignIn = React.useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code === "session_exists" && result.success) {
        Alert.alert("Success", "Session exists. Redirecting to home screen.");
        router.replace("/(root)/(tabs)/home");
      }

      Alert.alert(result.success ? "Success" : "Error", result.message);
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [router, startOAuthFlow]);

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
