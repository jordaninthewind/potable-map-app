import * as Location from "expo-location";

export const getCurrentPosition = async () => {
  try {
    let updatedLocation = await Location.getCurrentPositionAsync();

    return {
      longitude: updatedLocation.coords.longitude,
      latitude: updatedLocation.coords.latitude,
      latitudeDelta: updatedLocation.coords.latitudeDelta ?? 0.0922,
      longitudeDelta: updatedLocation.coords.longitudeDelta ?? 0.0421,
    };
  } catch (error) {
    throw error;
  }
};
