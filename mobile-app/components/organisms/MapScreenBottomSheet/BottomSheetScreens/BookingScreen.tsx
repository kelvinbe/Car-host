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

interface IProps {
    openAuthorization?: () => void,
    openSelectPaymentMethod?: () => void,
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

  return (
    <View style={styles.container} >
        <BookingCarDetails/>
        <Divider style={styles.divider} />
        <BookingCarSchedule/>
        <Divider style={styles.divider} />
        <BookingCarDetailsDriver openAuthorizationCode={props.openAuthorization} />
        <Divider style={styles.divider} />
        <BookingCarDetailsRate/>
        <Divider style={styles.divider} />
        <BookingCarPaymentInfo openSelectPaymentMethod={props.openSelectPaymentMethod} />
        <Divider style={styles.divider}  />
        <View style={styles.bottomSection} >
            <Rounded disabled >
                Book Now
            </Rounded>
        </View>
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({})