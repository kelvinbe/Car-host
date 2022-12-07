import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import React, {useState, useReducer} from 'react'
import { makeStyles, useTheme } from '@rneui/themed'
import BaseInput from '../../components/atoms/Input/BaseInput/BaseInput'
import WithHelperText from '../../components/atoms/Input/WithHelperText/WithHelperText'
import Rounded from '../../components/atoms/Buttons/Rounded/Rounded'
import Divider from '../../components/atoms/Divider/Divider'
import IconButton from '../../components/atoms/Buttons/Icon/IconButton'
import { withTheme } from 'emotion-theming'
import { Button, Icon, Image, Theme } from '@rneui/base'
import { RootStackParamList } from '../../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import useUserAuth from '../../hooks/useUserAuth'
import useToast from '../../hooks/useToast'
import Loading from '../../components/molecules/Feedback/Loading/Loading'
import { StatusBar } from 'expo-status-bar'
import FacebookIcon from "../../assets/icons/facebook.svg"
import AppleIcon from "../../assets/icons/apple.svg"
import GoogleIcon from "../../assets/icons/google.svg"

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//password with atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const hasLowercase = (str: string) => /[a-z]/.test(str);
const hasUppercase = (str: string) => /[A-Z]/.test(str);
const hasNumber = (str: string) => /\d/.test(str);
const hasSpecialCharacter = (str: string) => /[@$!%*?&]/.test(str);

type Props = NativeStackScreenProps<RootStackParamList, 'Register'> ;

const useStyles = makeStyles((theme)=>{
    return ({
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
            height: '80%',
            justifyContent: "space-between",
            alignItems: "center",
        },
        topContent: {
            width: '100%',
            justifyContent: "flex-start",
            alignItems: "center",
        }, 
        iconButtonsContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        },
        bottomTextContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: "500", fontFamily: "Lato_400Regular",
            marginVertical: 20
        },
        leftText: {
            
            color: theme.colors.primary,
            marginRight: 5
        },
        rightText: {
            color: theme.colors.grey1,
        },
        title: {
            color: theme.colors.title,
            fontSize: 24,
            fontWeight: "700", 
 fontFamily: "Lato_700Bold",
            marginBottom: 42
        },
        logoContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20
        },
        verifyButtonStyles : {
            borderRadius: 15,
            borderWidth: 1,
            borderColor: theme.colors.stroke,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingVertical: 3,
            width: 100,
            backgroundColor: theme.colors.white
        },
        verifyButtonContainerStyle: {
          width: "100%",
          alignItems: "flex-end",
          marginTop: 10
        },
        verifyButtonTextStyles: {
          color: theme.colors.stroke,
          fontSize: 12,
          lineHeight: 18,
          textAlign: "center"
        },
        bottomHelperTextContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 20
        },
        bottomHelperTextContainerA: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: 20
        },
        bottomHelperText: {
            fontSize: 12,
            fontWeight: "400", 
            fontFamily: "Lato_400Regular",
            fontStyle: 'italic',
            marginRight: 5,
            marginLeft: 5
        },
        passwordHelperText: {
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",

        },
        passwordHelperTextContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        },

    })
})

interface IReducerState {
    email: string,
    password: string,
    confirmPassword: string,
    loading: boolean,
    error: string,
    viewPassword: boolean,
    viewConfirmPassword: boolean,
    passwordsMatch: boolean,
    emailValid: boolean,
    passwordValid: boolean,
}

const initialState: IReducerState = {
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: '',
    viewPassword: false,
    viewConfirmPassword: false,
    passwordsMatch: false,
    emailValid: false,
    passwordValid: false,
}

const reducer = (state: IReducerState, action: any) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload,
                emailValid: action.payload.length > 0 ? emailRegex.test(action.payload) : false
            }
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload,
                passwordValid: action.payload.length > 0 ? passwordRegex.test(action.payload) : false
            }
        case 'SET_CONFIRM_PASSWORD':
            return {
                ...state,
                confirmPassword: action.payload,
                passwordsMatch: state.password.length > 0 ?  action.payload === state.password : false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }

        case 'SET_VIEW_PASSWORD':
            return {
                ...state,
                viewPassword: action.payload
            }
        case 'SET_VIEW_CONFIRM_PASSWORD':
            return {
                ...state,
                viewConfirmPassword: action.payload 
            }
        case 'SET_PASSWORDS_MATCH':
            return {
                ...state,
                passwordsMatch: action.payload
            }
        case 'SET_EMAIL_VALID':
            return {
                ...state,
                emailValid: action.payload
            }
        case 'SET_PASSWORD_VALID':
            return {
                ...state,
                passwordValid: action.payload
            }
        default:
            return state
    }
}


