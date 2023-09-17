import { GeoPoint } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import HeadlineText from '@components/common/HeadlineText';
import InfoTile from '@components/common/InfoTile';
import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';
import StarRating from '@components/common/StarRating';
import TagChips from '@components/common/TagChips';
import { addMarkerRemote, getLocalMarkers } from '@services/services';
import {
    resetTempMarker,
    selectLoading,
    selectTempMarker,
} from '@state/markersSlice';
import { clearModal } from '@state/modalSlice';
import { selectUserEmail } from '@state/userSlice';
import {
    BASE_BUTTON,
    ELEMENT_GROUP_SPACING,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';

const AddMarkerInfoModal = () => {
    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);
    const tempMarker = useSelector(selectTempMarker);
    const userEmail = useSelector(selectUserEmail);
    const location = new GeoPoint(tempMarker?.latitude, tempMarker?.longitude);

    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        return () => {
            dispatch(resetTempMarker());
        };
    }, []);

    const structureMarker = () => ({
        createdBy: userEmail,
        location,
        name,
        rating,
        tags,
    });

    const onSubmit = () => {
        dispatch(addMarkerRemote(structureMarker()));
        dispatch(getLocalMarkers());
        dispatch(clearModal());
    };

    return (
        <View>
            <HeadlineText>Add a water source</HeadlineText>
            <InfoTile>
                <View style={{ ...ELEMENT_GROUP_SPACING }}>
                    <View style={styles.infoSection}>
                        <Text variant="labelLarge">
                            Choose a descriptive name for the location
                        </Text>
                        <KeyboardAvoidingTextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={styles.infoSection}>
                        <Text variant="labelLarge">
                            What's the quality overall?
                        </Text>
                        <StarRating rating={rating} onPress={setRating} />
                    </View>
                    <View style={styles.infoSection}>
                        <Text variant="labelLarge">
                            Choose some relevant tags
                        </Text>
                        <TagChips selectedTags={tags} onPress={setTags} />
                    </View>
                </View>
            </InfoTile>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    disabled={!name}
                    onPress={onSubmit}
                    loading={loading}
                >
                    Add Marker
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
    infoSection: {
        marginBottom: SPACING_DEFAULT,
    },
    input: {
        marginBottom: 5,
    },
});

export default AddMarkerInfoModal;
