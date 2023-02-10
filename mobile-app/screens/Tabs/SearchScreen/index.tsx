import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, SearchScreenParamList } from '../../../types';
import { ThemeConsumer } from '@rneui/themed';
import { View } from 'react-native';
import SearchScreenHome from './SearchScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';
import BaseTopBar from '../../../navigation/TopBar/BaseTopBar';
import MapScreen from './MapScreen';
import Onboarding from './Onboarding';

const SearchScreenStacks = createNativeStackNavigator<SearchScreenParamList>();

const SearchScreen = (props: NativeStackScreenProps<BottomTabParamList, 'SearchScreen'>) => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <SearchScreenStacks.Navigator
            initialRouteName="OnboardingHome"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.background,
              },
            }}>
            <SearchScreenStacks.Screen
              options={{
                headerShown: false,
              }}
              name="SearchScreenHome"
              component={SearchScreenHome}
            />
            <SearchScreenStacks.Screen
              options={{
                headerShown: false,
              }}
              name="OnboardingHome"
              component={Onboarding}
            />
            <SearchScreenStacks.Screen
              name="BookingConfirmationScreen"
              options={{
                header: props => (
                  <BaseTopBar
                    onHomePress={() => props.navigation.navigate('SearchScreenHome')}
                    onBackPress={() => props.navigation.navigate('SearchScreenHome')}
                    home={false}
                    title={'Confirmation'}
                    {...props}
                  />
                ),
              }}
              component={BookingConfirmationScreen}
            />
            <SearchScreenStacks.Screen
              name="MapScreen"
              options={{
                header: props => (
                  <BaseTopBar
                    onHomePress={() => props.navigation.navigate('SearchScreenHome')}
                    onBackPress={() => props.navigation.navigate('SearchScreenHome')}
                    home
                    chevronLeft
                    title={
                      (props.route.params as any)?.searchType === 'local'
                        ? 'Search Locally'
                        : 'Host: Jesse()'
                    }
                    {...props}
                  />
                ),
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
