export const shortenString = (value, length) => {
    if (value.length > length) {
        return value.substring(0, length);
    }

    return value;
};

export const getDistance = (startLocation, endLocation) => {
    const { latitude: lat1, longitude: lon1 } = startLocation;
    const { latitude: lat2, longitude: lon2 } = endLocation;
    const radius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = radius * c; // Distance in km
    return d;
};

export const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const getDistanceFromLatLonInKm = (startLocation, endLocation) => {
    const { latitude: lat1, longitude: lon1 } = startLocation;
    const { latitude: lat2, longitude: lon2 } = endLocation;

    const radius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c; // Distance in km

    return distance;
};

export const centerMarkerInScreen = (latitude) => (latitude -= 0.0005);
