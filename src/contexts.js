import { createContext } from "react";

export const AppStateContext = createContext({
  user: null,
  setUser: () => {},
  location: null,
  setLocation: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  markers: [],
  setMarkers: () => {},
  modalIsVisible: false,
  setModalIsVisible: () => {},
});
