import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { savePictureRemote } from '@services/services';
import { BASE_RADIUS, ITEM_ROW_CONTAINER } from '@styles/styles';

const AddPicture = () => {
    const dispatch = useDispatch();
    const { id } = useSelector(selectSelectedMarker);

    const [image, setImage] = useState(false);
    const [devicePermission, setDevicePermission] = useState(true);

    let camera;

    useEffect(() => {
        const onStartCamera = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();

            if (status !== 'granted') {
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

    const goBack = () => dispatch(setModal('editMarker'));

    const savePicture = async () => {
        await dispatch(savePictureRemote({ image, markerId: id }));

        clearPicture();
        goBack();
    };

    return (
        <View style={styles.container}>
            {!image ? (
                <View>
                    {devicePermission ? (
                        <Camera
                            style={styles.cameraContainer}
                            focusDepth={0}
                            ref={(r) => {
                                camera = r;
                            }}
                            type={CameraType.back}
                        >
                            <IconButton
                                onPress={onTakePicture}
                                icon="camera"
                                style={styles.cameraButton}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'transparent',
        borderRadius: BASE_RADIUS,
        justifyContent: 'center',
        margin: 'auto',
    },
    buttonContainer: {
        ...ITEM_ROW_CONTAINER,
        marginVertical: 20,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        marginBottom: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    image: {
        borderRadius: BASE_RADIUS,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: BASE_RADIUS,
        height: 500,
        justifyContent: 'space-between',
        width: 350,
    },
    cameraContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: BASE_RADIUS,
        height: '75%',
        justifyContent: 'space-between',
        width: 350,
    },
    permissionDeniedContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: BASE_RADIUS,
        height: 450,
        justifyContent: 'center',
        width: 300,
    },
});

export default AddPicture;
