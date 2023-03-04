import Loader from "./Loader.js";
import ModalInterface from "./ModalInterface.js";
import BottomNavigation from "./BottomNavigation.js";
import NotificationOverlay from "./NotificationOverlay.js";
import PotableStatusBar from "./PotableStatusBar.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initApp } from "../services/services.js";
import { getAuth } from "firebase/auth";
import { setUser } from "../features/user/userSlice.js";
import { setError } from "../features/error/errorSlice.js";

const PotableApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());

    getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email }));
      } else {
        dispatch(setUser(null));
        dispatch(setError({ message: "User logged out successfully" }));
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
