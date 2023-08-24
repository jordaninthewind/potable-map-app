import { StyleSheet, View } from 'react-native';
import { Callout } from 'react-native-maps';
import { useDispatch } from 'react-redux';

import { setModal } from '@state/modalSlice';

const MarkerCallout = () => {
    const dispatch = useDispatch();
    const openMarkerInfo = () => {
        dispatch(setModal('markerInfo'));
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
