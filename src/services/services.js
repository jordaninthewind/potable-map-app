import * as Location from "expo-location";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../../firebaseConfig";
import { PIN_DATABASE } from "../constants";
import { setMarkers } from "../features/markers/markersSlice";

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
    const dispatch = useDispatch();

    let {
      coords: { latitude, longitude, latitudeDelta, longitudeDelta },
    } = await Location.getCurrentPositionAsync();

    const location = {
      longitude,
      latitude,
      latitudeDelta,
      longitudeDelta,
    };

    dispatch(setLocation(location));
  } catch (error) {}
};

export const getLocalPins = async () => {
  console.log("getting local pins...");

  try {
    const dispatch = useDispatch();
    const querySnapshot = await getDocs(collection(db, PIN_DATABASE));
    const pins = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    dispatch(setMarkers(pins));
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

export const deletePinRemote = async (pin) => {
  console.log("deleting pin...", pin);

  try {
    const docToDelete = doc(db, PIN_DATABASE, pin.id);

    const deleted = await deleteDoc(docToDelete);
    console.log("deleted", deleted);
  } catch (error) {
    throw error;
  }
};