const LoginScreen = (props: Props) => {
    const [{
        email,
        password,
        confirmPassword,
        loading,
        error,
        viewPassword,
        viewConfirmPassword,
        passwordsMatch,
        emailValid,
        passwordValid
    }, dispatchAction] = useReducer(reducer, initialState)

    const styles = useStyles(props)
    const { theme } = useTheme()
    const toast = useToast()

    const {signUp} = useUserAuth()
    

    const handleRegister = () => {
        if(!emailValid || !passwordValid ){
            toast({
                title: "Error",
                type: "error",
                duration: 3000,
                message: "Invalid email or password"
            })
        }else{
            dispatchAction({type: 'SET_LOADING', payload: true})
            signUp(email, password).then((res)=>{
                console.log(res)
                dispatchAction({type: 'SET_LOADING', payload: false})
                props.navigation.navigate("Verification")
            }).catch((e)=>{
                console.log(e)
                toast({
                    title: "Error",
                    type: "error",
                    duration: 5000,
                    message: e.code === 'auth/email-already-in-use' ? 'Email already in use' : e.code === 'auth/invalid-email' ? 'Invalid email' : e.code === 'auth/weak-password' ? 'Weak password' : 'Something went wrong'
                })
                dispatchAction({type: 'SET_LOADING', payload: false})
            })
        }
        
    }

    const toggleViewPassword = () => {
        dispatchAction({type: 'SET_VIEW_PASSWORD', payload: !viewPassword})
    }

    const toggleViewConfirmPassword = () => {
        dispatchAction({type: 'SET_VIEW_CONFIRM_PASSWORD', payload: !viewConfirmPassword})
    }

    const setPassword = (value: string) => {
        dispatchAction({type: 'SET_PASSWORD', payload: value})
    }

    const setConfirmPassword = (value: string) => {
        dispatchAction({type: 'SET_CONFIRM_PASSWORD', payload: value})
    }

    const setEmail = (value: string) => {
        dispatchAction({type: 'SET_EMAIL', payload: value})
    }

    const navigateToLogin = () => {
        props.navigation.navigate("Login")
    }

    if(loading) return <Loading/>
  return (
        <View style={styles.container} >
            <StatusBar backgroundColor={theme.colors.white} style="dark" />
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../../assets/images/logo.png')}
                    style={{
                        height: 100,
                        width: 100,
                    }}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.contentContainer} >
                <KeyboardAvoidingView style={styles.topContent} >
                    <Text style={styles.title} >
                        Register
                    </Text>
            
                        <WithHelperText inputStyle={{paddingVertical: 10}} value={email} onChangeText={setEmail} label="Email" container={{marginBottom: 45}}
                            fullWidth
                            placeholder="email"
                            helperText={
                                <View style={[styles.bottomHelperText, {width: "100%", alignItems: "center", flexDirection: "row"}]} >
                                    <Text style={[styles.bottomHelperText, {
                                        color: email?.length > 0 ? emailValid ? theme.colors.error : theme.colors.success : theme.colors.grey1
                                    }]} >
                                        {
                                            email.length > 0 ? !emailValid ? "Email not properly formatted" : "" : ""
                                        }
                                    </Text>
                                    {( email?.length > 0 && !emailValid) && <Icon
                                        name={ !emailValid ? "exclamation-circle" :  "check-circle"}
                                        type="font-awesome"
                                        size={12}
                                        color={ !emailValid ? theme.colors.error : theme.colors.success}
                                    />}
                                </View>
                            }
                        />
                        <WithHelperText value={password} onChangeText={setPassword} label="Password" secureTextEntry={!viewPassword} container={{marginBottom: 45}} 
                            fullWidth 
                            placeholder="password" 
                            rightIcon={<Icon onPress={toggleViewPassword} name={ viewPassword  ? "eye" :"eye-slash"} type="font-awesome" />} 
                            helperText={
                               (password?.length > 0 && !passwordValid) ? <View style={styles.bottomHelperText}>
                                    <View style={styles.bottomHelperTextContainerA} >
                                        <Icon
                                            name={ !(password.length >= 8) ? "exclamation-circle" :  "check-circle"}
                                            type="font-awesome"
                                            size={12}
                                            color={ !(password.length >= 8) ? theme.colors.error : theme.colors.success}
                                        />
                                        <Text style={[styles.bottomHelperText,{
                                            color: !(password.length >= 8) ? theme.colors.error : theme.colors.success
                                        }]} >
                                            at least 8 characters long
                                        </Text>
                                    </View>
                                    <View style={styles.bottomHelperTextContainerA} >
                                        <Icon
                                            name={ !hasNumber(password) ? "exclamation-circle" :  "check-circle"}
                                            type="font-awesome"
                                            size={12}
                                            color={ !hasNumber(password) ? theme.colors.error : theme.colors.success}
                                        />
                                        <Text style={[styles.bottomHelperText,{
                                            color: !hasNumber(password) ? theme.colors.error : theme.colors.success
                                        }]} >
                                            at least one number
                                        </Text>
                                    </View>
                                    <View style={styles.bottomHelperTextContainerA} >
                                        <Icon
                                            name={ !hasLowercase(password) ? "exclamation-circle" :  "check-circle"}
                                            type="font-awesome"
                                            size={12}
                                            color={ !hasLowercase(password) ? theme.colors.error : theme.colors.success}
                                        />
                                        <Text style={[styles.bottomHelperText,{
                                            color: !hasLowercase(password) ? theme.colors.error : theme.colors.success
                                        }]} >
                                            at least one lowercase letter
                                        </Text>
                                    </View>
                                    <View style={styles.bottomHelperTextContainerA} >
                                        <Icon
                                            name={ !hasUppercase(password) ? "exclamation-circle" :  "check-circle"}
                                            type="font-awesome"
                                            size={12}
                                            color={ !hasUppercase(password) ? theme.colors.error : theme.colors.success}
                                        />
                                        <Text style={[styles.bottomHelperText,{
                                            color: !hasUppercase(password) ? theme.colors.error : theme.colors.success
                                        }]} >
                                            at least one uppercase letter
                                        </Text>
                                    </View>
                                    <View style={styles.bottomHelperTextContainerA} >
                                        <Icon
                                            name={ !hasSpecialCharacter(password) ? "exclamation-circle" :  "check-circle"}
                                            type="font-awesome"
                                            size={12}
                                            color={ !hasSpecialCharacter(password) ? theme.colors.error : theme.colors.success}
                                        />
                                        <Text style={[styles.bottomHelperText,{
                                            color: !hasSpecialCharacter(password) ? theme.colors.error : theme.colors.success
                                        }]} >
                                            at least one special character
                                        </Text>
                                    </View>
                               </View> : ""
                            }
                        />
                        <WithHelperText value={confirmPassword} onChangeText={setConfirmPassword} label="Confirm Password" secureTextEntry={!viewConfirmPassword} container={{marginBottom: 20}} 
                            fullWidth 
                            placeholder="Confirm Password" 
                            helperText={
                                <View style={styles.bottomHelperTextContainer} >
                                    <Text style={[styles.bottomHelperText, {
                                        color: password?.length > 0 ? passwordsMatch ? theme.colors.error : theme.colors.success : theme.colors.grey1
                                    }]} >
                                        {
                                            passwordValid ? !passwordsMatch ? "Passwords do not match" : "Passwords Match" : ""
                                        }
                                    </Text>
                                    { (password?.length && passwordValid ) > 0 && <Icon
                                        name={ !passwordsMatch ? "exclamation-circle" :  "check-circle"}
                                        type="font-awesome"
                                        size={12}
                                        color={ !passwordsMatch ? theme.colors.error : theme.colors.success}
                                    />}
                                </View>
                            }
                            rightIcon={<Icon onPress={toggleViewConfirmPassword} name={ viewConfirmPassword  ? "eye" :"eye-slash"} type="font-awesome" />} 
                        />
                    <Rounded 
                        loading={loading}
                        onPress={handleRegister}
                        fullWidth>
                        Continue
                    </Rounded>
                    <Divider style={{marginTop: 20, marginBottom: 20}} >
                        Or
                    </Divider>
                    <View style={styles.iconButtonsContainer} >
                        <IconButton name="google" iconType='font-awesome' >
                            <GoogleIcon width={24} height={24} />
                        </IconButton>
                        <IconButton shadow containerStyle={{
                            marginHorizontal: 10
                        }} name="apple" iconType='font-awesome' >
                            <AppleIcon fill="black" width={24} height={24} />
                        </IconButton>
                        <IconButton name="facebook" iconType='font-awesome' >
                            <FacebookIcon width={24} height={24} />
                        </IconButton>
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.bottomTextContainer} >
                    <Text style={styles.leftText} >
                        Have an account?
                    </Text>
                    <Text onPress={navigateToLogin} style={styles.rightText} >
                        Login
                    </Text>
                </View>
            </View>
        </View>
  )
}

export default LoginScreen
