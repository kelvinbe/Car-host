import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useReducer } from 'react'
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
import { createSlice } from '@reduxjs/toolkit'
import Loading from '../../../components/molecules/Feedback/Loading/Loading'

interface IProps {
}

type Props = IProps & NativeStackScreenProps<ProfileScreenParamList, "ProfileScreenEdit">

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

interface IReducer {
    email: string,
    fname: string,
    lname: string,
    edited: boolean
}

const initialState: IReducer = {
    email: "",
    fname: "",
    lname: "",
    edited: false
}

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        _setEmail: (state, action) => {
            state.email = action.payload.email
            state.edited = action.payload.email !== action.payload.prev
        },
        _setFname: (state, action) => {
            state.fname = action.payload.fname 
            state.edited = action.payload.fname !== action.payload.prev
        },
        _setLname: (state, action) => {
            state.lname = action.payload.lname
            state.edited = action.payload !== action.payload.prev
        }
    }
})

const { _setEmail, _setFname, _setLname } = editSlice.actions

export const editReducer = editSlice.reducer

const ProfileScreenEdit = (props: Props) => {
    const styles = useStyles(props)
    const { userProfile, updateProfileError, updateProfileLoading, updateUserProfile } = useUserAuth()
    const [{
        email,
        fname,
        lname,
        edited
    }, dispatchAction] = useReducer(editReducer, {
        ...initialState,
        email: userProfile?.email,
        fname: userProfile?.fname,
        lname: userProfile?.lname
    })
    const setEmail = (email: string) => {
        dispatchAction(_setEmail({email, prev: userProfile?.email}))
    }
    const setFname = (fname: string) => {
        dispatchAction(_setFname({fname, prev: userProfile?.fname}))
    }
    const setLname = (lname: string) => {
        dispatchAction(_setLname({lname, prev: userProfile?.lname}))
    }

    const update = () =>{
        const currentData = Object.entries({
            email,
            fname,
            lname
        })
        const prevData: {
            [key: string]: string
        } = {
            email: userProfile?.email,
            fname: userProfile?.fname,
            lname: userProfile?.lname
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
                                    uri: userProfile?.profilePicUrl
                                }} style={{width: 70, height: 70}} />
                            </View>
                            <View style={styles.changeImageContainer} >
                                <CameraIcon stroke={theme.colors.primary} width={16} height={12} />
                            </View>
                        </View>
                        <Text style={styles.handleText} >
                            {
                                userProfile?.handle
                            }
                        </Text>
                    </View>
                    <View style={styles.inputContainerStyle} >
                        <BaseInput  value={email} onChangeText={setEmail} label="Email" placeholder='email' containerStyle={styles.baseInputStyle}  />
                        <BaseInput  value={fname} onChangeText={setFname} label="First Name" placeholder="John" containerStyle={styles.baseInputStyle} />
                        <BaseInput  value={lname} onChangeText={setLname} label="Last Name" placeholder="Doe" containerStyle={styles.baseInputStyle} />
                    </View>
                </View>
                <View style={styles.bottomContainer} >
                    <Rounded onPress={update} disabled={!edited} >
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