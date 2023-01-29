import React from "react";
import { StyleSheet, View } from "react-native";
import { Callout } from "react-native-maps";
import { Button, Text } from "react-native-paper";

const MarkerCallout = ({ marker }) => {
  const openPinInfo = () => {
    console.log("delete pin");
  };

  return (
    <Callout onPress={openPinInfo} style={styles.callout}>
      <Text>Title: {marker.title}</Text>
      <Text>Latitude: {marker.location?.latitude} </Text>
      <Text>Longitude: {marker.location?.longitude} </Text>
    </Callout>
  );
};

const styles = StyleSheet.create({
  callout: {
    width: 200,
  },
});

export default MarkerCallout;
