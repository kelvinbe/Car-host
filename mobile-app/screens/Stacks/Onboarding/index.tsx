import { Text, View } from 'react-native'
import React, { useEffect} from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserOnboardingParamList } from '../../../types';
import { Image, makeStyles, ThemeConsumer } from '@rneui/themed';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';
import AccordionButton from '../../../components/atoms/Buttons/AccordionButton/AccordionButton';
import useOnBoarding from '../../../hooks/useOnBoarding';


const useStyles = makeStyles((theme) => {
  return ({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justyifyContent: "space-between",
      paddingHorizontal: 20
    },
    contentContainer: {
      flex: 1,
      width: "100%",
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    bottomTextContainer: {
      width: '100%',
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Lato_400Regular',
      textAlign: 'center',
      letterSpacing: 0.1,
    },
    title: {
      color: theme.colors.title,
      fontSize: 22,
      fontWeight: '700',
      fontFamily: 'Lato_700Bold',
      marginBottom: 10,
    },
    logoContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    cardContainer: {
      width: '100%',
      height: 80,
      shadowColor: '#ddd',
      shadowOpacity: 0.3,
      shadowOffset: {
        width: -2,
        height: 4,
      },
      elevation: 5,
      marginVertical: 5,
      marginTop: 25,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    buttonContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-end",
    }
  })
})

interface IProps {
  goToApp: () => void;
  goToLogin: () => void;
}


type Props = NativeStackScreenProps<UserOnboardingParamList, "OnboardingHome"> & IProps;

const Onboarding = (props: Props) => {
  const styles = useStyles(props)
  const { navigation, route, goToApp } = props;

  const { completed } = useOnBoarding()

  const handleDriversLicense = () => {
    navigation.push("DriversLicense")
  }

  const handlePaymentMethod = () => {
    navigation.push("SelectPaymentMethod", {
      payment_method_added: false
    })
  }

  const handleLocation = () => {
    navigation.push("Location")
  }

  const onDone = () => {
    goToApp()
  }


  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={{
                  height: 100,
                  width: 100,
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Almost There</Text>
            <Text style={styles.bottomTextContainer}>
              You need to upload your Driver's license and set a payment method to make reservations
            </Text>
            <AccordionButton
              icon={<FontAwesome name="drivers-license-o" size={20} color={theme.colors.grey1} />}
              onPress={handleDriversLicense}
              title="Driver's License"
              customStyles={{
                // @todo add shadow support
              }}
              customAccordionIcon={
                !completed?.drivers_license ? <Entypo name="chevron-right" size={24} color={theme.colors.grey1} /> :
                  <AntDesign
                    name="checkcircle"
                    size={24}
                    color={theme.colors.success}
                  />
              }
            />
            <AccordionButton
              icon={<Feather name="credit-card" size={24} color={theme.colors.grey1} />}
              onPress={handlePaymentMethod}
              title="Payment Method"
              customStyles={{
                // @todo add shadow support
              }}
              customAccordionIcon={
                !completed?.payment_method ? <Entypo name="chevron-right" size={24} color={theme.colors.grey1} /> :
                  <AntDesign
                    name="checkcircle"
                    size={24}
                    color={theme.colors.success}
                  />
              }
            />
            <AccordionButton
              icon={<Entypo name="location-pin" size={24} color={theme.colors.grey1} />}
              onPress={handleLocation}
              title="Location"
              customStyles={{
                // @todo add shadow support
              }}
              customAccordionIcon={
                !completed?.location ? <Entypo name="chevron-right" size={24} color={theme.colors.grey1} /> :
                  <AntDesign
                    name="checkcircle"
                    size={24}
                    color={theme.colors.success}
                  />
              }
            />
          </View>
          <View style={styles.buttonContainer} >
            <Rounded
              fullWidth
              disabled={!completed?.drivers_license || !completed?.payment_method || !completed?.location}
              onPress={onDone}
            >
              Done
            </Rounded>
          </View>
        </View>
      )}
    </ThemeConsumer>

  )
}

/**
 * Memoize component to prevent unnecessary re-renders
 */
export default React.memo(Onboarding)
