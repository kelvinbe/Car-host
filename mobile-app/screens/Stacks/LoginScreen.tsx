import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { makeStyles } from '@rneui/themed'
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
            fontWeight: "500",
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
            fontWeight: "500",

        },
    })
})

const LoginScreen = (props: Props) => {
    const styles = useStyles(props)
    const [viewPassword, setViewPassword] = useState(false)

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
        props.navigation.navigate("Root")
    }

  return (
    <SafeAreaView>
        <View style={styles.container} >
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../../assets/images/logo.png')}
                    style={{
                        height: 20,
                        width: 78,
                    }}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.contentContainer} >
                <View style={styles.topContent} >
                    <Text style={styles.title} >
                        Login
                    </Text>
                    <BaseInput containerStyle={{marginBottom: 40}} fullWidth placeholder='e.g email@email.com' label="Email" keyboardType='email-address' />
                    <WithHelperText label="Password" secureTextEntry={!viewPassword} container={{marginBottom: 20}} 
                        fullWidth 
                        placeholder="password" 
                        helperText={
                            <Text onPress={navigateToForgotPassword} style={styles.helperTextStyle} >
                                Forgot Password?
                            </Text>
                        }
                        rightIcon={<Icon onPress={toggleViewPassword} name={ viewPassword  ? "eye" :"eye-slash"} type="font-awesome" />} 
                        />
                    <Rounded onPress={navigateToHome} fullWidth>
                        Login
                    </Rounded>
                    <Divider style={{marginTop: 20, marginBottom: 20}} >
                        Or
                    </Divider>
                    <View style={styles.iconButtonsContainer} >
                        <IconButton name="google" iconType='font-awesome' />
                        <IconButton shadow containerStyle={{
                            marginHorizontal: 10
                        }} name="apple" iconType='font-awesome' />
                        <IconButton name="facebook" iconType='font-awesome' />
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
    </SafeAreaView>
  )
}

export default LoginScreen
