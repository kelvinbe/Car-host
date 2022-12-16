import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed'
import BaseInput from '../../../../components/atoms/Input/BaseInput/BaseInput';
import Rounded from '../../../../components/atoms/Buttons/Rounded/Rounded';

interface IProps {

}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props)=>({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50
    },
    inputContainerStyle: {
        width: "90%",
        height: "80%",
    },
    bottomContainer: {
        width: "90%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
    }
}))

const MpesaDetails = (props: Props) => {
    const styles = useStyles(props)
  return (
    <View style={styles.container} >
        <View style={styles.inputContainerStyle} >
            <BaseInput
                label="Name"
                placeholder="Account Name"
                containerStyle={{
                    marginBottom: 45
                }}
            />
            <BaseInput 
                label="Account Number"
                placeholder="+254xxxxxxxxx"
            />
        </View>
        <View style={styles.bottomContainer} >
            <Rounded>
                Finish
            </Rounded>
        </View>
    </View>
  )
}

export default MpesaDetails

const styles = StyleSheet.create({})