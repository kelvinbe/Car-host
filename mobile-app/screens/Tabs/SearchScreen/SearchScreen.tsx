import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchScreenParamList } from '../../../types';
import { makeStyles, Text, ThemeConsumer } from '@rneui/themed';
import { auth } from '../../../firebase/firebaseApp';
import { ImageBackground, useWindowDimensions, View } from 'react-native';
import { Icon, Image } from '@rneui/base';
import InputWithButton from '../../../components/atoms/Input/WithButton/WithButton';
import RoundedOutline from '../../../components/atoms/Buttons/Rounded/RoundedOutline';
import { LinearGradient } from 'expo-linear-gradient';
import useToast from '../../../hooks/useToast';
import useVehicleData, {VehicleData} from '../../../hooks/useVehicleData';


const useStyles = makeStyles((theme, props) => ({
  container: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  topContentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 30,
    overflow: 'hidden',
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  heading: {
    color: theme.colors.white,
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Lato_700Bold',
    width: '100%',
    marginBottom: 10,
  },
  subHeading: {
    color: theme.colors.white,
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
    width: '100%',
  },
  bottomContentContainerStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: '100%',
  },
  hostDetailsContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  helperTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    flexDirection: 'row',
  },
  helperText: {
    color: theme.colors.grey3,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Lato_400Regular',
  },
  helperTextIcon: {
    color: theme.colors.grey3,
    fontSize: 12,
    marginRight: 5,
  },
  orText: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Lato_400Regular',
    color: theme.colors.primary,
    marginVertical: 20,
    textAlign: 'center',
  },
  screenContainerStyles: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
}));

const SearchScreenHome = (
  props: VehicleData & NativeStackScreenProps<SearchScreenParamList, 'SearchScreenHome'>
) => {
  const styles = useStyles();
  const maxWidth = useWindowDimensions().width;
  const {fetchVehicleData} = useVehicleData()


  const hostCodeSearch = (value: any) => {

    fetchVehicleData(value)

    const GoToMapScreenHost = props.navigation.navigate('MapScreen', {
      searchType: 'host',
      hostCode: value,
    });
    return GoToMapScreenHost;
  };
  const searchLocally = (marketId: any) => {

    fetchVehicleData(marketId)
    const GoToMapScreenLocal = props.navigation.navigate('MapScreen', {
      searchType: 'local',
    });
    return GoToMapScreenLocal;
  };

  //Sign out example
  const signOut = async () => {
    auth.signOut();
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          <View style={styles.container}>
            <ImageBackground
              source={require('../../../assets/images/background-home.png')}
              style={[styles.topContentContainerStyle, { width: maxWidth, height: 356 }]}
              resizeMode="cover">
              <LinearGradient
                style={[
                  styles.gradient,
                  {
                    width: maxWidth,
                    height: 356,
                  },
                ]}
                start={{
                  x: 0.5,
                  y: 0,
                }}
                end={{
                  x: 0.5,
                  y: 1,
                }}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 1)']}
                locations={[0, 0.6927, 1]}
              />
              <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
              <Text style={styles.heading}>Airbnb Host Car Sharing</Text>
              <Text style={styles.subHeading}>Rent a car hourly with fuel included</Text>
            </ImageBackground>
            <View style={styles.bottomContentContainerStyle}>
              <View style={styles.hostDetailsContainer}>
                <InputWithButton
                  onPress={hostCodeSearch}
                  placeholder="e.g 124589"
                  label="Enter Host Code"
                />
                <View style={styles.helperTextContainer}>
                  <Icon
                    style={styles.helperTextIcon}
                    name="info"
                    type="feather"
                    size={16}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.helperText}>Provided by your Airbnb host</Text>
                </View>
              </View>
              <Text style={styles.orText}>Or</Text>
              <RoundedOutline fullWidth onPress={searchLocally}>
                Search Locally
              </RoundedOutline>
            </View>
          </View>
        </>
      )}
    </ThemeConsumer>
  );
};

export default SearchScreenHome;
