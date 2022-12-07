import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@rneui/themed'
import { initFirebase } from '../../firebase/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import BaseInput from '../../components/atoms/Input/BaseInput/BaseInput'
import WithHelperText from '../../components/atoms/Input/WithHelperText/WithHelperText'
import Rounded from '../../components/atoms/Buttons/Rounded/Rounded'
import Divider from '../../components/atoms/Divider/Divider'
import IconButton from '../../components/atoms/Buttons/Icon/IconButton'
import { withTheme } from 'emotion-theming'
import { Icon, Image, Theme } from '@rneui/base'
import { RootStackParamList } from '../../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import useToast from '../../hooks/useToast'
import { StatusBar } from 'expo-status-bar';
import GoogleIcon from "../../assets/icons/google.svg"
import FacebookIcon from "../../assets/icons/facebook.svg"
import AppleIcon from "../../assets/icons/apple.svg"
import Loading from '../../components/molecules/Feedback/Loading/Loading';
import { isEmpty } from 'lodash';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'> ;

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
        helperTextStyle: {
            fontSize: 14,
            lineHeight: 16,
            color: theme.colors.grey3,
            marginTop: 5,
            width: "100%",
            textAlign: "right",
            fontStyle: "italic",
            fontWeight: "500", fontFamily: "Lato_400Regular",

        },
    })
})

const LoginScreen = (props: Props) => {
    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [_loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const styles = useStyles(props)
    const [viewPassword, setViewPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const {theme} = useTheme()

    const handleFirebaseAuthError = (e: any) =>{
        setError(true)
        switch(e.message){
            case "Firebase: Error (auth/invalid-email).":
                toast({
                    message: "Invalid Email",
                    type: "error",
                    title: "Error",
                    duration: 2000
                })
                break;
            case "Firebase: Error (auth/user-disabled).":
                toast({
                    message: "User Disabled",
                    type: "error",
                    title: "Error",
                    duration: 2000
                })
                break;
            case "Firebase: Error (auth/user-not-found).":
                toast({
                    message: "User Not Found",
                    type: "error",
                    title: "Error",
                    duration: 2000
                })
                break;
            case "Firebase: Error (auth/wrong-password).":
                toast({
                    message: "Wrong Password",
                    type: "error",
                    title: "Error",
                    duration: 2000
                })
                break;
            default:
                toast({
                    message: e.message,
                    type: "error",
                    title: "Error",
                    duration: 2000
                })

        }
        
    }

    const signIn = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            toast({
                message: "Login Successful",
                type: "success",
                title: "Success",
                duration: 2000

            })
            setLoading(false)
        }).catch((e)=>{
            console.log(e.message);
            setLoading(false)
            handleFirebaseAuthError(e)
        })
    };

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword)
    }

    const navigateToRegister = () => {
        props.navigation.navigate("Register")
    }

    const navigateToForgotPassword = () => {
        props.navigation.navigate("ForgotPassword")
    }
    
    const navigateToHome = () => {
        // toast({
        //     message: "This is a toast message",
        //     type: "primary",
        //     title: "Info",
        //     duration: 5000
        // })
        props.navigation.navigate("Root")
    }

    if (loading || _loading) return <Loading/>
    // if (user && !_loading && !loading && !error) {
    //     console.log("error", error)
    //     navigateToHome();
    // }

    useEffect(()=>{
        if(!isEmpty(user) && !loading && !_loading && !error){
            navigateToHome();
        }
    }, [user, loading, _loading, error])

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
                <View style={styles.topContent} >
                    <Text style={styles.title} >
                        Login
                    </Text>
                    <BaseInput value={email} onChangeText={setEmail} containerStyle={{marginBottom: 40}} fullWidth placeholder='e.g email@email.com' label="Email" keyboardType='email-address' />
                    <WithHelperText value={password} onChangeText={setPassword} label="Password" secureTextEntry={!viewPassword} container={{marginBottom: 20}} 
                        fullWidth 
                        placeholder="password" 
                        helperText={
                            <Text onPress={navigateToForgotPassword} style={styles.helperTextStyle} >
                                Forgot Password?
                            </Text>
                        }
                        rightIcon={<Icon onPress={toggleViewPassword} name={ viewPassword  ? "eye" :"eye-slash"} type="font-awesome" />} 
                        />
                    <Rounded disabled={isEmpty(password) || isEmpty(email)} loading={loading} onPress={signIn} fullWidth>
                        Login
                    </Rounded>
                    <Divider style={{marginTop: 20, marginBottom: 20}} >
                        Or
                    </Divider>
                    <View style={styles.iconButtonsContainer} >
                        <IconButton name="google" iconType='font-awesome' onClick={() => signIn()} >
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
                </View>
                <View style={styles.bottomTextContainer} >
                    <Text style={styles.leftText} >
                        Don't have an account?
                    </Text>
                    <Text onPress={navigateToRegister} style={styles.rightText} >
                        Register
                    </Text>
                </View>
                
            </View>
        </View>
  )
}

export default LoginScreen
