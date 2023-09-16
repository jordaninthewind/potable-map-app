import { SPEED_FAST, SPEED_SLOW } from '@constants/constants';

const getZoomInfo = (view) => {
    switch (view) {
        case 'markerInfo':
            return {
                zoom: {
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.06,
                },
                changeInLatitude: -0.02,
                speed: SPEED_FAST,
            };
        case 'markerDetails':
            return {
                zoom: {
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                changeInLatitude: -0.0025,
                speed: SPEED_FAST,
            };
        case 'editMarker':
            return {
                zoom: {
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                changeInLatitude: -0.0025,
                speed: SPEED_FAST,
            };
        default:
            return {
                zoom: {
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                },
                changeInLatitude: 0,
                speed: SPEED_SLOW,
            };
    }
};

export const animateToLocation = ({ mapRef, location, view }) => {
    const viewValues = getZoomInfo(view);

    mapRef.current.animateToRegion(
        {
            latitude: location.latitude + viewValues.changeInLatitude,
            longitude: location.longitude,
            ...viewValues.zoom,
        },
        viewValues.speed
    );
};
