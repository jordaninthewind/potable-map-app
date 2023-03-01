import Loader from "./Loader.js";
import ModalInterface from "./ModalInterface.js";
import BottomNavigation from "./BottomNavigation.js";
import NotificationOverlay from "./NotificationOverlay.js";
import PotableStatusBar from "./PotableStatusBar.js";

const PotableApp = () => {
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
