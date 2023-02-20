import { GeoPoint } from "firebase/firestore";

export const firebaseAdapter = ({ type }) => {
  switch (type) {
    case "location-geopoint":
      return {
        toFirestore: ({ latitude, longitude }) => {
          const location = new GeoPoint({ latitude, longitude });

          return location;
        },
        fromFirestore: (snapshot) => {
          const { longitude, latitude } = snapshot.data();
          return {
            latitude,
            longitude,
          };
        },
      };
    case "location-timestamp":
      return {
        toFirestore: ({ timestamp }) => {
          return timestamp;
        },
        fromFirestore: (snapshot) => {
          const { timestamp } = snapshot.data();
          return {
            timestamp,
          };
        },
      };
    default:
      return null;
  }
};

export const shortenString = (value, length) => {
  if (value.length > length) {
    return value.substring(0, length);
  }

  return value;
};
