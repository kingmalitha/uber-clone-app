import { View, Text, Image } from "react-native";
import React from "react";
import { Ride } from "@/types/type";
import tw from "@/lib/tw";
import { icons } from "@/constants/data";
import { formatDate, formatTime } from "@/lib/utils/date";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View
      style={tw.style(
        "flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3",
      )}
    >
      <View style={tw.style("flex flex-col items-center justify-center p-3")}>
        <View style={tw.style("flex flex-row items-center justify-center ")}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={tw.style("w-[80px] h-[90px] rounded-lg")}
          />
          <View style={tw.style("flex flex-col mx-5 gap-y-5 flex-1")}>
            <View style={tw.style("flex flex-row items-center gap-x-2 ")}>
              <Image source={icons.to} style={tw.style("w-5 h-5")} />
              <Text
                style={tw.style("font-JakartaMedium text-base")}
                numberOfLines={1}
              >
                {ride.origin_address}
              </Text>
            </View>

            <View style={tw.style("flex flex-row items-center gap-x-2 ")}>
              <Image source={icons.point} style={tw.style("w-5 h-5")} />
              <Text
                style={tw.style("font-JakartaMedium text-base")}
                numberOfLines={1}
              >
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={tw.style(
            "flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-center justify-center",
          )}
        >
          <View
            style={tw.style(
              "flex flex-row items-center w-full justify-between mb-5",
            )}
          >
            <Text
              style={tw.style("text-base font-JakartaMedium text-gray-500")}
            >
              Date & Time
            </Text>

            <Text
              style={tw.style("text-base font-JakartaMedium text-gray-500")}
            >
              {formatDate(ride.created_at)} {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View
            style={tw.style(
              "flex flex-row items-center w-full justify-between mb-5",
            )}
          >
            <Text
              style={tw.style("text-base font-JakartaMedium text-gray-500")}
            >
              Driver
            </Text>

            <Text
              style={tw.style("text-base font-JakartaMedium text-gray-500")}
            >
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View
            style={tw.style(
              "flex flex-row items-center w-full justify-between mb-5",
            )}
          >
            <Text
              style={tw.style("text-base font-JakartaMedium text-gray-500")}
            >
              Car Seats
            </Text>

            <Text
              style={tw.style("text-base font-JakartaMedium text-gray-500")}
            >
              {ride.driver.car_seats}
            </Text>
          </View>

          <View
            style={tw.style(
              "flex flex-row items-center w-full justify-between",
            )}
          >
            <Text
              style={tw.style("text-base font-JakartaMedium text-gray-500")}
            >
              Payment Status
            </Text>

            <Text
              style={tw.style(
                "text-base font-JakartaMedium capitalize",
                ride.payment_status === "paid"
                  ? "text-green-500"
                  : "text-red-500",
              )}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
