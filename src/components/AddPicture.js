import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, Text } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";

import { uploadWaterSourcePhoto } from "../services/storageService";
import { setModal } from "../features/modal/modalSlice";
import { BASE_BUTTON, ITEM_ROW_CONTAINER } from "../styles/buttonStyles";

const AddPicture = () => {
  const dispatch = useDispatch();

  const [savedPicture, setSavedPicture] = useState(false);
  const [devicePermission, setDevicePermission] = useState(true);
  const [type, setType] = useState(CameraType.front);

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
    setSavedPicture(photo);
  };

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const clearPicture = () => {
    setSavedPicture(null);
  };

  const goBack = () => {
    dispatch(setModal("markerInfo"));
  };

  const savePicture = async () => {
    await uploadWaterSourcePhoto({
      uri: savedPicture.uri,
      id: 3,
      filename: "something",
    });
  };

  return (
    <>
      {!savedPicture ? (
        <View>
          {devicePermission ? (
            <Camera
              style={styles.imageContainer}
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
              <IconButton
                onPress={toggleCameraType}
                icon="camera-switch"
                iconColor="rgba(0,0,0,0.5)"
                mode="contained"
                size={30}
                style={{
                  bottom: 0,
                  left: 0,
                  margin: 20,
                  position: "absolute",
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
          <Image style={styles.imageContainer} source={savedPicture} />
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
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 500,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 10,
  },
  buttonContainer: {
    ...ITEM_ROW_CONTAINER,
    width: "100%",
    marginVertical: 20,
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
