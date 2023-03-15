import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { makeStyles } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UserOnboardingParamList } from '../../../types'
import { CardForm } from '@stripe/stripe-react-native'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import { isNull } from 'lodash'
import AppCardForm from '../../../components/organisms/Forms/PaymentMethods/Card'
import useOnBoarding from '../../../hooks/useOnBoarding'


type Props = NativeStackScreenProps<UserOnboardingParamList, "SelectedPaymentMethod">

const useStyles = makeStyles((theme)=>{
    return {
        container: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            paddingTop: 40
        },
        labelText: {
            color: theme.colors.title,
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Lato_400Regular',
            marginVertical: 20
        },
        topContainer: {
            width: "100%",

        },
        bottomContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        }
    }
})

/**
 * @note for the onboarding flow, only the card details need to be collected, other payment
 *         methods will be added later
 * 
 */
const SelectedPaymentMethod = (props: Props) => {
  const styles = useStyles()
  const [details, setDetails] = useState<any>(null)
  const { setPaymentMethod } = useOnBoarding()

  const handlePress = () => {
    setPaymentMethod({
        type: "card",
        card: details
    })
    props.navigation.navigate("SelectPaymentMethod",
    {
        payment_method_added: true
    })
  }

  return (
    <View style={styles.container} >
        
        <View style={styles.topContainer} >
            <Text style={styles.labelText}>Card Details</Text>
            <AppCardForm
                onCardAdded={setDetails}
                customStyles={{
                    paddingVertical: 20
                }}
            />
        </View>
        <View style={styles.bottomContainer} >
            <Rounded
                disabled={
                    isNull(details)
                }
                onPress={handlePress}
            >
                Done
            </Rounded>
        </View>
        

    
    </View>
  )
}

export default SelectedPaymentMethod