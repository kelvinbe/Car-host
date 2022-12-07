import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileScreenParamList } from '../../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import BaseInput from '../../../components/atoms/Input/BaseInput/BaseInput'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import { Image } from '@rneui/base'
import CameraIcon from "../../../assets/icons/camera.svg"

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
        marginBottom: 55
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
        
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

    }
}))

const ProfileScreenEdit = (props: Props) => {
    const styles = useStyles(props)
  return (
    <ThemeConsumer>
        {({theme}) => (
            <SafeAreaView style={styles.container} >
                <StatusBar style="dark" backgroundColor={theme.colors.white}  />
                <View style={styles.contentContainer} >
                    <View style={styles.topImageContainer} >
                        <View style={styles.avatarSection} >
                            <View style={styles.avatarContainer} >
                                <Image source={require("../../../assets/images/user.png")} style={{width: 70, height: 70}} />
                            </View>
                            <View style={styles.changeImageContainer} >
                                <CameraIcon width={16} height={12} />
                            </View>
                        </View>
                        
                    </View>
                    <View style={styles.inputContainerStyle} >
                        <BaseInput label="Name" placeholder='Name' containerStyle={styles.baseInputStyle}  />
                        <BaseInput label="Email" placeholder="email@email.com" containerStyle={styles.baseInputStyle} />
                    </View>
                </View>
                <View style={styles.bottomContainer} >
                    <Rounded>
                        Save Changes
                    </Rounded>
                </View>
                
            </SafeAreaView>
        )}
    </ThemeConsumer>
    
  )
}

export default ProfileScreenEdit

const styles = StyleSheet.create({})