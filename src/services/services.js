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

import { MARKER_DATABASE } from '@app/constants';
import { db } from '@app/firebaseConfig';
import { setError } from '@features/errorSlice';
import {
    setLoading,
    setLocation,
    setMarkers,
    setSelectedMarker,
    setTempMarker,
} from '@features/markersSlice';
import { clearModal } from '@features/modalSlice';
import { setUser } from '@features/userSlice';
import { uploadWaterSourcePhoto } from '@services/storageService';

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

        const hasPermissions = status === 'granted';
        console.log('state', getState());
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
    ({ name, description, imageUrl, location }) =>
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

export const deleteMarkerRemote = (marker) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        await deleteDoc(doc(db, MARKER_DATABASE, marker.id));
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

export const updateMarkerRemote = (marker) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        await updateDoc(doc(db, MARKER_DATABASE, marker.id), marker);
        dispatch(setError({ message: `Updated marker ${marker.id}` }));
    } catch ({ message }) {
        dispatch(setError({ message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addPictureToMarker = (marker, imageUrl) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        await updateDoc(doc(db, MARKER_DATABASE, marker.id), { imageUrl });
        dispatch(setError({ message: `Updated marker ${marker.id}` }));
    } catch ({ message }) {
        dispatch(setError({ message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const savePictureRemote =
    ({ image, id }) =>
    async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const pictureUrl = await uploadWaterSourcePhoto({
                image,
                id,
            });

            dispatch(addPictureToMarker(pictureUrl));

            setImage(null);
            dispatch(setModal('markerInfo'));
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
        await dispatch(requestLocationPermission());
        await dispatch(getCurrentPosition());
        await dispatch(getLocalMarkers());
    } catch ({ message }) {
        dispatch(setError({ message }));
    }
};
