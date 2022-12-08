import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { makeStyles } from '@rneui/themed'
import React from 'react'
import { PaymentDetailsScreenParamList } from '../../../../types';
import { View } from "react-native"
import CreditCardWithActions from '../../../../components/molecules/CreditCardWithActions/CreditCardWithActions';
import { Divider, Text } from '@rneui/base';
import ActionButton from '../../../../components/atoms/Buttons/ActionButton/ActionButton';
import Rounded from '../../../../components/atoms/Buttons/Rounded/Rounded';

interface IProps {

}

type Props = IProps & NativeStackScreenProps<PaymentDetailsScreenParamList, "PaymentDetailsScreenHome"> ;

const useStyles = makeStyles((theme, props: Props)=>({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 30
    },
    contentContainer: {
        width: "90%",
        height: "80%"
    },
    bottomContainer: {
        width: "90%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    divider: {
        width: "100%",
        backgroundColor: theme.colors.stroke,
        marginBottom: 20,
        marginTop: 30
    },
    headerTitle: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "700"
    }
}))

function PaymentDetailsScreenHome(props: Props) {
    const styles = useStyles(props)
    const goToMPesa = ( ) => {
        props.navigation.navigate("MPesaDetailsScreen")
    }

    const addCard = () => {
        props.navigation.navigate("AddCardScreen")
    }
  return (
    <View style={styles.container} >
        <View style={styles.contentContainer} >
            <CreditCardWithActions
                cardType={"visa"} 
                last4Digits={"1234"} 
                cardHolderName={"Sarah Lane"}
                actionTitle={"Remove Card"}
            />
            <Divider style={styles.divider} />
            <Text style={styles.headerTitle} >
                Other Methods
            </Text>
            <ActionButton onPress={goToMPesa} title={"M-PESA"} />
        </View>
        <View style={styles.bottomContainer} >
            <Rounded onPress={addCard} >
                Add Card
            </Rounded>
        </View>
    </View>
  )
}

export default PaymentDetailsScreenHome