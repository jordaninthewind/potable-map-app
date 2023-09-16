import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

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

    const selectedMarker = useSelector(selectSelectedMarker);
    const auth = useSelector(selectAuthState);

    const editMarker = () => dispatch(setModal('editMarker'));

    const goBack = () => dispatch(setModal('markerInfo'));

    return (
        <View>
            <HeadlineText>{selectedMarker?.name}</HeadlineText>
            <InfoTile
                style={{ padding: 16, backgroundColor: 'rgba(0,0,0,.05)' }}
            >
                <InfoText>🌎 Latitude: {selectedMarker.latitude}</InfoText>
                <InfoText>🌍 Longitude: {selectedMarker.longitude}</InfoText>
                <InfoText>⭐️ Rating: {selectedMarker.rating}</InfoText>
                <InfoText>✨ Your rating: 3</InfoText>
                <InfoText>💧 Taste: "Delicious"</InfoText>
                <InfoText>🧑‍💻 Link</InfoText>
                <InfoText>📍 Distance</InfoText>
                <InfoText>✅ Verified: 2/26/2023</InfoText>
                <InfoText>📝 Notes: N/A</InfoText>
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
