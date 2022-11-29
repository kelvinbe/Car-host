import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList, SearchScreenParamList } from '../../../types';
import { makeStyles, Text, ThemeConsumer } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon, Image } from '@rneui/base';
import InputWithButton from '../../../components/atoms/Input/WithButton/WithButton';
import RoundedOutline from '../../../components/atoms/Buttons/Rounded/RoundedOutline';


const useStyles = makeStyles((theme, props) => ({
    container: {
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        height: "100%",
        padding: 0,
    },
    topContentContainerStyle: {
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 30
    },
    logoImage: {
      width: 78,
      height: 20,
      marginBottom: 20
    },
    heading: {
        color: theme.colors.title,
        fontSize: 24,
        lineHeight: 24,
        textAlign: "center",
        fontWeight: "700",
        width: "100%",
        marginBottom: 10
    },
    subHeading: {
      color: theme.colors.title,
      fontSize: 20,
      lineHeight: 20,
      textAlign: "center",
      fontWeight: "500",
      width: "100%"
    },
    bottomContentContainerStyle: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        height: "100%",	
    },
    hostDetailsContainer: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    helperTextContainer: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginTop: 5,
      flexDirection: "row",
    },
    helperText: {
      color: theme.colors.grey3,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "400"
    },
    helperTextIcon: {
      color: theme.colors.grey3,
      fontSize: 12,
      marginRight: 5
    },
    orText: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.primary,
      marginVertical: 20,
      textAlign: "center"	
    },
    screenContainerStyles: {
      width: "100%",
      height: "100%",
    }
}))

const _SearchScreen = (props: NativeStackScreenProps<SearchScreenParamList, "SearchScreenHome">) => {
  const styles = useStyles();
  const maxWidth = useWindowDimensions().width;

  const hostCodeSearch = (value: any) =>{
    props.navigation.navigate("MapScreen", {
      searchType: "host",
      hostCode: value
    })
  }
  const searchLocally = () => {
    props.navigation.navigate("MapScreen", {
      searchType: "local"
    })
  }
  
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          <StatusBar backgroundColor={theme.colors.background} />
          <View style={styles.container} >
            <ImageBackground source={require('../../../assets/images/background-home.png')} style={[{ width: maxWidth, height: 356 }, styles.topContentContainerStyle]} resizeMode="cover" >
                  <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
                  <Text style={styles.heading}>Airbnb Host Car Sharing</Text>
                  <Text style={styles.subHeading}>Rent a car hourly with fuel included</Text>
            </ImageBackground>
            <View style={styles.bottomContentContainerStyle} >
              <View style={styles.hostDetailsContainer} >
                <InputWithButton onPress={hostCodeSearch}  placeholder='e.g 124589' label="Enter Host Code"  />
                <View style={styles.helperTextContainer} >
                    <Icon style={styles.helperTextIcon} name="info" type="material" color={theme.colors.grey3} />
                    <Text style={styles.helperText} >
                      Provided by your Airbnb host
                    </Text>
                </View>
              </View>
              <Text style={styles.orText}  >
                Or
              </Text>
              <RoundedOutline onPress={searchLocally} >
                Search Locally
              </RoundedOutline>
              
            </View>
          </View>
          </>
      )}
    </ThemeConsumer>
    
  );
};

export default _SearchScreen;

