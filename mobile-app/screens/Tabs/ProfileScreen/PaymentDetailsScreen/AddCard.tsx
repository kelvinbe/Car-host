import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { makeStyles, useTheme } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IRawCard, IRawPaymentMethodDetails, PaymentDetailsScreenParamList } from '../../../../types'
import BaseInput from '../../../../components/atoms/Input/BaseInput/BaseInput'
import WithHelperText from '../../../../components/atoms/Input/WithHelperText/WithHelperText'
import { Icon } from '@rneui/base'
import { removeSpaces } from "../../../../utils/utils"
import Rounded from '../../../../components/atoms/Buttons/Rounded/Rounded'
import Loading from '../../../../components/molecules/Feedback/Loading/Loading'
import { useSetPaymentMethodMutation } from '../../../../store/slices/billingSlice'
import { auth } from '../../../../firebase/firebaseApp'
import useToast from '../../../../hooks/useToast'
import { selectCardNum, selectIsCardNumValid, selectCardCvv, selectIsCvvValid, selectCardExp, selectIsExpDateValid, selectAttemptsToSubmit, selectCardName, selectPaymentCardAdded } from '../../../../store/slices/addCardSlice'
import { setCard, setCardCvv, setCardName, setCardNum, setCardExp, setpaymentCardAdded } from '../../../../store/slices/addCardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAddCard } from '../../../../hooks'
import { Card } from '../../../../hooks/useAddCard'

type Props = Card & NativeStackScreenProps<PaymentDetailsScreenParamList, "AddCardScreen">

const useStyles = makeStyles((theme, props: Props)=>{
    return {
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.white,
            paddingVertical: 50,
            paddingHorizontal: 10
        },
        inputContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20

        },

        bottomInputSection: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        errorText: {
            color: theme.colors.error,
            fontSize: 12,
            fontWeight: "400",
            textAlign: "center",
            fontFamily: "Lato_400Regular"
        },
        helperTextLeft: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: 20
        },
        helperTextRight: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 20
        },
        bottomSection: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

        }
    }
})


function AddCard(props: Props){
    const toast = useToast()
    const dispatch = useDispatch()
    const { theme } = useTheme()
    const {data,error, loading, addPaymentCard} = useAddCard(props)

    const name = useSelector(selectCardName)
    const cardNumber = useSelector(selectCardNum)
    const isCardNumberValid = useSelector(selectIsCardNumValid)
    const cvv = useSelector(selectCardCvv)
    const attemptsToSubmit = useSelector(selectAttemptsToSubmit)
    const expDate = useSelector(selectCardExp)
    const isExpDateValid = useSelector(selectIsExpDateValid)
    const isCvvValid = useSelector(selectIsCvvValid)
    const paymentCardAdded = useSelector(selectPaymentCardAdded)


    const handleNameChange = (text: string) => {
        dispatch(setCardName({
            payload: text
        }))
    }

    const handleCardNumberChange = (text:string) => {
        dispatch(setCardNum({
            payload: removeSpaces(text)
        }))
        
    }

    const handleExpDateChange = (text: string) => {
        dispatch(setCardExp({
            payload: removeSpaces(text)?.replace("/", "")
        }))
    }

    const handleCvvChange = (text: string) => {
        dispatch(setCardCvv({
            payload: removeSpaces(text)
        }))
    }

    const goBackToOnboarding = () => {
        dispatch(setpaymentCardAdded())

        props.navigation.navigate("OnboardingHome")
    }



    const handleAddCard = () => {
        addPaymentCard({name, cardNumber, cvv, expDate})

        if(error){
            toast({
                type: "error",
                message: error,
                title: "Error",
                duration: 3000,
            })

        }
        else if(data){
            toast({
                type: "success",
                message: "Your card has been added",
                title: "Success",
                duration: 3000,
            })


            goBackToOnboarding()
        }
    }
    const styles = useStyles(props)   

    return (loading ? <Loading/> :
        <View style={styles.container} >
            <View style={styles.inputContainer} >
                <WithHelperText 
                    label="Name" 
                    value={name}
                    onChangeText={handleNameChange} 
                    placeholder="Card holder`s name" 
                    fullWidth 
                    container={{
                        marginBottom: 45
                    }} 
                    helperText={
                        attemptsToSubmit > 0 && name.length === 0 ? <View style={styles.helperTextLeft} >
                            <Text style={styles.errorText} >Name is required</Text>
                        </View> : ""
                    }
                    />
                <WithHelperText 
                    label="Card Number"
                    placeholder="xxxx xxxx xxxx xxxx" 
                    keyboardType="numeric"
                    maxLength={19}
                    onChangeText={handleCardNumberChange}
                    value={cardNumber}
                    rightIcon={
                        cardNumber?.length > 0 ? !isCardNumberValid ? <Icon name="exclamation-circle" size={16} type="font-awesome" color={theme.colors.success} /> : <Icon name="check-circle" size={16} type="font-awesome" color={theme.colors.success} /> : undefined
                    }
                    fullWidth container={{
                        marginBottom: 45
                    }} 
                    helperText={
                        attemptsToSubmit > 0 && !isCardNumberValid ? <View style={styles.helperTextLeft} >
                            <Text style={styles.errorText} >Card number is invalid</Text>
                        </View> : ""
                    }
                    />
                <View style={styles.bottomInputSection} >
                    <BaseInput
                        width={"45%"}
                        value={expDate}
                        placeholder="MM/YY"
                        label="Exp. Date"
                        keyboardType='numeric'
                        maxLength={5}
                        onChangeText={handleExpDateChange}
                        rightIcon={
                            expDate?.length > 0 ? !isExpDateValid ? <Icon name="exclamation-circle" size={16} type="font-awesome" color={theme.colors.error} /> : <Icon size={16} name="check-circle" type="font-awesome" color={theme.colors.success} /> : undefined
                        }
                    />
                    <BaseInput
                        width={"45%"}
                        placeholder="CVV"
                        label="CVV"
                        keyboardType='numeric'
                        maxLength={3}
                        value={cvv}
                        onChangeText={handleCvvChange}
                        secureTextEntry
                        rightIcon={
                            cvv?.length > 0 ? !isCvvValid ? <Icon size={16} name="exclamation-circle" type="font-awesome" color={theme.colors.error} /> : <Icon size={16} name="check-circle" type="font-awesome" color={theme.colors.success} /> : undefined
                        }
                    />
                </View>
            </View>
            <View style={styles.bottomSection} >
                <Rounded fullWidth onPress = {handleAddCard} >
                    Add Card
                </Rounded>
            </View>
        </View>
    )
}

export default AddCard

const styles = StyleSheet.create({})