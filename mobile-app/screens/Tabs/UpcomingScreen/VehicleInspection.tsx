import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';
import RoundedOutline from '../../../components/atoms/Buttons/Rounded/RoundedOutline';
import { makeStyles } from '@rneui/themed';
import { UpcomingParamList } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseInput from '../../../components/atoms/Input/BaseInput/BaseInput';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';

type Props = NativeStackScreenProps<UpcomingParamList, 'VehicleInspection'>;

const useStyles = makeStyles(theme => {
  return {
    container: {
      position: 'absolute',
      top: 120,
      width: '100%',
      paddingVertical: 10,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    divider: {
      marginVertical: 20,
      backgroundColor: theme.colors.stroke,
    },
    bottomSection: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };
});

const InputField = () => {
  const [image, setImage] = useState('');

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
    <View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}></TouchableOpacity>
          <Text>No</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#E63B2E',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <TouchableOpacity
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#E63B2E',
              }}></TouchableOpacity>
          </TouchableOpacity>
          <Text>Yes</Text>
        </View>
        <View
          style={{
            width: 60,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={PickImage}>
            <MaterialCommunityIcons name="image-plus" size={26} color="#ADB5BD" />
          </TouchableOpacity>
          <MaterialCommunityIcons name="camera" size={26} color="#ADB5BD" />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        {image !== '' ? (
          <Image source={{ uri: image }} style={{ width: 80, height: 60 }} />
        ) : (
          <BaseInput placeholder="Detail(option)" />
        )}
      </View>
    </View>
  );
};
const VehicleInspection = (props: Props) => {
  const [range, setRange] = useState(0);

  const navigation = useNavigation();
  const styles = useStyles(props);
  let current = true;

  const goToReservationScreen = () => {
    navigation.navigate('ReservationDetails', {
      current: current,
    });
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>
            Is available and present at location?
          </Text>
          <InputField />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>
            Any vehicle damage?
          </Text>
          <InputField />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>
            Is vehicle clean?
          </Text>
          <InputField />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>
            How much gas in vehicle?
          </Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            onValueChange={value => setRange(value)}
            maximumValue={65}
            thumbTintColor="#E63B2E"
            minimumTrackTintColor="#E63B2E"
          />
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
            {Math.floor(range)} litres
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.bottomSection,
          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
        ]}>
        <Rounded width="40%" onPress={goToReservationScreen}>
          Start
        </Rounded>
        <RoundedOutline width="40%" onPress={() => props.navigation.navigate('ReservationDetails')}>
          Cancel
        </RoundedOutline>
      </View>
    </View>
  );
};

export default VehicleInspection;
