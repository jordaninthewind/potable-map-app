import { useEffect, useRef } from 'react';
import { StyleSheet, Vibration, useColorScheme } from 'react-native';
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { PotableMarker } from '@components/PotableMarker';
import {
    selectMarkers,
    setTempMarker,
    selectLocation,
    selectSelectedMarker,
    selectTempMarker,
    resetSelectedMarker,
} from '@state/markersSlice';
import { setModal, selectModal } from '@state/modalSlice';
import { getLocalMarkers } from '@services/services';
import { animateToLocation } from '@utils/mapUtils';

const PotableMap = () => {
    const mapRef = useRef(null);

    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

    const markers = useSelector(selectMarkers);
    const currentLocation = useSelector(selectLocation);
    const selectedMarker = useSelector(selectSelectedMarker);
    const tempMarker = useSelector(selectTempMarker);
    const view = useSelector(selectModal);

    const location = selectedMarker || tempMarker || currentLocation;

    useEffect(() => {
        animateToLocation({
            location,
            mapRef,
            view,
        });
    }, [location, view, selectedMarker, tempMarker, currentLocation]);

    const openAddMarkerScreen = ({ coordinate }) => {
        Vibration.vibrate();

        dispatch(resetSelectedMarker());
        dispatch(setTempMarker(coordinate));
        dispatch(setModal('addMarkerLocation'));
    };

    useEffect(() => {
        dispatch(getLocalMarkers());
    }, []);

    // const updateMarkerLocation = ({ nativeEvent, marker }) => {
    //     console.log('updateMarkerLocation', nativeEvent);
    // };

    const onMove = ({ nativeEvent }) => {
        // Maybe set the location in state here?
        console.log('onMove', nativeEvent);
    };

    const handleMapPress = async () => {
        // if (selectedMarker) {
        //     await dispatch(clearModal());
        //     dispatch(resetSelectedMarker());
        // }
        // if (tempMarker) {
        //     await dispatch(clearModal());
        //     dispatch(setTempMarker());
        // }
    };

    return (
        <MapView
            ref={mapRef}
            onLongPress={(e) => openAddMarkerScreen(e.nativeEvent)}
            onRegionChangeComplete={onMove}
            userInterfaceStyle={colorScheme}
            region={location}
            showsPointsOfInterest={false}
            showsUserLocation={true}
            style={styles.map}
            onPress={handleMapPress}
        >
            {!tempMarker &&
                markers?.map((marker, index) => {
                    return (
                        <PotableMarker
                            key={index}
                            marker={marker}
                            selectedId={selectedMarker?.id}
                        />
                    );
                })}
            {tempMarker && <PotableMarker marker={tempMarker} type={'temp'} />}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: '100%',
    },
});

export default PotableMap;
