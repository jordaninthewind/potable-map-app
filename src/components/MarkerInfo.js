import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { selectSelectedMarker } from "../features/markers/markersSlice";
import { setModal } from "../features/modal/modalSlice";
import { shortenString } from "../helpers";
import { ITEM_ROW_CONTAINER } from "../styles/buttonStyles";
import { selectUser } from "../features/user/userSlice";
import { PRIMARY_TEXT_SHADOW } from "../constants";

const MarkerInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
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
      <View style={[styles.nameContainer, styles.columnElement]}>
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
      <View style={[styles.infoContainer, styles.columnElement]}>
        <View>
          <Text style={styles.detailText}>Water Quality: 7.5 / 10</Text>
          <Text style={styles.detailText}>
            Longitude: {shortenString(longitude.toString(), 8)}
          </Text>
          <Text style={styles.detailText}>
            Latitude: {shortenString(latitude.toString(), 8)}
          </Text>
          <Text style={styles.detailText}>
            Taste: {rating > 5 ? "Good" : "Not Good"}
          </Text>
          <Text style={styles.detailText}>Reference: N/A</Text>
          <Text style={styles.detailText}>Distance from here: 500 ft</Text>
          <Text style={styles.detailText}>Verified: 2/26/2023</Text>
          <Text style={styles.detailText}>Notes: {notes}</Text>
        </View>
        <View>
          <Image
            source={image ? image : require("../../assets/raindrop.png")}
            style={{ height: 200, width: 100, borderRadius: 25 }}
          />
        </View>
      </View>
      <View style={[ITEM_ROW_CONTAINER, styles.columnElement]}>
        <Button mode="outlined" onPress={editMarkerInfo}>
          {user ? "edit source" : "login to edit"}
        </Button>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  nameContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255,0,0,0.1)",
    borderRadius: 30,
    justifyContent: "center",
    paddingVertical: 10,
  },
  infoContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 30,
    justifyContent: "center",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: { marginVertical: 5 },
  columnElement: {
    marginVertical: 10,
  },
});

export default MarkerInfo;
