import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { selectTheme, setTheme } from "../features/app/appSlice";
import { setError } from "../features/error/errorSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const dispatch = useDispatch();
  const colorTheme = useSelector(selectTheme);
  const { top } = useSafeAreaInsets();
  const isDarkMode = colorTheme === "dark";

  const toggleColorScheme = async () => {
    const themeColor = isDarkMode ? "light" : "dark";
    await AsyncStorage.setItem("theme", themeColor);
    await dispatch(setTheme(themeColor));

    dispatch(
      setError({
        message: isDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      })
    );
  };

  return (
    <View
      style={[
        styles.container,
        styles[colorTheme].background,
        { paddingTop: top },
      ]}
    >
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles[colorTheme].text}>
          Settings
        </Text>
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.option}>
          <Text variant="headlineSmall" style={styles[colorTheme].text}>
            Enable {isDarkMode ? "light" : "dark"} mode
          </Text>
          <Switch value={colorTheme === "dark"} onChange={toggleColorScheme} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  optionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  option: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dark: {
    background: {
      backgroundColor: "rgb(50,50,50)",
    },
    text: {
      color: "rgb(250,250,250)",
    },
  },
  light: {
    background: {
      backgroundColor: "rgb(250,250,250)",
    },
    text: {
      color: "rgb(50,50,50)",
    },
  },
});

export default Settings;
