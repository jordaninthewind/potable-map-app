import { useEffect, useState } from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, ProgressBar } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

import HeadlineText from '@components/common/HeadlineText';
import { saveImageRemote } from '@services/services';
import { selectUploadProgress } from '@state/appSlice';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import {
    RADIUS_DEFAULT,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';

const AddImage = () => {
    const dispatch = useDispatch();

    const { id } = useSelector(selectSelectedMarker);
    const progress = useSelector(selectUploadProgress);
    const [image, setImage] = useState(false);

    const [status, requestPermission] = Camera.useCameraPermissions();
    const devicePermission = status?.status === 'granted';

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

    const goToSettings = () => Linking.openSettings();

    const savePicture = async () => {
        await dispatch(saveImageRemote({ image, markerId: id }));

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
                            quality={0.5}
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
        alignItems: 'center',
        borderRadius: RADIUS_DEFAULT,
        backgroundColor: 'transparent',
        height: '100%',
        justifyContent: 'center',
        margin: 'auto',
        width: '100%',
    },
    buttonContainer: {
        ...ITEM_ROW_CONTAINER,
        marginVertical: SPACING_DEFAULT,
    },
    cameraButton: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        bottom: 0,
        height: 70,
        marginBottom: SPACING_DEFAULT,
        position: 'absolute',
        width: 70,
    },
    image: {
        borderRadius: RADIUS_DEFAULT,
    },
    imageContainer: {
        height: 500,
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%',
    },
    cameraContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: RADIUS_DEFAULT,
        height: '85%',
        justifyContent: 'space-between',
        width: 350,
    },
    permissionDeniedContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: RADIUS_DEFAULT,
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

export default AddImage;
