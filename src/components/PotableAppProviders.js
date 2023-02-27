import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import store from "../store";

const PotableAppProviders = ({ children }) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView>{children}</GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default PotableAppProviders;
