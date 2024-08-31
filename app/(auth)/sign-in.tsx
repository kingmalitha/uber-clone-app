import { View, Text, ScrollView, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import tw from "@/lib/tw";
import { icons, images } from "@/constants/data";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import FormErrorMessage from "@/components/FormErrorMessage";
import OAuth from "@/components/OAuth";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInPress = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <ScrollView style={tw.style("flex-1 bg-white")}>
      <View style={tw.style("flex-1 bg-white")}>
        <View style={tw.style("relative w-full h-[250px]")}>
          <Image
            source={images.signUpCar}
            style={tw.style("z-0 w-full h-[250px]")}
          />
          <Text
            style={tw.style(
              "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5",
            )}
          >
            Welcome 👋🏻
          </Text>
        </View>

        <View style={tw.style("px-5")}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email"
                placeholder="Enter your email"
                icon={icons.person}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="email"
          />

          <FormErrorMessage error={errors.email} />
        </View>

        <View style={tw.style("px-5")}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Password"
                placeholder="Enter your password"
                icon={icons.person}
                value={value}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="password"
          />
          <FormErrorMessage error={errors.password} />
        </View>

        <CustomButton title="Sign In" onPress={onSignInPress} style={"mt-6"} />

        <OAuth />

        <Link
          href="/sign-up"
          style={tw.style("text-lg text-center text-general-200 mt-10")}
        >
          <Text>Don't have an account?</Text>
          <Text style={tw.style("text-primary-500")}> Sign Up</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignIn;
