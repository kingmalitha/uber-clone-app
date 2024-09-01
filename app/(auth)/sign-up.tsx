import { View, Text, ScrollView, Image, Alert } from "react-native";
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
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ReactNativeModal } from "react-native-modal";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface VerificationState {
  state: "pending" | "success" | "failed" | "default";
  error: string;
  code: string;
}

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

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

  const [verification, setVerification] = React.useState<VerificationState>({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = React.useState(true);

  const onSignUpPress = handleSubmit(async (data) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: data.email,
        firstName: data.name,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].longMessage);
      } else {
        Alert.alert("Error", "Please try again later");
      }
    }
  });

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
        router.replace("/");
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: unknown) {
      let msg = "An error occurred";
      if (isClerkAPIResponseError(err)) {
        msg = err.errors[0].longMessage || "An error occurred";
      }
      setVerification({
        ...verification,
        state: "failed",
        error: msg,
      });
      Alert.alert("Error", msg);
    }
  };

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

        <View style={tw.style("px-5")}>
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

          <FormErrorMessage error={errors.name} />
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

        <CustomButton title="Sign Up" onPress={onSignUpPress} style={"mt-6"} />

        <OAuth />

        <Link
          href="/sign-in"
          style={tw.style("text-lg text-center text-general-200 mt-10")}
        >
          <Text>Already have an account?</Text>
          <Text style={tw.style("text-primary-500")}> Log In</Text>
        </Link>
      </View>

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View style={tw.style("bg-white px-7 py-9 rounded-2xl min-h-[300px]")}>
          <Text style={tw.style("text-2xl font-JakartaExtraBold text-center")}>
            Verification
          </Text>

          <Text style={tw.style("font-Jakarta mb-5 mt-2")}>
            We've sent a verification code to {signUp?.emailAddress}
          </Text>

          <InputField
            label="Verification Code"
            icon={icons.lock}
            placeholder="123456"
            keyboardType="numeric"
            value={verification.code}
            onChangeText={(code) =>
              setVerification({
                ...verification,
                code: code,
              })
            }
          />

          {verification.error && (
            <Text style={tw.style("text-red-500 text-sm mt-1")}>
              {verification.error}
            </Text>
          )}

          <CustomButton
            title="Verify"
            onPress={onPressVerify}
            style={"mt-5 "}
            bgVariant="success"
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View style={tw.style("bg-white px-7 py-9 rounded-2xl min-h-[300px]")}>
          <Image
            source={images.check}
            style={tw.style("w-[110px] h-[110px] mx-auto my-5")}
          />

          <Text style={tw.style("text-3xl font-JakartaBold text-center")}>
            Verified
          </Text>

          <Text
            style={tw.style(
              "text-base text-gray-400 font-Jakarta text-center mt-2",
            )}
          >
            You have successfully verified your account.
          </Text>

          <CustomButton
            title="Browse Home"
            onPress={() => router.replace("/(root)/(tabs)/home")}
            style={"mt-5"}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;
