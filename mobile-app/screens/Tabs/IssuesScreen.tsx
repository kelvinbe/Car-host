import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '../../types'
import { makeStyles } from '@rneui/themed'
import BaseInput from '../../components/atoms/Input/BaseInput/BaseInput'
import BaseTextInput from '../../components/atoms/Input/BaseTextInput/BaseTextInput'
import Rounded from '../../components/atoms/Buttons/Rounded/Rounded'

type Props = BottomTabScreenProps<BottomTabParamList, "Issues">

const useStyles = makeStyles((theme, props: Props)=>({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputContainer: {
    width: "90%",
    height: "80%",
    paddingTop: 30
  },
  bottomContainer: {
    width: "90%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",

  }
}))

const IssuesScreen = (props: Props) => {
  const styles = useStyles(props)
  return (
    <View style={styles.container} >
      <View style={styles.inputContainer} >
          <BaseInput label="Name" placeholder="Enter your full name" containerStyle={{marginBottom: 50}} />
          <BaseInput label="Email" placeholder="Enter your email" containerStyle={{marginBottom: 50}} />
          <BaseTextInput label="Message" placeholder="Write..." />
      </View>
      <View style={styles.bottomContainer} >
        <Rounded>
          Submit
        </Rounded>
      </View>
    </View>
  )
}

export default IssuesScreen

const styles = StyleSheet.create({})