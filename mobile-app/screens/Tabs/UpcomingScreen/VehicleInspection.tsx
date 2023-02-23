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
import useVehicleInspection from '../../../hooks/useVehicleInspection';
import useToast from '../../../hooks/useToast';
import { vehicleInspection } from '../../../types';

type Props =  vehicleInspection & NativeStackScreenProps<UpcomingParamList, 'VehicleInspection'> 

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

const InputField = ({
  vehicleAvailability,
  vehicleCleanliness,
  vehicleDamage,
  setvehicleDamagePictures,
  vehicleDamagePictures,
  setvehicleAvailability,
  setvehicleCleanliness,
  setvehicleDamage,
  setvehicleAvailabilityPictures,
  setvehicleCleanlinessPictures,
  setvehicleAvailabiltyDetails,
  vehicleDamageDetails,
  setvehicleDamageDetails,
  vehicleAvailabiltyDetails,
  vehicleCleanlinessPictures,
  vehicleAvailabilityPictures,
  setvehicleCleanlinessDetails,
  vehicleCleanlinessDetails

}: vehicleInspection & any) => {
  const [changeColor, setChangeColor] = useState(false);
  const [color, setColor] = useState('#E63B2')
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

  const handleOnPressNo = (stateSettingFunctions: any[]) => {
    stateSettingFunctions.forEach((setState) => {
        setState?.(false)
    })
    setChangeColor(true);
  };


  const handleOnPressYes = (stateSettingFunctions: any[]) => {
    stateSettingFunctions.forEach((setState) => {
      setState?.(true)
  })
    setChangeColor(false);
  };

  const PickImage = async () => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!(await result).canceled) {
      if(setvehicleAvailabilityPictures){
        setvehicleAvailabilityPictures((await result)?.assets[0]?.uri);
      }else if(setvehicleDamagePictures){
        setvehicleDamagePictures((await result)?.assets[0]?.uri)
      }else if(setvehicleCleanlinessPictures){
        setvehicleCleanlinessPictures((await result)?.assets[0]?.uri)
      }
    }
      };


      let imageUrl = null
      if(vehicleAvailabilityPictures){
        imageUrl = vehicleAvailabilityPictures
      }else if(vehicleDamagePictures){
        imageUrl = vehicleDamagePictures
      }else if(vehicleCleanlinessPictures){
        imageUrl = vehicleCleanlinessPictures
      }

      let value = ''
      if(vehicleAvailabiltyDetails){
        value = vehicleAvailabiltyDetails
      }else if(vehicleDamageDetails){
        value = vehicleDamageDetails
      }else if(vehicleCleanlinessDetails){
        value = vehicleCleanlinessDetails
      }


      let changeText = null
      if(setvehicleAvailabiltyDetails){
          changeText=setvehicleAvailabiltyDetails
      }else if(setvehicleDamageDetails){
          changeText=setvehicleDamageDetails
      }else if(setvehicleCleanlinessDetails){
          changeText=setvehicleCleanlinessDetails
      }
  

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
            onPress={()  => handleOnPressNo([setvehicleAvailability,setvehicleDamage, setvehicleCleanliness])}
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: changeColor ? '#E63B2E' : '#000',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            {changeColor && (
              <TouchableOpacity
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#E63B2E',
                }}></TouchableOpacity>
            )}
          </TouchableOpacity>
          <Text>No</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => handleOnPressYes([setvehicleAvailability,setvehicleDamage, setvehicleCleanliness])}
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: !changeColor ? '#E63B2E':'#000',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            {!changeColor && (
              <TouchableOpacity
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#E63B2E'
                }}></TouchableOpacity>
            )}
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
            {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 80, height: 60 }} />}
            <BaseInput
            value={value}
            onChangeText={changeText}
            placeholder="Detail(option)"
            />
      
      </View>
    </View>
  );
};
const VehicleInspection = (props: Props) => {
  const [vehicleAvailability, setvehicleAvailability] = useState(true);
  const [vehicleAvailabilityPictures, setvehicleAvailabilityPictures] = useState(null);
  const [vehicleAvailabiltyDetails, setvehicleAvailabiltyDetails] = useState('');
  const [vehicleCleanliness, setvehicleCleanliness] = useState(true);
  const [vehicleCleanlinessDetails, setvehicleCleanlinessDetails] = useState('');
  const [vehicleCleanlinessPictures, setvehicleCleanlinessPictures] = useState(null);
  const [vehicleDamage, setvehicleDamage] = useState(true);
  const [vehicleDamageDetails, setvehicleDamageDetails] = useState('');
  const [vehicleDamagePictures, setvehicleDamagePictures] = useState(null);
  const [vehicleGas, setvehicleGas] = useState(0);
  const vehicleId = props.vehicleId
  const { data, error, loading, postVehicleInspectionData } = useVehicleInspection({
    vehicleId,
    vehicleAvailability,
    vehicleAvailabilityPictures,
    vehicleAvailabiltyDetails,
    vehicleCleanliness,
    vehicleCleanlinessDetails,
    vehicleCleanlinessPictures,
    vehicleDamage,
    vehicleDamageDetails,
    vehicleDamagePictures,
    vehicleGas,
  });
  const toast = useToast();
  const navigation = useNavigation();
  const styles = useStyles(props);

  let current = true;




  const goToReservationScreen = () => {

    postVehicleInspectionData();
    if (data?.status === 'success') {
      toast({
        type: 'success',
        message: 'Vehicle Inspection added Successfully',
        title: 'success',
        duration: 3000,
      });
    } else {
      toast({
        type: 'error',
        message: 'Check inspection fields',
        title: 'Error',
        duration: 3000,
      });
      return
    }
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
          <InputField
            setvehicleAvailability={setvehicleAvailability}
            vehicleAvailability={vehicleAvailability}
            vehicleAvailabilityPictures={vehicleAvailabilityPictures}
            setvehicleAvailabilityPictures={setvehicleAvailabilityPictures}
            vehicleAvailabiltyDetails={vehicleAvailabiltyDetails}
            setvehicleAvailabiltyDetails={setvehicleAvailabiltyDetails}

          />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>
            Any vehicle damage?
          </Text>
          <InputField
            setvehicleDamage={setvehicleDamage}
            vehicleDamagePictures={vehicleDamagePictures}
            setvehicleDamagePictures={setvehicleDamagePictures}
            vehicleDamage={vehicleDamage}
            vehicleDamageDetails={vehicleDamageDetails}
            setvehicleDamageDetails={setvehicleDamageDetails}
          />

        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>
            Is vehicle clean?
          </Text>
          <InputField
            setvehicleCleanliness={setvehicleCleanliness}
            vehicleCleanliness={vehicleCleanliness}
            vehicleCleanlinessPictures={vehicleCleanlinessPictures}
            setvehicleCleanlinessPictures={setvehicleCleanlinessPictures}
            vehicleCleanlinessDetails={vehicleCleanlinessDetails}
            setvehicleCleanlinessDetails={setvehicleCleanlinessDetails}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>
            How much gas in vehicle?
          </Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            onValueChange={vehicleGas => setvehicleGas(vehicleGas)}
            maximumValue={65}
            thumbTintColor="#E63B2E"
            minimumTrackTintColor="#E63B2E"
          />
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
            {Math.floor(vehicleGas)} litres
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.bottomSection,
          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
        ]}>
        <Rounded
          width="40%"
          loading={loading}
          onPress={goToReservationScreen}>
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
