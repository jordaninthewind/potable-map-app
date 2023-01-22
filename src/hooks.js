import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, login, logout, addUser, removeUser };
};

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
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
