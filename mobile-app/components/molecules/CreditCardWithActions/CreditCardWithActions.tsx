import { Text, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed'
import CreditCard, { CardProps } from '../CreditCard/CreditCard'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  return (
    <View style={styles.container} >
        <View style={styles.cardContainer} >
            <CreditCard
                cardHolderName={props.cardHolderName}
                cardType={props.cardType}
                last4Digits={props.last4Digits}
            />
        </View>
        <View style={{width: "50%"}} >
            <TouchableOpacity  style={styles.buttonStyle}  onPress={props.onActionPress} >
                <Text style={styles.titleStyle} >
                    {
                        props.actionTitle
                    }
                </Text>
                
            </TouchableOpacity>
        </View>
        
    </View>
  )
}

export default CreditCardWithActions
