import * as Location from "expo-location";

export const requestLocationPermission = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    return status;
  } catch (error) {
    throw error;
  }
};

export const getCurrentPosition = async () => {
  console.log("getting current position...");

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

export const addPin = ({ nativeEvent }) => {
  openAddPinModal(nativeEvent.coordinate);
};
