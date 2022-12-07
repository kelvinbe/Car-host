import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed'
import CreditCard, { CardProps } from '../CreditCard/CreditCard'
import RoundedOutline from '../../atoms/Buttons/Rounded/RoundedOutline';
import { Button } from '@rneui/base';

interface IProps {
    onActionPress?: () => void,
    actionTitle?: string
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
        paddingTop: 13,
        paddingHorizontal:  20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: theme.colors.primary,
        width: "60%",
        marginTop: 10,

    },
    titleStyle: {
        color: theme.colors.primary,
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "Lato_700Bold",
        lineHeight: 24,
        textAlign: "center",
        width: '100%',
    }
}))

const CreditCardWithActions = (props: Props) => {
    const styles = useStyles()
  return (
    <View style={styles.container} >
        <View style={styles.cardContainer} >
            <CreditCard
                cardHolderName={props.cardHolderName}
                cardType={props.cardType}
                last4Digits={props.last4Digits}
            />
        </View>
        <Button type="outline" buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} onPress={props.onActionPress} >
            {
                props.actionTitle
            }
        </Button>
    </View>
  )
}

export default CreditCardWithActions
