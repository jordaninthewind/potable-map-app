import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import store from "@app/store";

const PotableAppProviders = ({ children }) => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider>
            <GestureHandlerRootView>{children}</GestureHandlerRootView>
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default PotableAppProviders;
