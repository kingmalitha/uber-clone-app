import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { DriverCardProps } from "@/types/type";
import { icons } from "@/constants/data";
import tw from "@/lib/tw";
import { formatTime } from "@/lib/utils/date";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={tw.style(
        "flex flex-row items-center justify-between py-5 px-3 rounded-xl",
        selected === item.id ? "bg-general-600" : "bg-white",
      )}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        style={tw.style("w-14 h-14 rounded-full")}
      />

      <View
        style={tw.style("flex-1 flex flex-col items-start justify-center mx-3")}
      >
        <View style={tw.style("flex flex-row items-center justify-start mb-1")}>
          <Text style={tw.style("text-lg font-JakartaRegular")}>
            {item.title}
          </Text>

          <View style={tw.style("flex flex-row items-center space-x-1 ml-2")}>
            <Image source={icons.star} style={tw.style("w-3.5 h-3.5")} />
            <Text style={tw.style("text-sm font-JakartaRegular")}>4</Text>
          </View>
        </View>

        <View style={tw.style("flex flex-row items-center justify-start")}>
          <View style={tw.style("flex flex-row items-center")}>
            <Image source={icons.dollar} style={tw.style("w-4 h-4")} />
            <Text style={tw.style("text-sm font-JakartaRegular ml-1")}>
              ${item.price}
            </Text>
          </View>

          <Text
            style={tw.style(
              "text-sm font-JakartaRegular text-general-800 mx-1",
            )}
          >
            |
          </Text>

          <Text
            style={tw.style("text-sm font-JakartaRegular text-general-800")}
          >
            {formatTime(item.time!)}
          </Text>

          <Text
            style={tw.style(
              "text-sm font-JakartaRegular text-general-800 mx-1",
            )}
          >
            |
          </Text>

          <Text
            style={tw.style("text-sm font-JakartaRegular text-general-800")}
          >
            {item.car_seats} seats
          </Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        style={tw.style("w-14 h-14 ")}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCard;
