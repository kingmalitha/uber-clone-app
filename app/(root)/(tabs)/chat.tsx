import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/data";
import tw from "@/lib/tw";

const Chat = () => {
  return (
    <SafeAreaView style={tw.style("flex-1 bg-white p-5")}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={tw.style("text-2xl font-JakartaBold")}>Chat</Text>
        <View style={tw.style("flex-1 flex justify-center items-center")}>
          <Image
            source={images.message}
            alt="message"
            style={tw.style("w-full h-40")}
            resizeMode="contain"
          />
          <Text style={tw.style("text-3xl font-JakartaBold mt-3")}>
            No Messages Yet
          </Text>
          <Text style={tw.style("text-base mt-2 text-center px-7")}>
            Start a conversation with your friends and family
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
