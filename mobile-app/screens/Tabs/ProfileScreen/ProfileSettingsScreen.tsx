import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed';
import BaseInput from '../../../components/atoms/Input/BaseInput/BaseInput';
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';
import { Icon } from '@rneui/base';

interface  IProps  {}

type Props = IProps;

const initialState = {
    currentPasswordIsVisible: false,
    newPasswordIsVisible: false,
    confirmPasswordIsVisible: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
}

const settingsScreenReducer = (state: any = initialState, action: any) => {
    switch (action.type){
        case "toggle_current_password":
            return {
                ...state,
                currentPasswordIsVisible: !state.currentPasswordIsVisible
            }
        case "toggle_new_password":
            return {
                ...state,
                newPasswordIsVisible: !state.newPasswordIsVisible
            }
        case "toggle_confirm_password":
            return {
                ...state,
                confirmPasswordIsVisible: !state.confirmPasswordIsVisible
            }
        case "set_current_password":
            return {
                ...state,
                currentPassword: action.payload
            }
        case "set_new_password":
            return {
                ...state,
                newPassword: action.payload
            }
        case "set_confirm_password":
            return {
                ...state,
                confirmPassword: action.payload
            }
        default:
            return state

    }
}



const useStyles = makeStyles((theme, props: Props)=>({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 75
    },
    topSectionContainer: {
        width: "90%",
        height: "80%"
    },
    bottomSectionContainer: {
        width: "90%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
    }
}))

const ProfileSettingsScreen = (props: Props) => {
    const styles = useStyles(props)
    const [{
        currentPasswordIsVisible,
        newPasswordIsVisible,
        confirmPasswordIsVisible,
        currentPassword,
        newPassword,    
        confirmPassword

    }, dispatch] = React.useReducer(settingsScreenReducer, initialState)

    const toggleCurrentPasswordVisibility = () => {
        dispatch({type: "toggle_current_password"})
    }

    const toggleNewPasswordVisibility = () => {
        dispatch({type: "toggle_new_password"})
    }

    const toggleConfirmPasswordVisibility = () => {
        dispatch({type: "toggle_confirm_password"})
    }

    const setCurrentPassword = (text: string) => {
        dispatch({type: "set_current_password", payload: text})
    }

    const setNewPassword = (text: string) => {
        dispatch({type: "set_new_password", payload: text})
    }

    const setConfirmPassword = (text: string) => {
        dispatch({type: "set_confirm_password", payload: text})
    }


  return (
    <View style={styles.container} >
        <View style={styles.topSectionContainer} >
            <BaseInput secureTextEntry={!currentPasswordIsVisible} onChangeText={setCurrentPassword} label="Current Password" containerStyle={{
                marginBottom: 50
            }} placeholder="Current Password" rightIcon={
                <Icon onPress={toggleCurrentPasswordVisibility} name={currentPasswordIsVisible ? "eye" : "eye-slash"}  type="font-awesome" />
            } />
            <BaseInput secureTextEntry={!newPasswordIsVisible} onChangeText={setNewPassword} label="New Password" containerStyle={{
                marginBottom: 50
            }} placeholder="New Password" rightIcon={
                <Icon onPress={toggleNewPasswordVisibility} name={newPasswordIsVisible ? "eye" : "eye-slash"}  type="font-awesome" />
            } />

            <BaseInput secureTextEntry={!confirmPasswordIsVisible} onChangeText={setConfirmPassword} label="Confirm Password" containerStyle={{
                marginBottom: 50
            }} placeholder="Confirm Password" rightIcon={
                <Icon onPress={toggleConfirmPasswordVisibility} name={confirmPasswordIsVisible ? "eye" : "eye-slash"}  type="font-awesome" />
            } />

        </View>
        <View 
            style={styles.bottomSectionContainer}
        >
            <Rounded>
                Save Changes
            </Rounded>
        </View>
    </View>
  )
}

export default ProfileSettingsScreen

const styles = StyleSheet.create({})