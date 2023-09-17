import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from 'react-native-paper';

import HeadlineText from '@components/common/HeadlineText';
import { selectLoading } from '@state/markersSlice';
import {
    BASE_BUTTON,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';
import { setModal } from '@state/modalSlice';

const AddMarkerLocation = () => {
    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);

    const onPress = () => dispatch(setModal('addMarkerInfo'));

    return (
        <View>
            <HeadlineText>Add a water source</HeadlineText>
            <Text>Long press on the marker to drag</Text>
            <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={onPress} loading={loading}>
                    Press here if it's the right location
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        ...ITEM_ROW_CONTAINER,
        marginTop: SPACING_DEFAULT,
    },
    buttonStyle: {
        ...BASE_BUTTON,
    },
    input: {
        marginTop: 5,
    },
});

export default AddMarkerLocation;
