import React, { useEffect } from "react";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import tw from "@/lib/tw";
import { useDriverStore, useLocationStore } from "@/store";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/utils/map";
import { MarkerData } from "@/types/type";
import { icons } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { getAllDriversQuery } from "@/apis/drivers";
import { ActivityIndicator, View, Text } from "react-native";

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = React.useState<MarkerData[]>([]);
  const {
    data: drivers,
    isLoading: fetchingDrivers,
    isError: isFetchingDriversError,
    error: fetchingDriversError,
  } = useQuery(getAllDriversQuery);

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationLatitude, destinationLongitude, markers]);

  if (fetchingDrivers || !userLatitude || !userLongitude) {
    return (
      <View>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }

  if (isFetchingDriversError) {
    return (
      <View>
        <Text>{fetchingDriversError?.message}</Text>
      </View>
    );
  }

  return (
    <MapView
      style={tw.style("w-full h-full rounded-2xl")}
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      initialRegion={region}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          onPress={() => setDrivers([marker])}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}
      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key={"destination"}
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
