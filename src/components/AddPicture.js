import { useEffect, useState } from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, ProgressBar } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

import HeadlineText from '@components/common/HeadlineText';
import { savePictureRemote } from '@services/services';
import { selectUploadProgress } from '@state/appSlice';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import {
    BASE_RADIUS,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';

const AddPicture = () => {
    const dispatch = useDispatch();
    const { id } = useSelector(selectSelectedMarker);
    const progress = useSelector(selectUploadProgress);
    const [status, requestPermission] = Camera.useCameraPermissions();
    const devicePermission = status && status.status === 'granted';
    const [image, setImage] = useState(false);

    useEffect(() => {
        if (!devicePermission) {
            requestPermission();
        }
    }, [status]);

    let camera;

    const onTakePicture = async () => {
        const photo = await camera.takePictureAsync();

        setImage(photo);
    };

    const clearPicture = () => setImage(null);

    const goBack = () => dispatch(setModal('editMarker'));

    const goToSettings = () => {
        Linking.openSettings();
    };

    const savePicture = async () => {
        await dispatch(savePictureRemote({ image, markerId: id }));

        // clearPicture();
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
                            ref={(ref) => (camera = ref)}
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
                            <HeadlineText
                                style={{ textAlign: 'center' }}
                                copy="Enable camera permissions to add an image"
                            >
                                <Button mode="contained" onPress={goToSettings}>
                                    Go to phone settings
                                </Button>
                            </HeadlineText>
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
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageContainer} source={image} />
                        <ProgressBar
                            style={styles.progressBar}
                            progress={progress}
                        />
                    </View>
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
        marginVertical: SPACING_DEFAULT,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        marginBottom: SPACING_DEFAULT,
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
        height: 500,
        justifyContent: 'space-between',
        position: 'relative',
    },
    cameraContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: BASE_RADIUS,
        height: '100%',
        justifyContent: 'space-between',
        maxHeight: 500,
        width: 350,
    },
    permissionDeniedContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: BASE_RADIUS,
        padding: SPACING_DEFAULT,
        height: 450,
        justifyContent: 'space-evenly',
        width: 300,
    },
    progressBar: {
        bottom: 0,
        height: 5,
        position: 'absolute',
        width: '100%',
    },
});

export default AddPicture;
