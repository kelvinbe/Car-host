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
import PaymentBottomSheet from '../../../components/organisms/MapScreenBottomSheet/BottomSheetScreens/PaymentBottomSheet';

type Props = NativeStackScreenProps<SearchScreenParamList, 'OnboardingHome'>;
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
  });

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
            {!hasSelectedMethod ? (
              <TouchableOpacity onPress={openPaymentSheet}>
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
          disabled={hasSelectedMethod && image !== '' ? false : true}>
          Get Started
        </Rounded>
      </View>
      {isPaymentSheetOpen && (
        <PaymentBottomSheet closeBottomSheet={closePaymentSheet} hasSelected={hasSelectedMethod} />
      )}
    </View>
  );
}

export default Onboarding;
