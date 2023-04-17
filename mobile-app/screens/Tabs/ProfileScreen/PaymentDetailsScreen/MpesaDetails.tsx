import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { makeStyles } from '@rneui/themed'
import BaseInput from '../../../../components/atoms/Input/BaseInput/BaseInput';
import Rounded from '../../../../components/atoms/Buttons/Rounded/Rounded';
import { useAddPaymentMethodMutation } from '../../../../store/slices/billingSlice';
import { useAppSelector } from '../../../../store/store';
import { selectUserProfile } from '../../../../store/slices/userSlice';
import { isNaN } from 'lodash';
import useToast from '../../../../hooks/useToast';

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
    const toast = useToast()
    const styles = useStyles(props)
    const [addPaymentMethod, {isLoading, isError}] = useAddPaymentMethodMutation()
    const [mpesa_number, set_mpesa_number] = useState<string|undefined>()
    const handleAddPaymentMethod = async () =>{
        const number = parseInt(mpesa_number?.replace("+", "") ??"")
        if(isNaN(number)) return toast({
            message: "Invalid phone number",
            type: "primary"
        }) 
        await addPaymentMethod({
            mobile_money_number: number,
            type: "mpesa"
        }).catch(()=>{
            toast({
                message: "Please try again",
                type: "error"
            })
        })
    }

  return (
    <View style={styles.container} >
        <View style={styles.inputContainerStyle} >
            <BaseInput 
                value={mpesa_number}
                onChangeText={(v)=>set_mpesa_number(v)}
                label="Account Number"
                placeholder="+254xxxxxxxxx"
            />
        </View>
        <View style={styles.bottomContainer} >
            <Rounded
                loading={isLoading}
                onPress={handleAddPaymentMethod}
            >
                Done
            </Rounded>
        </View>
    </View>
  )
}

export default MpesaDetails

const styles = StyleSheet.create({})