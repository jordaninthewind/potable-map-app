import Loader from "./Loader.js";
import MenuGroup from "./MenuGroup.js";
import ModalInterface from "./ModalInterface.js";
import Navigation from "./Navigation.js";
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
      <Navigation />
    </>
  );
};

export default PotableApp;
