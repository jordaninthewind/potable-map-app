import { useEffect, useRef } from "react";
import { useColorScheme, StyleSheet, Vibration, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import MarkerCallout from "./MarkerCallout";
import {
  addMarker,
  selectMarkers,
  selectLocation,
  setLoading,
  setLocation,
  setSelectedMarker,
} from "../features/markers/markersSlice";
import { setError } from "../features/error/errorSlice";
import { getCurrentPosition, getLocalMarkers } from "../services/services";
import { setModal } from "../features/modal/modalSlice";
import { selectTheme } from "../features/app/appSlice";

const PotableMap = () => {
  const mapRef = useRef(null);

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const darkMode = useSelector(selectTheme);

  const markers = useSelector(selectMarkers);
  const location = useSelector(selectLocation);

  const updateLocation = async () => {
    dispatch(setLoading(true));

    try {
      const position = await getCurrentPosition();

      dispatch(setLocation(position));
    } catch ({ message }) {
      dispatch(setError({ message }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(location, 3000);
    }
  }, [location]);

  const openAddMarkerScreen = ({ nativeEvent }) => {
    Vibration.vibrate();
    addMarker(nativeEvent.coordinate);
    // TODO: Add error if map not zoomed in enough

    dispatch(setSelectedMarker(nativeEvent.coordinate));
    dispatch(setModal("addMarker"));
  };

  useEffect(() => {
    dispatch(getLocalMarkers());
    // const getMarkers = async () => {
    //   const markers = await dispatch(getLocalMarkers());

    //   dispatch(setMarkers(markers));
    // };

    // getMarkers();
  }, []);

  // const updateMarkerLocation = ({ nativeEvent, marker }) => {
  //   console.log("updateMarkerLocation", nativeEvent);

  //   updateMarkerLocation;
  // };

  // const onMove = () => {
  //   console.log("onMove");
  // };

  return (
    <MapView
      ref={mapRef}
      onLongPress={openAddMarkerScreen}
      // onRegionChangeComplete={onMove}
      userInterfaceStyle={darkMode}
      region={location}
      // provider="google"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      showsTraffic={true}
      style={styles.map}
      // userInterfaceStyle={colorScheme}
    >
      {markers?.map((marker, index) => {
        const { latitude, longitude, title, type } = marker;
        return (
          <Marker
            calloutVisible={true}
            coordinate={{ latitude, longitude }}
            draggable
            // onDragEnd={(e) => updateMarkerLocation({ nativeEvent: e, marker })}
            key={`pin${index}`}
            pinColor="blue"
            title={title}
          >
            <View style={[styles.marker, styles.type]} />
            <MarkerCallout marker={marker} />
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  callout: {
    padding: 30,
  },
  map: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  marker: {
    backgroundColor: "lightblue",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "blue",
    height: 10,
    width: 10,
  },
});

export default PotableMap;
