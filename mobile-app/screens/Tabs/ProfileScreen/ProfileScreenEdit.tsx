import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useReducer, useState, useEffect } from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileScreenParamList } from '../../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import BaseInput from '../../../components/atoms/Input/BaseInput/BaseInput'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import { Image } from '@rneui/base'
import CameraIcon from "../../../assets/icons/camera.svg"
import useUserAuth from '../../../hooks/useUserAuth'
import Loading from '../../../components/molecules/Feedback/Loading/Loading'
import { useEditProfile } from '../../../hooks';
import { Profile } from '../../../hooks/useEditProfile';
import { _setEmail, _setName, _setPictureUrl } from '../../../store/slices/editProfileSlice'
import * as ImagePicker from 'expo-image-picker';


type Props = Profile & NativeStackScreenProps<ProfileScreenParamList, "ProfileScreenEdit">

const useStyles = makeStyles((theme, props: Props)=>({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
        alignItems: "center",
    },
    contentContainer: {
        width: "90%",
        height: "80%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    topImageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    inputContainerStyle: {
        width: "100%",
    },
    baseInputStyle: {
        marginBottom: 45
    },
    bottomContainer: {
        width: "90%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarSection: {
        position: "relative",
        width: 76,
        height: 76,
        borderColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        borderRadius: 35,
        borderWidth: 3,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
        overflow: "hidden"
    },
    changeImageContainer: {
        position: "absolute",
        top: 0,
        right: -15,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2
    },
    handleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.primary,
        marginVertical: 10,
        fontFamily: "Lato_700Bold"
    }
}))

const ProfileScreenEdit = (props: Props) => {
    const styles = useStyles(props)
    const { userProfile, updateProfileError, updateProfileLoading, updateUserProfile } = useUserAuth()
    const { data, editUserProfile } = useEditProfile(props);

    let userName = `${userProfile?.fname} ${userProfile?.lname}`;
    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userProfile?.email);
    const [pictureUrl, setPictureUrl] = useState(userProfile?.profile_pic_url);

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
    
      const chooseProfilePic = async () => {
        let result = ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!(await result).canceled) {
          setPictureUrl((await result)?.assets[0]?.uri);
        }
      };

    const update = () =>{
        editUserProfile({ name, email });
        const currentData = Object.entries({
            email,
            name,
            pictureUrl
        })
        const prevData: {
            [key: string]: string
        } = {
            email: userProfile?.email,
            name: userName,
            pictureUrl:userProfile?.profile_pic_url
        }
        const updatedData = currentData.filter(([key, value]: [string , string]) => value !== prevData?.[key as string])
        updateUserProfile(updatedData)
    }
  return (updateProfileLoading ? <Loading /> :
    <ThemeConsumer>
        {({theme}) => (
            <KeyboardAvoidingView behavior={
                Platform.OS === "ios" ? "padding" : "height"
            } style={styles.container} >
                <View style={styles.contentContainer} >
                    <View style={styles.topImageContainer} >
                        <View style={styles.avatarSection} >
                            <View style={styles.avatarContainer} >
                                <Image source={{
                                    uri: userProfile?.profile_pic_url
                                }} style={{width: 70, height: 70}} />
                            </View>
                            <TouchableOpacity style={styles.changeImageContainer} onPress={chooseProfilePic} >
                                <CameraIcon stroke={theme.colors.primary} width={16} height={12} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.handleText} >
                            {
                                userProfile?.handle
                            }
                        </Text>
                    </View>
                    <View style={styles.inputContainerStyle} >
                    <BaseInput
                        value={name}
                        onChangeText={setName}
                        label="Name"
                        placeholder="John Doe"
                        containerStyle={styles.baseInputStyle}
                    />
                        <BaseInput  value={email} onChangeText={setEmail} label="Email" placeholder='email' containerStyle={styles.baseInputStyle}  />
                    </View>
                </View>
                <View style={styles.bottomContainer} >
                    <Rounded onPress={update}>
                        Save Changes
                    </Rounded>
                </View>
                
            </KeyboardAvoidingView>
        )}
    </ThemeConsumer>
    
  )
}

export default ProfileScreenEdit

const styles = StyleSheet.create({})