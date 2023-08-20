import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

export function useAuthentication() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    setUser(user);
                } else {
                    // User is signed out
                    setUser(null);
                }
            }
        );

        return unsubscribeFromAuthStatuChanged;
    }, []);

    return {
        user,
    };
}
