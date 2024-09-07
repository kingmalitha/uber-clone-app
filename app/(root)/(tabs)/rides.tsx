import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { images } from "@/constants/data";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import tw from "@/lib/tw";

const Rides = () => {
  const { user } = useUser();

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white")}>
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={tw.style("px-5")}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View style={tw.style("flex flex-col items-center justify-center")}>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  style={tw.style("w-40 h-40")}
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text style={tw.style("text-sm")}>No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text style={tw.style("text-2xl font-JakartaBold my-5")}>
              All Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
