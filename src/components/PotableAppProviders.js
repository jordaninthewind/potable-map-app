import { Provider } from 'react-redux';
import {
    Provider as PaperProvider,
    MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import store from '@app/store';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#1E88E5',
        accent: '#1E88E5',
    },
};

const PotableAppProviders = ({ children }) => {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Provider store={store}>
                    <PaperProvider theme={theme}>
                        <GestureHandlerRootView>
                            {children}
                        </GestureHandlerRootView>
                    </PaperProvider>
                </Provider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default PotableAppProviders;
