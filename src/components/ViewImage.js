import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import MarkerImage from '@components/common/MarkerImage';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import {
    RADIUS_DEFAULT,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';
import { useState } from 'react';

const ViewImage = () => {
    const dispatch = useDispatch();

    const [fullSize, setFullSize] = useState(false);

    const { id } = useSelector(selectSelectedMarker);

    const toggleFullScreen = () => setFullSize(!fullSize);

    const goBack = () => dispatch(setModal('markerInfo'));

    return (
        <View style={styles.container}>
            {fullSize ? (
                <Portal>
                    <Pressable onPress={toggleFullScreen}>
                        <MarkerImage id={id} size="fullscreen" />
                    </Pressable>
                </Portal>
            ) : (
                <Pressable onPress={toggleFullScreen}>
                    <MarkerImage id={id} size="large" />
                </Pressable>
            )}
            <View style={styles.buttonContainer}>
                <Button onPress={goBack} mode="contained">
                    Go back
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: RADIUS_DEFAULT,
        height: '100%',
        justifyContent: 'center',
        margin: 'auto',
        width: '100%',
    },
    buttonContainer: {
        ...ITEM_ROW_CONTAINER,
        marginVertical: SPACING_DEFAULT,
    },
    imageContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: RADIUS_DEFAULT,

        justifyContent: 'space-between',
    },
});

export default ViewImage;
