import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import store from "../store";

const PotableAppProviders = ({ children }) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <GestureHandlerRootView>{children}</GestureHandlerRootView>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default PotableAppProviders;
