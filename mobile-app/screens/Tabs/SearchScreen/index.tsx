import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList, SearchScreenParamList } from '../../../types';
import { makeStyles, Text, ThemeConsumer } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon, Image } from '@rneui/base';
import InputWithButton from '../../../components/atoms/Input/WithButton/WithButton';
import RoundedOutline from '../../../components/atoms/Buttons/Rounded/RoundedOutline';
import _SearchScreen from './SearchScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';
import TopBar from '../../../navigation/TopBar/TopBar';
import BaseTopBar from '../../../navigation/TopBar/BaseTopBar';
import MapScreen from './MapScreen';

const SearchScreenStacks = createNativeStackNavigator<SearchScreenParamList>()

const SearchScreen = (props: NativeStackScreenProps<BottomTabParamList, 'SearchScreen'>) => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View style={{
            width: "100%",
            height: "100%",
        }} >
          <StatusBar backgroundColor={theme.colors.background} />
            <SearchScreenStacks.Navigator 
                initialRouteName="MapScreen"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.background, 
                    }
                }}
            >
                <SearchScreenStacks.Screen  options={{
                    headerShown: false
                }} name="SearchScreenHome" component={_SearchScreen} />
                <SearchScreenStacks.Screen name="BookingConfirmationScreen" options={{
                    header:(props) => <BaseTopBar onHomePress={()=>props.navigation.navigate("SearchScreenHome")} onBackPress={()=>props.navigation.navigate("SearchScreenHome")} home chevronLeft title={"Confirmation"} {...props} />
                }} component={BookingConfirmationScreen}  />
                <SearchScreenStacks.Screen 
                  name="MapScreen"
                  options={{
                    header: (props) => <BaseTopBar onHomePress={()=>props.navigation.navigate("SearchScreenHome")} onBackPress={()=>props.navigation.navigate("SearchScreenHome")} home chevronLeft title={
                      (props.route.params as any)?.searchType === "local" ? "Search Locally" : "Host: Jesse()"
                    } {...props} />
                  }}
                  component={MapScreen}
                />
            </SearchScreenStacks.Navigator>
        </View>
      )}
    </ThemeConsumer>
    
  );
};

export default SearchScreen;

