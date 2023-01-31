import { Callout } from "react-native-maps";
import { Text } from "react-native-paper";

import { deletePinRemote } from "../services/services";

const MarkerCallout = ({ marker }) => {
  const openPinInfo = () => {
    deletePinRemote(marker);
    console.log("delete pin");
  };

  return (
    <Callout onPress={openPinInfo}>
      <Text>Title: {marker.title}</Text>
      <Text>Latitude: {marker.location?.latitude} </Text>
      <Text>Longitude: {marker.location?.longitude} </Text>
    </Callout>
  );
};

export default MarkerCallout;
