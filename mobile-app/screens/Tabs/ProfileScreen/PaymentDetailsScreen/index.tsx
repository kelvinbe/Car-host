import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaymentDetailsScreenParamList } from '../../../../types';
import PaymentDetailsScreenHome from './PaymentDetailsScreenHome';
import TopBar from '../TopBar/TopBar';
import MpesaDetails from './MpesaDetails';
import BaseTopBar from '../../../../navigation/TopBar/BaseTopBar';

const PaymentDetailsScreenStackNavigator = createNativeStackNavigator<PaymentDetailsScreenParamList>();

const useStyles = makeStyles((theme, props)=>({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white
    }
}))

const PaymentDetailsScreen = () => {
    const styles = useStyles()
  return (
    <ThemeConsumer>
        {({ theme }) => (
                <PaymentDetailsScreenStackNavigator.Navigator initialRouteName="PaymentDetailsScreenHome" >
                    <PaymentDetailsScreenStackNavigator.Screen options={{
                        headerShown: true,
                        header: (props) => <BaseTopBar {...props} title="Payment" home={false} chevronLeft />
                    }} name="PaymentDetailsScreenHome" component={PaymentDetailsScreenHome} />
                    <PaymentDetailsScreenStackNavigator.Screen options={{
                       headerShown: true,
                       header: (props) => <BaseTopBar {...props} title="Mpesa" home={false} chevronLeft />
                    }} name="MPesaDetailsScreen" component={MpesaDetails} />
                </PaymentDetailsScreenStackNavigator.Navigator>
        )}
    </ThemeConsumer>
  )
}

export default PaymentDetailsScreen
