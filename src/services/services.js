import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";
import { PIN_DATABASE } from "../constants";

export const requestLocationPermission = async () => {
  try {
    let { status } = await requestForegroundPermissionsAsync();

    return status;
  } catch (error) {
    throw error;
  }
};

export const getCurrentPosition = async () => {
  console.log("getting current position...");

  try {
    const { coords } = await getCurrentPositionAsync();

    const { latitude, longitude } = coords;

    const location = {
      longitude,
      latitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

    return location;
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

export const deletePinRemote = async (marker) => {
  try {
    const docToDelete = doc(db, PIN_DATABASE, marker.id);
    const deleted = await deleteDoc(docToDelete);
    console.log("deleted", deleted);
  } catch (error) {
    throw error;
  }
};
