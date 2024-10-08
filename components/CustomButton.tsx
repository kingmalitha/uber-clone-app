import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/lib/tw";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286FF]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  style,
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        "w-[90%] mx-auto rounded-full p-4 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 disabled:opacity-50",
        style && style,
        getBgVariantStyle(bgVariant),
      )}
      {...props}
    >
      <ActivityIndicator animating={isLoading} color="white" />

      {IconLeft && <IconLeft />}
      <Text
        style={tw.style(getTextVariantStyle(textVariant), "text-lg font-bold ")}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
