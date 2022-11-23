import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { makeStyles } from '@rneui/themed'
import BaseInput from '../components/atoms/Input/BaseInput/BaseInput'
import WithHelperText from '../components/atoms/Input/WithHelperText/WithHelperText'
import Rounded from '../components/atoms/Buttons/Rounded/Rounded'
import Divider from '../components/atoms/Divider/Divider'
import IconButton from '../components/atoms/Buttons/Icon/IconButton'
import { withTheme } from 'emotion-theming'
import { Button, Icon, Image, Theme } from '@rneui/base'
import { RootStackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


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
        verifyButtonStyles : {
            borderRadius: 15,
            borderWidth: 1,
            borderColor: theme.colors.grey0,
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
          color: theme.colors.grey0,
          fontSize: 12,
          lineHeight: 18,
          textAlign: "center"
        }
    })
})

const LoginScreen = (props: Props) => {
    const styles = useStyles(props)
    const [viewPassword, setViewPassword] = useState(false)

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword)
    }

    const navigateToLogin = () => {
        props.navigation.navigate("Login")
    }

  return (
    <View style={styles.container} >
        <View style={styles.logoContainer}>
            <Image 
                source={require('../assets/images/logo.png')}
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
                    Register
                </Text>
                
                <WithHelperText label="Email" container={{marginBottom: 40}} 
                    fullWidth 
                    placeholder="email@email.com" 
                    keyboardType='email-address'
                    helperText={
                      <Button containerStyle={styles.verifyButtonContainerStyle} buttonStyle={styles.verifyButtonStyles} titleStyle={styles.verifyButtonTextStyles} >
                        Verify
                      </Button>
                    } 
                    /**
                     * @todo add loading verification loading icon
                     */
                    // rightIcon={<Icon onPress={toggleViewPassword} name={ viewPassword  ? "eye" :"eye-slash"} type="font-awesome" />} 
                    />
                    <BaseInput containerStyle={{marginBottom: 20}} fullWidth placeholder='Enter Verification Code' label="Verification Code"  />
                <Rounded  fullWidth>
                    Continue
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
