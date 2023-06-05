import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList, SearchScreenParamList } from '../../../types';
import { ThemeConsumer } from '@rneui/themed';
import { View } from 'react-native';
import SearchScreenHome from './SearchScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';
import BaseTopBar from '../../../navigation/TopBar/BaseTopBar';
import MapScreen from './MapScreen';
import AddCard from '../ProfileScreen/PaymentDetailsScreen/AddCard';
import { isNull } from 'lodash';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseApp';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOnboarding } from '../../../store/slices/onBoardingSlice';
import { fetchUserData } from '../../../store/slices/userSlice';
import { selectChosenHostCode } from '../../../store/slices/bookingSlice';
const SearchScreenStacks = createNativeStackNavigator<SearchScreenParamList>();



const SearchScreen = (props: NativeStackScreenProps<BottomTabParamList, 'SearchScreen'>) => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const host_code = useAppSelector(selectChosenHostCode)

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <SearchScreenStacks.Navigator
            initialRouteName="SearchScreenHome"
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
                        : `${host_code}'s Vehicles`
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
