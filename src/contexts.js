import { createContext } from "react";

export const AppStateContext = createContext({
  user: null,
  location: null,
  // setUser: () => {},
  // setLocation: () => {},
  // loading: false,
  // setLoading: () => {},
  // error: null,
  // setError: () => {},
  // markers: [],
  // setMarkers: () => {},
  // modalIsVisible: false,
  // setModalIsVisible: () => {},
});
