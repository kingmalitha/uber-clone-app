import { View, Text, ScrollView, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import tw from "@/lib/tw";
import { icons, images } from "@/constants/data";
import InputField from "@/components/InputField";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
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
            Create Your Account
          </Text>
        </View>

        <View style={tw.style("p-5")}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Name"
                placeholder="Enter your name"
                icon={icons.person}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="name"
          />
          {errors.name && <Text>This is required.</Text>}
        </View>

        <View style={tw.style("p-5")}>
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
          {errors.email && <Text>This is required.</Text>}
        </View>

        <View style={tw.style("p-5")}>
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
          {errors.password && <Text>This is required.</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
