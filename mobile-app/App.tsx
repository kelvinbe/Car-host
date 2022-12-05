import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@rneui/themed";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store from './store/store';
import { theme } from './utils/theme';
import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

 function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme} >
          <SafeAreaProvider>
            {/* <SafeAreaView style={{width: "100%", height: "100%"}}> */}
              <Navigation colorScheme={colorScheme} />
              <StatusBar backgroundColor={theme.lightColors?.white} />
            {/* </SafeAreaView> */}
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default gestureHandlerRootHOC(App);
