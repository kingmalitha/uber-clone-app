import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";

import RideLayout from "@/components/RideLayout";
import { useDriverStore, useLocationStore } from "@/store";
import { formatTime } from "@/lib/utils/date";
import { icons } from "@/constants/data";
import tw from "@/lib/tw";
import Payment from "@/components/Payment";

import { StripeProvider } from "@stripe/stripe-react-native";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver,
  )[0];

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="kingmalitha.uber.com" // required for Apple Pay
      urlScheme="myapp" // required for 3D Secure and bank redirects
    >
      <RideLayout title="Book Ride">
        <>
          <Text style={tw.style("text-xl font-JakartaSemiBold mb-3")}>
            Ride Information
          </Text>

          <View
            style={tw.style(
              "flex flex-col w-full items-center justify-center mt-10",
            )}
          >
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              style={tw.style("w-28 h-28 rounded-full")}
            />

            <View
              style={tw.style(
                "flex flex-row items-center justify-center mt-5 gap-x-2",
              )}
            >
              <Text style={tw.style("text-lg font-JakartaSemiBold")}>
                {driverDetails?.title}
              </Text>

              <View style={tw.style("flex flex-row items-center space-x-0.5")}>
                <Image
                  source={icons.star}
                  style={tw.style("w-5 h-5")}
                  resizeMode="contain"
                />
                <Text style={tw.style("text-lg font-Jakarta")}>
                  {driverDetails?.rating}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={tw.style(
              "flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5",
            )}
          >
            <View
              style={tw.style(
                "flex flex-row items-center justify-between w-full border-b border-white py-3",
              )}
            >
              <Text style={tw.style("text-lg font-Jakarta")}>Ride Price</Text>
              <Text style={tw.style("text-lg font-Jakarta text-[#0CC25F]")}>
                ${driverDetails?.price}
              </Text>
            </View>

            <View
              style={tw.style(
                "flex flex-row items-center justify-between w-full border-b border-white py-3",
              )}
            >
              <Text style={tw.style("text-lg font-Jakarta")}>Pickup Time</Text>
              <Text style={tw.style("text-lg font-Jakarta")}>
                {formatTime(parseInt(`${driverDetails?.time!}`) || 5)}
              </Text>
            </View>

            <View
              style={tw.style(
                "flex flex-row items-center justify-between w-full py-3",
              )}
            >
              <Text style={tw.style("text-lg font-Jakarta")}>Car Seats</Text>
              <Text style={tw.style("text-lg font-Jakarta")}>
                {driverDetails?.car_seats}
              </Text>
            </View>
          </View>

          <View
            style={tw.style(
              "flex flex-col w-full items-start justify-center mt-5",
            )}
          >
            <View
              style={tw.style(
                "flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3",
              )}
            >
              <Image source={icons.to} style={tw.style("w-6 h-6")} />
              <Text style={tw.style("text-lg font-Jakarta ml-2")}>
                {userAddress}
              </Text>
            </View>

            <View
              style={tw.style(
                "flex flex-row items-center justify-start border-b border-general-700 w-full py-3",
              )}
            >
              <Image source={icons.point} style={tw.style("w-6 h-6")} />
              <Text style={tw.style("text-lg font-Jakarta ml-2")}>
                {destinationAddress}
              </Text>
            </View>
          </View>
          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.id!}
            rideTime={driverDetails?.time!}
          />
        </>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;
