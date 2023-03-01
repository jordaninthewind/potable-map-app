import Loader from "./Loader.js";
import MenuGroup from "./MenuGroup.js";
import ModalInterface from "./ModalInterface.js";
import BottomNavigation from "./BottomNavigation.js";
import NotificationOverlay from "./NotificationOverlay.js";
import PotableMap from "./PotableMap.js";
import PotableStatusBar from "./PotableStatusBar.js";

const PotableApp = () => {
  return (
    <>
      <PotableStatusBar />
      <Loader />
      <PotableMap />
      <MenuGroup />
      <ModalInterface />
      <NotificationOverlay />
      <BottomNavigation />
    </>
  );
};

export default PotableApp;
