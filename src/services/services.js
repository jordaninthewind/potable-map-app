import * as Location from "expo-location";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { PIN_DATABASE } from "../constants";

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
    const querySnapshot = await getDocs(collection(db, PIN_DATABASE));
    const pins = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return pins;
  } catch (error) {
    throw error;
  }
};

export const addPinRemote = async (pin) => {
  console.log("adding pin...");

  try {
    const docRef = await addDoc(collection(db, PIN_DATABASE), pin);

    return docRef.id;
  } catch (error) {
    throw error;
  }
};
