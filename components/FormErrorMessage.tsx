import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tw";
import { FieldError } from "react-hook-form";

interface FormErrorMessageProps {
  error: FieldError | undefined;

  containerStyle?: string;

  textStyle?: string;
}

const FormErrorMessage = ({
  error,
  containerStyle,
  textStyle,
}: FormErrorMessageProps) => {
  return (
    <View style={tw.style("h-5 justify-center", containerStyle)}>
      {error && (
        <Text style={tw.style("text-red-500 text-sm", textStyle)}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default FormErrorMessage;
