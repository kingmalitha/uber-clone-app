import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tw";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants/data";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swipperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView
      style={tw.style("flex h-full items-center justify-between bg-white")}
    >
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        style={tw.style("w-full flex justify-end items-end p-5")}
      >
        <Text style={tw.style("text-black text-md font-JakartaBold")}>
          Skip
        </Text>
      </TouchableOpacity>

      <Swiper
        ref={swipperRef}
        loop={false}
        dot={
          <View
            style={tw.style("w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full")}
          />
        }
        activeDot={
          <View
            style={tw.style("w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full")}
          />
        }
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            style={tw.style("flex items-center justify-center")}
          >
            <Image
              source={item.image}
              style={tw.style("w-full h-[300px]")}
              resizeMode="contain"
            />

            <View
              style={tw.style(
                "flex flex-row items-center justify-center w-full mt-10",
              )}
            >
              <Text
                style={tw.style(
                  "text-black text-3xl font-bold mx-10 text-center",
                )}
              >
                {item.title}
              </Text>
            </View>
            <Text
              style={tw.style(
                "text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3",
              )}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        style={"w-11/12 mt-10"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swipperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default Onboarding;
