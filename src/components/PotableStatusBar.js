import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/app/appSlice";

const PotableStatusBar = () => {
  const theme = useSelector(selectTheme);
  const textStyle = theme === "dark" ? "light" : "dark";

  return <StatusBar style={textStyle} />;
};

export default PotableStatusBar;
