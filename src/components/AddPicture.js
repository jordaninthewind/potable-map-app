import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { uploadWaterSourcePhoto } from "../services/storageService";
import { setModal } from "../features/modal/modalSlice";
import { ITEM_ROW_CONTAINER } from "../styles/buttonStyles";
import { selectSelectedMarker } from "../features/markers/markersSlice";
import { addPictureToMarker } from "../services/services";

const AddPicture = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(selectSelectedMarker);

  const [image, setImage] = useState(false);
  const [devicePermission, setDevicePermission] = useState(true);
  const [type, setType] = useState(CameraType.back);

  let camera;

  useEffect(() => {
    const onStartCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== "granted") {
        setDevicePermission(false);
      }
    };

    onStartCamera();
  }, []);

  const onTakePicture = async () => {
    const photo = await camera.takePictureAsync();

    setImage(photo);
  };

  const clearPicture = () => setImage(null);

  const goBack = () => dispatch(setModal("editMarker"));

  const savePicture = async () => {
    const pictureUrl = await uploadWaterSourcePhoto({
      image,
      id,
      filename: "pic.jpeg",
    });

    dispatch(addPictureToMarker(pictureUrl));
  };

  return (
    <BottomSheetScrollView>
      {!image ? (
        <View>
          {devicePermission ? (
            <Camera
              style={styles.imageContainer}
              focusDepth={0}
              ref={(r) => {
                camera = r;
              }}
              type={type}
            >
              <TouchableOpacity
                onPress={onTakePicture}
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: "center",
                  marginBottom: 20,
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </Camera>
          ) : (
            <View style={styles.permissionDeniedContainer}>
              <Text>Camera permission denied</Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button type="outlined" onPress={goBack}>
              Go back
            </Button>
          </View>
        </View>
      ) : (
        <>
          <Image style={styles.imageContainer} source={image} />
          <View style={styles.buttonContainer}>
            <Button onPress={clearPicture} mode="outlined">
              Retake
            </Button>
            <Button onPress={savePicture} mode="contained">
              Use
            </Button>
          </View>
        </>
      )}
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    ...ITEM_ROW_CONTAINER,
    marginVertical: 20,
    width: "100%",
  },
  image: {
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 500,
    justifyContent: "space-between",
    width: 350,
  },
  permissionDeniedContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 450,
    justifyContent: "center",
    width: 300,
  },
});

export default AddPicture;
