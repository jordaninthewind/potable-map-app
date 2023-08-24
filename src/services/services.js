import {
    getLastKnownPositionAsync,
    requestForegroundPermissionsAsync,
    // watchPositionAsync,
} from 'expo-location';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';

import { MARKER_DATABASE } from '@app/constants.js';
import { db } from '@app/firebaseConfig.js';
import { setError } from '@state/errorSlice';
import {
    setLoading,
    setLocation,
    setMarkers,
    setSelectedMarker,
    setTempMarker,
} from '@state/markersSlice';
import { setDeviceLocationPermission, setTheme } from '@state/appSlice';
import { clearModal } from '@state/modalSlice';
import { setUser } from '@state/userSlice';
import { uploadWaterSourcePhoto } from '@services/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Device / Location Services
export const requestLocationPermission = () => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        let { status } = await requestForegroundPermissionsAsync();

        const hasPermissions = status === 'granted';

        dispatch(setDeviceLocationPermission(hasPermissions));
    } catch ({ message }) {
        dispatch(setError({ message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const getCurrentPosition = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { coords } = await getLastKnownPositionAsync();

        dispatch(
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            })
        );
    } catch ({ message }) {
        dispatch(setError({ message }));
    } finally {
        dispatch(setLoading(false));
    }
};

// Markers Services
export const getLocalMarkers = () => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const querySnapshot = await getDocs(collection(db, MARKER_DATABASE));
        const markers = querySnapshot.docs.map((doc) => {
            const { name, description, imageUrl, location, createdAt } =
                doc.data();

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
    ({ name, description, imageUrl = false, location }) =>
    async (dispatch, getState) => {
        try {
            dispatch(setLoading(true));

            const pinObject = {
                name,
                description,
                imageUrl,
                location,
                createdAt: new Date(),
            };

            const { id } = await addDoc(
                collection(db, MARKER_DATABASE),
                pinObject
            );

            dispatch(setError({ message: `Pin ${id} added!` }));

            return id;
        } catch ({ message }) {
            dispatch(setError({ message }));
        } finally {
            dispatch(setLoading(false));
        }
    };

export const deleteMarkerRemote = (markerId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        await deleteDoc(doc(db, MARKER_DATABASE, markerId));
        await dispatch(getLocalMarkers());
        dispatch(clearModal());
        dispatch(getCurrentPosition());
        dispatch(setError({ message: 'Marker deleted successfully!' }));
    } catch ({ message }) {
        dispatch(setError({ message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateMarkerRemote =
    ({ markerId, updatedMarker }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));

            await updateDoc(doc(db, MARKER_DATABASE, markerId), updatedMarker);
            dispatch(setError({ message: `Updated marker ${markerId}` }));
        } catch ({ message }) {
            dispatch(setError({ message }));
        } finally {
            dispatch(setLoading(false));
        }
    };

export const addPictureToMarker = (markerId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const docToModify = doc(db, MARKER_DATABASE, markerId);
        await updateDoc(docToModify, { imageUrl: true });

        dispatch(setError({ message: `Updated marker ${markerId}` }));
    } catch ({ message }) {
        dispatch(setError({ message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const savePictureRemote =
    ({ image, markerId }) =>
    async (dispatch) => {
        dispatch(setLoading(true));

        try {
            await uploadWaterSourcePhoto({
                image,
                markerId,
            });

            await dispatch(addPictureToMarker(markerId));
        } catch (error) {
            console.log(error);
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
        // Get theme from local storage
        const theme = await AsyncStorage.getItem('theme');
        dispatch(setTheme(theme));

        // Get device permissions and location
        await dispatch(requestLocationPermission());
        await dispatch(getCurrentPosition());

        // Get markers from remote database and set them in local state
        await dispatch(getLocalMarkers());
    } catch ({ message }) {
        dispatch(setError({ message }));
    }
};

// Auth Services
export const signIn =
    ({ email, password }) =>
    async (dispatch) => {
        try {
            const user = await signInWithEmailAndPassword(
                getAuth(),
                email,
                password
            );

            dispatch(setUser(user));
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

            dispatch(setUser(user));
            dispatch(clearModal());
        } catch ({ message }) {
            dispatch(setError({ message }));
        }
    };
