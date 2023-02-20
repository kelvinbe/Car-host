import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '../../types'
import { makeStyles } from '@rneui/themed'
import BaseInput from '../../components/atoms/Input/BaseInput/BaseInput'
import BaseTextInput from '../../components/atoms/Input/BaseTextInput/BaseTextInput'
import Rounded from '../../components/atoms/Buttons/Rounded/Rounded'
import { useReportIssue } from '../../hooks'
import { Issue } from '../../hooks/useReportIssue'
import useToast from '../../hooks/useToast'

type Props = Issue & BottomTabScreenProps<BottomTabParamList, "Issues">

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
  const {data, error, sendIssue } = useReportIssue(props)
  const toast = useToast()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const reportIssue = () => {
    sendIssue({ name, email, message })

    if(error && data === null){
      toast({
          type: "error",
          message: error,
          title: "Error",
          duration: 3000,
      })
    }
    else{
      toast({
        type: "success",
        message: "Your issue has been sent",
        title: "Success",
        duration: 3000,
      })
    }
  }
  const styles = useStyles(props)
  return (
    <View style={styles.container} >
      <View style={styles.inputContainer} >
          <BaseInput label="Name" placeholder="Enter your full name" containerStyle={{marginBottom: 50}} value={name} onChangeText={setName}/>
          <BaseInput label="Email" placeholder="Enter your email" containerStyle={{marginBottom: 50}} value={email} onChangeText={setEmail}/>
          <BaseTextInput label="Message" placeholder="Write..." value={message} onChangeText={setMessage}/>
      </View>
      <View style={styles.bottomContainer}>
        <Rounded onPress={() => reportIssue()} >
          Submit
        </Rounded>
      </View>
    </View>
  )
}

export default IssuesScreen

const styles = StyleSheet.create({})