import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { makeStyles } from '@rneui/themed'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import TickMarkIcon from "../../../assets/icons/tick-mark.svg"

const useStyles = makeStyles((theme, props)=>({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
        padding:20
    },
    confirmationContainer: {
        width: "100%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        width: "100%",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        backgroundColor: theme.colors.fadedPrimary,
        padding: 30,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    textStyle: {
        color: theme.colors.title,
        fontSize: 14,
        fontWeight: "700",
    }
}))

const BookingConfirmationScreen = () => {
    const styles = useStyles()

  return (
    <View  style={styles.container} >
        <View style={styles.confirmationContainer} >
            <View style={styles.iconStyle} >
                <TickMarkIcon height={30} width={30} />
            </View>
            <Text style={styles.textStyle} >
                Booking Confirmed
            </Text>
        </View>
        <View style={styles.bottomContainer} >
            <Rounded>
                OK
            </Rounded>
        </View>
    </View>
  )
}

export default BookingConfirmationScreen
