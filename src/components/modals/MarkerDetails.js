import moment from 'moment';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import InfoText from '@components/common/InfoText';
import InfoTile from '@components/common/InfoTile';
import HeadlineText from '@components/common/HeadlineText';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import {
    BASE_BUTTON,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';

const MarkerDetails = () => {
    const dispatch = useDispatch();

    const auth = useSelector(selectAuthState);
    const marker = useSelector(selectSelectedMarker);
    const { name, latitude, longitude, rating, createdAt } = marker;

    const formattedDate = moment(createdAt).format('MMM Do YYYY, h:mm:ss a');

    const editMarker = () => dispatch(setModal('editMarker'));

    const goBack = () => dispatch(setModal('markerInfo'));

    return (
        <View>
            <HeadlineText>{name}</HeadlineText>
            <InfoTile
                style={{ padding: 16, backgroundColor: 'rgba(0,0,0,.05)' }}
            >
                <InfoText>🌎 Latitude: {latitude}</InfoText>
                <InfoText>🌍 Longitude: {longitude}</InfoText>
                <InfoText>⭐️ Rating: {rating || 'N/A'}</InfoText>
                <InfoText>✨ Your rating: </InfoText>
                <InfoText>💧 Taste: </InfoText>
                <InfoText>🧑‍💻 Link</InfoText>
                <InfoText>📍 Distance: </InfoText>
                <InfoText>✅ Verified: {formattedDate}</InfoText>
            </InfoTile>
            <View style={styles.buttonContainer}>
                <Button onPress={goBack} mode="contained">
                    Go back
                </Button>
                {auth && (
                    <Button onPress={editMarker} mode="contained">
                        Update Marker Info
                    </Button>
                )}
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

export default MarkerDetails;
