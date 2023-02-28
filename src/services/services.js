import {
  // getCurrentPositionAsync,
  getLastKnownPositionAsync,
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
import { setError } from "../features/error/errorSlice";
import {
  setLoading,
  setMarkers,
  setSelectedMarker,
  setTempMarker,
} from "../features/markers/markersSlice";
import { clearModal } from "../features/modal/modalSlice";

// Device / Location Services
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
  } catch ({ message }) {
    dispatch(setError({ message }));
  }
};

export const getCurrentPosition = async () => {
  try {
    // TODO: Add follow location listener
    const { coords } = await getLastKnownPositionAsync();

    return {
      ...coords,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  } catch (error) {
    throw error;
  }
};

// Markers Services
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
  } catch ({ message }) {
    dispatch(setError({ message }));
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
    } catch ({ message }) {
      dispatch(setError({ message }));
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
  } catch ({ message }) {
    dispatch(setError({ message }));
  } finally {
    dispatch(setLoading(false));
  }
};

// Map Services
export const resetMapState = () => async (dispatch) => {
  dispatch(clearModal());
  dispatch(setTempMarker(null));
  dispatch(setSelectedMarker(null));
};
