import {
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
  // watchPositionAsync,
} from "expo-location";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";
import { MARKER_DATABASE } from "../constants";
import { setError } from "../features/error/errorSlice";
import {
  setLoading,
  setLocation,
  setMarkers,
  setSelectedMarker,
  setTempMarker,
} from "../features/markers/markersSlice";
import { clearModal } from "../features/modal/modalSlice";
import { setUser } from "../features/user/userSlice";

// Auth Services
export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(getAuth(), email, password);

      dispatch(setUser({ id: user.uid, email: user.email }));
      dispatch(setError({ message: `Logged in successfully!` }));
      dispatch(clearModal());
    } catch ({ message }) {
      dispatch(setError({ message }));
    }
  };

export const signOut = () => async (dispatch) => {
  try {
    await getAuth().signOut();

    dispatch(setUser(null));
    dispatch(setError({ message: `Logged out successfully!` }));
  } catch ({ message }) {
    dispatch(setError({ message }));
  }
};

export const signUp =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = createUserWithEmailAndPassword({ email, password });

      dispatch(setUser({ id: user.uid, email: user.email }));
      dispatch(clearModal());
    } catch ({ message }) {
      dispatch(setError({ message }));
    }
  };

// Device / Location Services
export const requestLocationPermission = () => async (getState, dispatch) => {
  dispatch(setLoading(true));

  try {
    let { status } = await requestForegroundPermissionsAsync();

    const hasPermissions = status === "granted";
    console.log("state", getState());
    dispatch(setDeviceLocationPermission(hasPermissions));
  } catch ({ message }) {
    dispatch(setError({ message }));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getCurrentPosition = () => async (dispatch) => {
  try {
    const { coords } = await getLastKnownPositionAsync();

    dispatch(
      setLocation({
        ...coords,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      })
    );
  } catch ({ message }) {
    dispatch(setError({ message }));
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

export const updateMarkerRemote = (marker) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const docToUpdate = doc(db, MARKER_DATABASE, marker.id);
    await updateDoc(docToUpdate, marker);

    dispatch(setError({ message: `Updated marker ${marker.id}` }));
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

// App Services
export const initApp = () => async (dispatch) => {
  try {
    await dispatch(requestLocationPermission());
    await dispatch(getLocalMarkers());
  } catch ({ message }) {
    dispatch(setError({ message }));
  }
};
