import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';

import { setError } from '@features/errorSlice.js';
import { setUser } from '@features/userSlice.js';
import BottomNavigation from '@components/BottomNavigation.js';
import Loader from '@components/Loader.js';
import ModalInterface from '@components/ModalInterface.js';
import NotificationOverlay from '@components/NotificationOverlay.js';
import PotableStatusBar from '@components/PotableStatusBar.js';
import { initApp } from '@services/services.js';

const PotableApp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initApp());

        getAuth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUser({ id: user.uid, email: user.email }));
            } else {
                dispatch(setUser(null));
                dispatch(setError({ message: 'User logged out successfully' }));
            }
        });
    }, []);

    return (
        <>
            <PotableStatusBar />
            <Loader />
            <ModalInterface />
            <BottomNavigation />
            <NotificationOverlay />
        </>
    );
};

export default PotableApp;
