import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import BottomNavigation from '@components/BottomNavigation.js';
import Loader from '@components/Loader.js';
import ModalInterface from '@components/ModalInterface.js';
import NotificationOverlay from '@components/NotificationOverlay.js';
import PotableStatusBar from '@components/PotableStatusBar.js';
import { initApp } from '@services/services.js';
import { setUser } from '@state/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PotableApp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initApp());

        // Listen for auth state changes
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
            getAuth(),
            (user) => dispatch(setUser(user ? user.email : null))
        );

        return unsubscribeFromAuthStatusChanged;
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
