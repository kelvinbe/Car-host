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
import ToastContainer from './components/organisms/Feedback/ToastContainer/ToastContainer';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,

} from '@expo-google-fonts/lato';
import Loading from './components/molecules/Feedback/Loading/Loading';

 function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic
  });
  
  if (!isLoadingComplete) {
    return (
      <ThemeProvider theme={theme} >
        <Loading/>
      </ThemeProvider>
    )
  } else if (!fontsLoaded) {
    return (
      <ThemeProvider theme={theme} >
        <Loading/>
      </ThemeProvider>
    )
  } else{
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme} >
          <SafeAreaProvider>
          {/* <StatusBar backgroundColor={theme.lightColors?.white} style="dark" /> */}
            {/* <SafeAreaView style={{width: "100%", height: "100%"}}> */}
              <Navigation colorScheme={colorScheme} />
              
            {/* </SafeAreaView> */}
            <ToastContainer/>
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default gestureHandlerRootHOC(App);
