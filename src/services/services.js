import {
    getLastKnownPositionAsync,
    requestForegroundPermissionsAsync,
    watchPositionAsync,
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

import { MARKER_DATABASE } from '@constants/constants.js';
import { app, db } from '@app/firebaseConfig.js';
import { uploadWaterSourcePhoto } from '@services/storageService';
import { setLocationPermission } from '@state/appSlice';
import { setError } from '@state/errorSlice';
import {
    setLoading,
    setLocation,
    setMarkers,
    resetSelectedMarker,
    resetTempMarker,
} from '@state/markersSlice';
import { clearModal } from '@state/modalSlice';
import { setUser, clearUser } from '@state/userSlice';

// Device / Location Services
export const requestLocationPermission = () => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        let { status } = await requestForegroundPermissionsAsync();

        const hasPermissions = status === 'granted';

        dispatch(setLocationPermission(hasPermissions));
    } catch ({ message }) {
        dispatch(setError({ message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const getCurrentPosition = () => async (dispatch) => {
    try {
        const { coords } = await getLastKnownPositionAsync();

        dispatch(setLocation(coords));
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
            const { name, rating, tags, location, createdAt } = doc.data();
            const { latitude, longitude } = location;

            return {
                id: doc.id,
                name,
                rating,
                tags,
                latitude,
                longitude,
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
    ({ name, location, rating, tags, createdBy }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));

            const pinObject = {
                name,
                rating,
                tags,
                location,
                createdBy,
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

export const saveImageRemote =
    ({ image, markerId }) =>
    async (dispatch) => {
        dispatch(setLoading(true));

        try {
            await dispatch(
                uploadWaterSourcePhoto({
                    image,
                    markerId,
                })
            );

            dispatch(setError({ message: `Updated marker!` }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

// Map Services
export const resetMapState = () => async (dispatch) => {
    dispatch(clearModal());
    dispatch(resetSelectedMarker());
    dispatch(resetTempMarker());
};

// App Services
export const initApp = () => async (dispatch) => {
    try {
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
        await getAuth(app).signOut();

        dispatch(clearUser());
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
