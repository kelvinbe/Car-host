import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomSheetParamList } from '../../../../types'
import { makeStyles } from '@rneui/themed'
import BookingCarDetails from '../../../molecules/BookingCarDetails/BookingCarDetails'
import { Divider } from '@rneui/base'
import BookingCarSchedule from '../../../molecules/BookingCarDetails/BookingCarSchedule'
import BookingCarDetailsDriver from '../../../molecules/BookingCarDetails/BookingCarDetailsDriver'
import BookingCarDetailsRate from '../../../molecules/BookingCarDetails/BookingCarDetailsRate'
import BookingCarPaymentInfo from '../../../molecules/BookingCarDetails/BookingCarPaymentInfo'
import Rounded from '../../../atoms/Buttons/Rounded/Rounded'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/slices'
import { selectChosenReservation } from '../../../../store/slices/reservationSlice'
import RoundedOutline from '../../../atoms/Buttons/Rounded/RoundedOutline'

interface IProps {
    openAuthorization?: () => void,
    openSelectPaymentMethod?: () => void,
    isReservation?: boolean,
    openCancelReservation?: () => void,
    openModifyReservation?: () => void
}


type Props = IProps;

const useStyles = makeStyles((theme, props)=>{
    return {
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.white
        },
        divider: {
            marginVertical: 20,
            backgroundColor: theme.colors.stroke
        },
        bottomSection: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        }
    }
})

const BookingScreen = (props: Props) => {
  const styles = useStyles(props)
  const chosenReservation = useSelector<RootState>(selectChosenReservation)

  return (
    <View style={styles.container} >
        <BookingCarDetails/>
        <Divider style={styles.divider} />
        <BookingCarSchedule/>
        <Divider style={styles.divider} />
        <BookingCarDetailsDriver hasAuthorizationCode={props?.isReservation} openAuthorizationCode={props.openAuthorization} />
        <Divider style={styles.divider} />
        <BookingCarDetailsRate/>
        <Divider style={styles.divider} />
        <BookingCarPaymentInfo hasLinkedCard={props?.isReservation} openSelectPaymentMethod={props.openSelectPaymentMethod} />
        <Divider style={styles.divider}  />
        {props?.isReservation ? (
            <View style={[styles.bottomSection, {flexDirection: "row", alignItems: "center", justifyContent: "space-around" }]} >
                <RoundedOutline onPress={props?.openCancelReservation} width="45%" >
                    Cancel
                </RoundedOutline>
                <Rounded onPress={props?.openModifyReservation} width="45%" >
                    Modify
                </Rounded>
            </View>
            ) : <View style={styles.bottomSection} >
            <Rounded disabled >
                Book Now
            </Rounded>
        </View>}
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({})