import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import { SearchScreenParamList } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';
import { makeStyles } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import useDriversLicense, { driversLicense } from '../../../hooks/useDriversLicense';
import useToast from '../../../hooks/useToast';
import { useSelector } from 'react-redux';
import { selectPaymentCardAdded } from '../../../store/slices/addCardSlice';

type Props = driversLicense & NativeStackScreenProps<SearchScreenParamList, 'OnboardingHome'>
const useStyles = makeStyles(theme => {
  return {
    container: {
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      paddingHorizontal: 20,
    },
    contentContainer: {
      width: '100%',
      height: '60%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomTextContainer: {
      width: '100%',
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Lato_400Regular',
      textAlign: 'center',
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderRadius: 10,
    },
  };
});
function Onboarding(props: Props) {
  const styles = useStyles(props);
  const [image, setImage] = useState('');
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);
  const [hasSelectedMethod, setHasSelectedMethod] = useState(false);
  const {data, error, setDriversLicense} = useDriversLicense(props)
  const hasAddedCard_ = useSelector(selectPaymentCardAdded)

  const toast = useToast()

  const openPaymentSheet = () => {
    setIsPaymentSheetOpen(true);
  };
  const closePaymentSheet = () => {
    setHasSelectedMethod(true);
    setIsPaymentSheetOpen(false);
  };
  const getPermisssion = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
      }
    }
  };
  useEffect(() => {
    getPermisssion();
  }, []);


  const storeDriversLicense = () => {
    setDriversLicense()

      if(data?.status === 'success'){
        toast({
          type: "success",
          message: "Drivers License Added Successfuly.",
          title: "Success",
          duration: 3000,
        })
      }else if(error){
        toast({
          type: "error",
          message: 'Something went wrong',
          title: "Error",
          duration: 3000,
      })
      }
  }

  const goToAddCardScreen = () => {
    props.navigation.navigate('AddCardScreen');
  };

  const PickImage = async () => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!(await result).canceled) {
      setImage((await result)?.assets[0]?.uri);
    }

    storeDriversLicense()

  };
  return (
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
        <View style={styles.cardContainer}>
          <View
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FontAwesome name="drivers-license-o" size={28} color="#ADB5BD" />
            <Text style={{ marginLeft: 25 }}>Driver's license</Text>
          </View>
          <TouchableOpacity onPress={PickImage}>
            {image === '' ? (
              <View>
                <Entypo name="chevron-small-right" size={28} color="#ADB5BD" />
              </View>
            ) : (
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 20,
                  backgroundColor: 'green',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="check" color="#fff" size={18} />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <View
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FontAwesome name="drivers-license-o" size={28} color="#ADB5BD" />
            <Text style={{ marginLeft: 25 }}>Payment method</Text>
          </View>
          <View>
            {!hasAddedCard_ ? (
              <TouchableOpacity onPress={goToAddCardScreen}>
                <Entypo name="chevron-small-right" size={28} color="#ADB5BD" />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 20,
                  backgroundColor: 'green',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="check" color="#fff" size={18} />
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Rounded
          fullWidth
          onPress={() => props.navigation.navigate('SearchScreenHome')}
          disabled={hasAddedCard_ && image !== '' ? false : true}>
          Get Started
        </Rounded>
      </View>
    </View>
  );
}

export default Onboarding;
