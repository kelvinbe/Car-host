import { ActivityIndicator, StyleProp, Text, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@rneui/themed'
import CreditCard, { CardProps } from '../CreditCard/CreditCard'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDeletePaymentMethodMutation } from '../../../store/slices/billingSlice';
import useToast from '../../../hooks/useToast';

interface IProps {
    onActionPress?: () => void,
    actionTitle?: string,
    customStyle?: StyleProp<ViewStyle>
}

type Props = IProps & CardProps;
const useStyles = makeStyles((theme, props)=>({
    container: {
        alignItems: "flex-end",
        justifyContent: "flex-start",
        width: "100%"
    },
    cardContainer: {
        width: "100%",
        marginbottom: 10
    },
    buttonStyle: {
        borderRadius: 25,
        paddingVertical: 6,
        paddinHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: theme.colors.primary,
        borderWidth: 1,
        // width: "60%",
        marginTop: 10,

    },
    titleStyle: {
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: "Lato_700Bold",
        lineHeight: 28,
        textAlign: "center",
        width: '100%',
    }
}))

const CreditCardWithActions = (props: Props) => {
    const styles = useStyles()
    const { theme } = useTheme()
    const [deleteOption, setDeleteOption] = useState<boolean>(false)

    const toast = useToast()

    const [ deletePaymentMethod, {
        isLoading,
        error,
        data
    } ] = useDeletePaymentMethodMutation()

    useEffect(()=>{
        if(data){
            toast({
                type: "success",
                message: "Payment method deleted.",
                title: "Success",
                duration: 3000,
            })
        }
        if(error){
            toast({
                type: "error",
                message: "Something went wrong",
                title: "Error",
                duration: 3000,
            })
        }
    }, [error, data])

    const removePaymentMethod = () => {
        props?.entityId && deletePaymentMethod(props.entityId)
        props?.onActionPress && props?.onActionPress()
    }

  return (
    <View style={[styles.container, props?.customStyle]} >
        <View style={styles.cardContainer} >
            <CreditCard
                details={props.details}
                onCardPress={() => setDeleteOption(!deleteOption)}
                paymentType={props.paymentType}
                entityId={props.entityId}
            />
        </View>
        { deleteOption && <View style={{width: "50%"}} >
            <TouchableOpacity  style={styles.buttonStyle}  onPress={removePaymentMethod} >
                {isLoading ? <ActivityIndicator color={theme.colors.primary} size="large" /> :<Text style={styles.titleStyle} >
                    {
                        props.actionTitle
                    }
                </Text>}
                
            </TouchableOpacity>
        </View>}
        
    </View>
  )
}

export default CreditCardWithActions
