import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'


interface IProps {
    openSelectPaymentMethod?: () => void;
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
            justifyContent: "flex-start",
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
        }
    }
})

const BookingCarPaymentInfo = (props: Props) => {
    const styles = useStyles(props)
  return (
    <View style={styles.container} >
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total</Text>
        </View>
        <View style={[styles.section, {justifyContent: "space-between"}]}>
            <Text style={styles.sectionTitle}>$40.00</Text>
            <TouchableOpacity onPress={props.openSelectPaymentMethod} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Select Payment Method</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default BookingCarPaymentInfo

const styles = StyleSheet.create({})