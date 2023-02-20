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
import { MARKER_DATABASE } from "../constants";
import { setLoading, setMarkers } from "../features/markers/markersSlice";

export const requestLocationPermission = async () => {
  try {
    let { status } = await requestForegroundPermissionsAsync();

    return status;
  } catch (error) {
    throw error;
  }
};

export const getDevicePermissions = () => async (dispatch) => {
  try {
    const permission = await requestLocationPermission();

    if (permission === "granted") {
      await updateLocation();
    } else {
      throw new Error("Location permission not granted");
    }
  } catch (error) {
    dispatch(setError(error));
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

export const getLocalMarkers = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const querySnapshot = await getDocs(collection(db, MARKER_DATABASE));
    const markers = querySnapshot.docs.map((doc) => {
      const { name, description, imageUrl, location, createdAt } = doc.data();

      return {
        id: doc.id,
        name,
        description,
        imageUrl,
        latitude: location.latitude,
        longitude: location.longitude,
        createdAt: createdAt.toDate().toString(),
      };
    });

    dispatch(setMarkers(markers));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addMarkerRemote =
  ({ name, description, imageUrl, location }) =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const pinObject = {
        name,
        description,
        imageUrl,
        location,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, MARKER_DATABASE), pinObject);

      return docRef.id;
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteMarkerRemote = (marker) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const docToDelete = doc(db, MARKER_DATABASE, marker.id);
    const deleted = await deleteDoc(docToDelete);
    console.log("deleted", deleted);
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};
