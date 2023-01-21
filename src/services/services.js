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

export const getLocalPins = async () => {
  console.log("getting local pins...");

  try {
    const pins = new Promise((resolve, reject) =>
      resolve([
        {
          latitude: 37.358976116948014,
          longitude: -122.02175059936164,
        },
      ])
    );

    return pins;
  } catch (error) {
    throw error;
  }
};
