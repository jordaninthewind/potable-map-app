import { Callout } from "react-native-maps";
import { Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setSelectedMarker } from "../features/markers/markersSlice";
import { setModal } from "../features/modal/modalSlice";

const MarkerCallout = ({ marker }) => {
  const dispatch = useDispatch();

  const openMarkerInfo = () => {
    dispatch(setSelectedMarker(marker));
    dispatch(setModal("markerInfo", marker));
    console.log("delete pin");
  };

  return (
    <Callout onPress={openMarkerInfo}>
      <Text>Title: {marker.title}</Text>
      <Text>Latitude: {marker.location?.latitude} </Text>
      <Text>Longitude: {marker.location?.longitude} </Text>
      <Button onPress={openMarkerInfo}>Details</Button>
    </Callout>
  );
};

export default MarkerCallout;
