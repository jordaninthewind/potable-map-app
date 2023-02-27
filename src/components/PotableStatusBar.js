import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/app/appSlice";

const PotableStatusBar = () => {
  const theme = useSelector(selectTheme);

  return <StatusBar style={theme === "dark" ? "light" : "dark"} />;
};

export default PotableStatusBar;
