import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import React from "react";
import tw from "@/lib/tw";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw.style("my-2 w-full")}>
          <Text
            style={tw.style("text-lg font-JakartaSemiBold mb-3", labelStyle)}
          >
            {label}
          </Text>

          <View
            style={tw.style(
              "flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500",
              containerStyle,
            )}
          >
            {icon && (
              <Image
                source={icon}
                style={tw.style("w-6 h-6 ml-4", iconStyle)}
              />
            )}

            <TextInput
              style={tw.style(
                "rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left",
                inputStyle,
              )}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
