import { useEffect, useRef } from 'react';
import { StyleSheet, Vibration, useColorScheme } from 'react-native';
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { centerMarkerInScreen } from '@app/helpers';
import { PotableMarker } from '@components/PotableMarker';
import {
    selectMarkers,
    setTempMarker,
    selectLocation,
    selectSelectedMarker,
    selectTempMarker,
    resetSelectedMarker,
    resetTempMarker,
} from '@state/markersSlice';
import { clearModal, setModal } from '@state/modalSlice';
import { getLocalMarkers } from '@services/services';

const PotableMap = () => {
    const mapRef = useRef(null);

    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

    const markers = useSelector(selectMarkers);
    const location = useSelector(selectLocation);
    const selectedMarker = useSelector(selectSelectedMarker);
    const tempMarker = useSelector(selectTempMarker);

    useEffect(() => {
        if (selectedMarker) {
            mapRef.current.animateToRegion(
                {
                    latitude: centerMarkerInScreen({
                        latitude: selectedMarker.latitude,
                        zoom: true,
                    }),
                    longitude: selectedMarker.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                },
                750
            );
        } else if (tempMarker) {
            mapRef.current.animateToRegion(
                {
                    latitude: centerMarkerInScreen({
                        latitude: tempMarker.latitude,
                        zoom: false,
                    }),
                    longitude: tempMarker.longitude,
                    // latitudeDelta: 0.001,
                    // longitudeDelta: 0.001,
                },
                1000
            );
        } else {
            mapRef.current.animateToRegion(location, 750);
        }
    }, [selectedMarker, tempMarker, location]);

    const openAddMarkerScreen = ({ nativeEvent }) => {
        Vibration.vibrate();

        dispatch(resetSelectedMarker());
        dispatch(setTempMarker(nativeEvent.coordinate));
        dispatch(setModal('addMarker'));
    };

    useEffect(() => {
        dispatch(getLocalMarkers());
    }, []);

    // const updateMarkerLocation = ({ nativeEvent, marker }) => {
    //     console.log('updateMarkerLocation', nativeEvent);
    // };

    const onMove = () => {
        console.log('onMove');
    };

    const handleMapPress = async () => {
        if (selectedMarker) {
            await dispatch(clearModal());
            dispatch(resetSelectedMarker());
        }

        if (tempMarker) {
            await dispatch(clearModal());
            dispatch(resetTempMarker());
        }
    };

    return (
        <MapView
            ref={mapRef}
            onLongPress={openAddMarkerScreen}
            onRegionChangeComplete={onMove}
            userInterfaceStyle={colorScheme}
            region={location}
            showsPointsOfInterest={false}
            showsUserLocation={true}
            style={styles.map}
            onPress={handleMapPress}
        >
            {markers?.map((marker, index) => {
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
        zIndex: -1,
    },
});

export default PotableMap;
