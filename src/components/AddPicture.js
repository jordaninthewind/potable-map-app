import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Text } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";

import { uploadWaterSourcePhoto } from "../services/storageService";
import { BASE_BUTTON } from "../styles/buttonStyles";

const AddPicture = () => {
  const user = useSelector((state) => state.user);
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
        </View>
      ) : (
        <>
          <Image style={styles.imageContainer} source={savedPicture} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={savePicture}
              style={{
                ...BASE_BUTTON,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Use
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clearPicture}
              style={{
                ...BASE_BUTTON,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Retake
              </Text>
            </TouchableOpacity>
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
    height: 450,
    justifyContent: "space-between",
    width: 300,
  },
  image: {
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
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
