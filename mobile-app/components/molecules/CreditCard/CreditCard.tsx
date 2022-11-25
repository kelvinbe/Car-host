import { Image, Text } from '@rneui/base';
import { makeStyles } from '@rneui/themed'
import React from 'react'
import { TouchableOpacity, View } from "react-native"

interface IProps {
    cardHolderName?: string;
    last4Digits?: string;
    cardType?: "visa" | "mastercard" | "americanexpress" | "discover" | "dinersclub" | "jcb" | "unionpay" | "maestro" | "unknown";
}

export type CardProps = IProps;

const useStyles = makeStyles((theme, props: CardProps)=> {
    return ({
        container: {

        },
        creditCardContainer: {
            backgroundColor: theme.colors.background3,
            paddingVertical: 18,
            paddingHorizontal: 20,
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            elevation: 2,
            width: "100%"
        },
        creditCardName: {
            color: theme.colors.black,
            fontSize: 17,
            fontWeight: "700",
        },
        rightSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        creditCardIcon: {
            width: 32,
            height: 24,
            marginRight: 10
        },
        textStyle: {
            fontSize: 13,
            color: theme.colors.black,
            fontWeight: "700",

        }
    })
})

function CreditCard(props: CardProps) {
    const { cardHolderName, cardType, last4Digits } = props;
    const styles = useStyles(props)
  return (
    <TouchableOpacity style={styles.creditCardContainer} >
        <Text style={styles.creditCardName} >
            { cardHolderName }
        </Text>
        <View style={styles.rightSection} >
            {/* 
                @todo: add card type icons
            */}
            <Image
                source={require("../../../assets/images/visa.png")}
                style={styles.creditCardIcon}
            />
            <Text style={styles.textStyle} >
                ****{last4Digits}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default CreditCard