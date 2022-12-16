import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useReducer } from 'react'
import { makeStyles, useTheme } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IRawCard, IRawPaymentMethodDetails, PaymentDetailsScreenParamList } from '../../../../types'
import BaseInput from '../../../../components/atoms/Input/BaseInput/BaseInput'
import WithHelperText from '../../../../components/atoms/Input/WithHelperText/WithHelperText'
import { Icon } from '@rneui/base'
import { addSlashAfter2Digits, addSpacingAfterEveryFourDigits, removeSpaces } from "../../../../utils/utils"
import Rounded from '../../../../components/atoms/Buttons/Rounded/Rounded'
import Loading from '../../../../components/molecules/Feedback/Loading/Loading'
import { useSetPaymentMethodMutation } from '../../../../store/slices/billingSlice'
import { auth } from '../../../../firebase/firebaseApp'
import useToast from '../../../../hooks/useToast'

const ccNumberRegex = new RegExp("^[0-9]{16}$")
const expDateRegex = new RegExp("^[0-9]{4}$")
const cvvRegex = new RegExp("^[0-9]{3}$")

type Props = NativeStackScreenProps<PaymentDetailsScreenParamList, "AddCardScreen">

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

interface IReducerState {
    name: string,
    cardNumber: string,
    expDate: string,
    cvv: string
    isCardNumberValid: boolean,
    isExpDateValid: boolean,
    isCvvValid: boolean,
    attemptsToSubmit: number,
    loading: boolean
    error: string
}

const initialState: IReducerState = {
    name: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    isCardNumberValid: false,
    isExpDateValid: false,
    isCvvValid: false,
    attemptsToSubmit: 0,
    loading: false,
    error: ""
}

const reducer = (state: IReducerState, action: any) => {
    switch (action.type) {
        case "SET_NAME":    
            return {
                ...state,
                name: action.payload
            }
        case "SET_CARD_NUMBER":
            return {
                ...state,
                cardNumber: addSpacingAfterEveryFourDigits(action.payload),
                isCardNumberValid: ccNumberRegex.test(action.payload)
            }
        case "SET_EXP_DATE":
            return {
                ...state,
                expDate: action?.payload?.length > 2 ? addSlashAfter2Digits(action.payload) : action.payload ,
                isExpDateValid: expDateRegex.test(action.payload)   
            }
        case "SET_CVV":
            return {
                ...state,
                cvv: action.payload,
                isCvvValid: cvvRegex.test(action.payload)
            }
        case "SUBMIT":
            return {
                ...state,
                attemptsToSubmit: state.attemptsToSubmit + 1
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

const AddCard = (props: Props) => {
    const [ addCard, {
        isLoading: loading,
        error: addCardError,
        data
    } ] = useSetPaymentMethodMutation()
    const toast = useToast()
    const [{
        name,
        cardNumber,
        expDate,
        cvv,
        isCardNumberValid,
        isExpDateValid,
        isCvvValid,
        attemptsToSubmit,
        error
    }, dispatchAction] = useReducer(reducer, initialState)

    const { theme } = useTheme()

    const handleNameChange = (text: string) => {
        dispatchAction({
            type: "SET_NAME",
            payload: text
        })
    }

    const handleCardNumberChange = (text: string) => {
        dispatchAction({
            type: "SET_CARD_NUMBER",
            payload: removeSpaces(text)
        })
    }

    const handleExpDateChange = (text: string) => {
        dispatchAction({
            type: "SET_EXP_DATE",
            payload: removeSpaces(text)?.replace("/", "")
        })
    }

    const handleCvvChange = (text: string) => {
        dispatchAction({
            type: "SET_CVV",
            payload: removeSpaces(text)
        })
    }

    const handleAddCard = () => {
        dispatchAction({
            type: "SUBMIT"
        })
        addCard({
            details: {
                cardNumber,
                cvc: cvv,
                name,
                expMonth: parseInt(expDate.slice(0, 2)),
                expYear: parseInt(expDate.slice(3, 5)),
                email: auth?.currentUser?.email
            } as IRawCard
        })

    }

    useEffect(()=>{
        if(addCardError){
            toast({
                title: "Error",
                message: "Something went wrong.\n Please try again later",
                type: "error",
                duration: 5000
            })
        }

        if(data){
            toast({
                title: "Success",
                message: "Card added successfully",
                type: "success",
                duration: 5000
            })
            props.navigation.goBack()
        }
    }, [addCardError, data])

    



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
                <Rounded onPress={handleAddCard} fullWidth >
                    Add Card
                </Rounded>
            </View>
        </View>
    )
}

export default AddCard

const styles = StyleSheet.create({})