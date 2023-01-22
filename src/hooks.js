import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStateContext } from "./contexts";

export const useAsyncStorage = () => {
  const [value, setValue] = useState(null);

  const setItem = async (key, value) => {
    await AsyncStorage.setItem(key, value);
    setValue(value);
  };

  const getItem = async (key) => {
    const value = await AsyncStorage.getItem(key);
    setValue(value);

    return value;
  };

  const removeItem = async (key) => {
    await AsyncStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};

export const useUser = () => {
  const { user, setUser } = useContext(AppStateContext);
  const { setItem } = useAsyncStorage();

  const addUser = (user) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useAsyncStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(user);
    }
  }, []);

  const login = (user) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
