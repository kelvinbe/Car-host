import { StyleSheet } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BottomTabParamList, ProfileScreenParamList } from '../../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreenHome from './ProfileScreenHome'
import ProfileScreenEdit from './ProfileScreenEdit'
import TopBar from './TopBar/TopBar'

const ProfileScreenStackNavigator = createNativeStackNavigator<ProfileScreenParamList>();

interface IProps {

}

type Props = IProps & BottomTabScreenProps<BottomTabParamList, "Profile">

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  }
}))

const ProfileScreen = (props: Props) => {
  const styles = useStyles(props)
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <SafeAreaView style={{
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.white,
        }} >
            <ProfileScreenStackNavigator.Navigator  initialRouteName='ProfileScreenHome' >
                <ProfileScreenStackNavigator.Screen options={{
                    headerShown: false
                }} name="ProfileScreenHome" component={ProfileScreenHome} />
                <ProfileScreenStackNavigator.Screen 
                options={{
                    header: (props) => <TopBar {...props} title="Edit Profile" />,
                    
                }}
                name="ProfileScreenEdit" component={ProfileScreenEdit} />
            </ProfileScreenStackNavigator.Navigator>
        </SafeAreaView>
      )}
    </ThemeConsumer>
    
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})