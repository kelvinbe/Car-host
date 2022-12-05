import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import VisaIcon from "../../../assets/icons/visa.svg"


interface IProps {
    openSelectPaymentMethod?: () => void;
    hasLinkedCard?: boolean;
}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props)=>{
    return {
        container: {
            width: "100%"
        },
        section: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        sectionTitle: {
            fontWeight: "500",
            fontSize: 14,
            color: theme.colors.black
        },
        actionButton: {
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary
        },
        actionButtonText: {
            fontWeight: "500",
            fontSize: 14,
            color: theme.colors.primary
        },
        paymentInfoContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        textInfo: {
            fontSize: 13,
            fontWeight: "700",
            color: theme.colors.black,
            marginLeft: 10
        }
    }
})

const BookingCarPaymentInfo = (props: Props) => {
    const styles = useStyles(props)
  return (
    <ThemeConsumer>
        {({theme})=>(
            <View style={styles.container} >
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Total</Text>
                    { props?.hasLinkedCard && <TouchableOpacity onPress={props.openSelectPaymentMethod} style={[styles.actionButton, , {borderBottomColor: theme.colors.link}]}>
                        <Text style={[styles.actionButtonText, {color: theme.colors.link}]}>Change</Text>
                    </TouchableOpacity>}
                </View>
                <View style={[styles.section, {justifyContent: "space-between"}]}>
                    <Text style={styles.sectionTitle}>$40.00</Text>
                    { !props.hasLinkedCard && <TouchableOpacity onPress={props.openSelectPaymentMethod} style={[styles.actionButton]}>
                        <Text style={styles.actionButtonText}>Select Payment Method</Text>
                    </TouchableOpacity>}

                    {
                        props?.hasLinkedCard && <View style={styles.paymentInfoContainer}>
                            <VisaIcon
                                width={32}
                                height={24}
                            />
                            <Text style={styles.textInfo}>****3704</Text>
                        </View>
                    }
                </View>
            </View>
        )}
    </ThemeConsumer>
    
  )
}

export default BookingCarPaymentInfo

const styles = StyleSheet.create({})