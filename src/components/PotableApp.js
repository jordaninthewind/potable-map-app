import Loader from "./Loader.js";
import ModalInterface from "./ModalInterface.js";
import BottomNavigation from "./BottomNavigation.js";
import NotificationOverlay from "./NotificationOverlay.js";
import PotableStatusBar from "./PotableStatusBar.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initApp } from "../services/services.js";

const PotableApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, []);

  return (
    <>
      <PotableStatusBar />
      <Loader />
      <ModalInterface />
      <NotificationOverlay />
      <BottomNavigation />
    </>
  );
};

export default PotableApp;
