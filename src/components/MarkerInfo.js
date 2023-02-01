import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedMarker } from "../features/markers/markersSlice";

const MarkerInfo = () => {
  const dispatch = useDispatch();

  const MarkerInfo = useSelector(selectSelectedMarker);

  return (
    <View styles={styles.container}>
      {MarkerInfo && (
        <>
          <Text>Title: {MarkerInfo.title}</Text>
          <Text>Latitude: {MarkerInfo.location?.latitude} </Text>
          <Text>Longitude: {MarkerInfo.location?.longitude} </Text>
          <Image></Image>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default MarkerInfo;
