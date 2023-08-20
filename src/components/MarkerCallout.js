import { StyleSheet, View } from 'react-native';
import { Callout } from 'react-native-maps';
import { useDispatch } from 'react-redux';

import { setSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';

const MarkerCallout = ({ marker }) => {
    const dispatch = useDispatch();
    const openMarkerInfo = () => {
        dispatch(setSelectedMarker(marker));
        dispatch(setModal('markerInfo', marker));
    };

    return (
        <Callout tooltip onPress={openMarkerInfo}>
            <View style={styles.container}>
                {/* TODO: Add marker type graphic here */}
            </View>
        </Callout>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white',
    },
});

export default MarkerCallout;
