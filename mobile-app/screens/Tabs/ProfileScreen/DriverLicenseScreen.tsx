import { Text, View, Pressable, Platform } from 'react-native';
import React, {useState,useEffect, FunctionComponent } from 'react';
import { makeStyles, ThemeConsumer } from '@rneui/themed';

import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';

import LicensePlaceHolderIcon from '../../../assets/icons/license-placeholder.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import * as ImagePicker from 'expo-image-picker';
import { Image } from '@rneui/base'
import useFetchDivvlyInfo from '../../../hooks/useFetchDivvlyInfo';
import useToast from '../../../hooks/useToast';
import { FETCH_DRIVERS_LICENSE_ENDPOINT } from '../../../hooks/constants';
import useEditDriversLicense, {editDriversLicense} from '../../../hooks/useEditDriversLicense'
import { useSelector } from 'react-redux';
import { selectDriversLicense } from '../../../store/slices/driversLicenseSlice';



type Props = editDriversLicense 

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    marginVertical: 20,
    height: 214,
    width: '100%',
    borderColor: theme.colors.stroke,
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadViewContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  uploadIcon: {
    width: 21,
    height: 21,
    color: '#0B449D',
    margin: 10,
  },

  uploadText: {
    color: theme.colors.labelColor,
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const DriverLicenseScreen: FunctionComponent = (props: Props) => {
  const styles = useStyles(props);
  const [image, setImage] = useState('')
  const toast = useToast()
  const {data, error, loading, fetchDivvlyInfo} = useFetchDivvlyInfo(FETCH_DRIVERS_LICENSE_ENDPOINT)
  const {editedData, err, editDriversLicense} = useEditDriversLicense(props)
  const driversLicenses = useSelector(selectDriversLicense)

  const getPermisssion = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
      }
    }
  };

  useEffect(() => {

    if(data !== null){
      setImage(data?.data[0]?.uri)
      toast({
        type: "success",
        message: "Drivers License Fetched Successfully",
        title: "Success",
        duration: 3000,
      })
    }
    else if(err){
      toast({
        type: "error",
        message: "Something went wrong",
        title: "Error",
        duration: 3000,
      })
      
    }  
  },[data])



  useEffect(() => {
    getPermisssion();
  }, []);


  const handleImageUpload = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage((await result)?.assets[0]?.uri);
      }
  };

  const handleSaveChanges = () => {
      editDriversLicense(image)
      if(editedData !== null){
        setImage(editedData[0]?.uri)
        toast({
          type: "success",
          message: "Drivers License Updated Successfully",
          title: "Success",
          duration: 3000,
        })
      }
      else if(error){
        toast({
          type: "error",
          message: "Something went wrong",
          title: "Error",
          duration: 3000,
        })
        
      }  

  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.imageContainer}>
            {image !== '' ? <Image source={{ uri: image}} style={{width: 325, height: 213, borderRadius: 30}}/> : <LicensePlaceHolderIcon width={133} height={111} stroke={theme.colors.stroke} />}
            </View>

            <Pressable onPress={handleImageUpload} style={styles.uploadViewContainer}>
              <UploadIcon style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Upload Driver License</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSection}>
            <Rounded onPress={handleSaveChanges} fullWidth>
              Save Changes
            </Rounded>
          </View>
        </View>
      )}
    </ThemeConsumer>
  );
};
