import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import MarkerImage from '@components/common/MarkerImage';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import {
    BASE_RADIUS,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';

const ViewImage = () => {
    const dispatch = useDispatch();

    const { id } = useSelector(selectSelectedMarker);

    const goBack = () => dispatch(setModal('markerInfo'));

    return (
        <View style={styles.container}>
            <MarkerImage id={id} style={styles.imageContainer} />
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
        borderRadius: BASE_RADIUS,
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
        borderRadius: BASE_RADIUS,
        height: 500,
        justifyContent: 'space-between',
        width: 350,
    },
});

export default ViewImage;
