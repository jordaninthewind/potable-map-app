import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { selectSelectedMarker } from "../features/markers/markersSlice";
import { setModal } from "../features/modal/modalSlice";
import { shortenString } from "../helpers";
import { selectUser } from "../features/user/userSlice";
import { PRIMARY_TEXT_SHADOW } from "../constants";
import { selectTheme } from "../features/app/appSlice";

const MarkerInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const colorScheme = useSelector(selectTheme);
  const { longitude, latitude, name, image, rating, notes } =
    useSelector(selectSelectedMarker);

  const editMarkerInfo = () => {
    if (!user) {
      dispatch(setModal("login"));
    } else {
      dispatch(setModal("editMarker"));
    }
  };

  return (
    <BottomSheetScrollView>
      <View style={[styles.nameContainer[colorScheme], styles.columnElement]}>
        <Text
          variant="titleLarge"
          style={{
            ...PRIMARY_TEXT_SHADOW,
            color: "white",
          }}
        >
          {name}
        </Text>
      </View>
      <View style={[styles.infoContainer[colorScheme], styles.columnElement]}>
        <View>
          <Text style={styles.detailText[colorScheme]}>
            Water Quality: 7.5 / 10
          </Text>
          <Text style={styles.detailText[colorScheme]}>
            Longitude: {shortenString(longitude.toString(), 8)}
          </Text>
          <Text style={styles.detailText[colorScheme]}>
            Latitude: {shortenString(latitude.toString(), 8)}
          </Text>
          <Text style={styles.detailText[colorScheme]}>
            Taste: {rating > 5 ? "Good" : "Not Good"}
          </Text>
          <Text style={styles.detailText[colorScheme]}>Reference: N/A</Text>
          <Text style={styles.detailText[colorScheme]}>
            Distance from here: 500 ft
          </Text>
          <Text style={styles.detailText[colorScheme]}>
            Verified: 2/26/2023
          </Text>
          <Text style={styles.detailText[colorScheme]}>Notes: {notes}</Text>
        </View>
        <View>
          <Image
            source={image ? image : require("../../assets/raindrop.png")}
            style={{ height: 200, width: 100, borderRadius: 25 }}
          />
        </View>
      </View>
      <View style={styles.columnElement}>
        <Button mode="contained" onPress={editMarkerInfo}>
          {user ? "edit source" : "login to edit"}
        </Button>
      </View>
    </BottomSheetScrollView>
  );
};

const infoContainerBase = {
  alignItems: "center",
  borderRadius: 30,
  justifyContent: "center",
  padding: 20,
  flexDirection: "row",
  justifyContent: "space-between",
};

const styles = StyleSheet.create({
  locationContainer: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  nameContainer: {
    dark: {
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.2)",
      borderRadius: 30,
      justifyContent: "center",
      paddingVertical: 10,
    },
    light: {
      alignItems: "center",
      backgroundColor: "rgba(255,0,0,0.1)",
      borderRadius: 30,
      justifyContent: "center",
      paddingVertical: 10,
    },
  },
  infoContainer: {
    dark: {
      ...infoContainerBase,
      backgroundColor: "rgba(255,255,255,0.15)",
    },
    light: {
      ...infoContainerBase,
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  },
  infoContainerText: {},
  detailText: {
    dark: {
      marginVertical: 5,
      color: "rgba(255,255,255,.75)",
    },
    light: {
      marginVertical: 5,
      color: "black",
    },
  },
  columnElement: {
    marginVertical: 10,
  },
});

export default MarkerInfo;
