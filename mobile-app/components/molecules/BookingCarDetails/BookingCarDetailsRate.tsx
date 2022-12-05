import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed'

interface IProps {

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
            marginBottom: 5
        },
        sectionTitle: {
            fontWeight: "500",
            fontSize: 14,
            color: theme.colors.black
        },
        sectionValue: {
            fontWeight: "500",
            fontSize: 14,
            color: theme.colors.grey3,
            marginLeft: 5
        }
    }
})

const BookingCarDetailsRate = (props: Props) => {
    const styles = useStyles(props)
  return (
    <View style={styles.container} >
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total Duration: </Text>
            <Text style={styles.sectionValue}>2hrs</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rate</Text>
            <Text style={styles.sectionValue}>$20.00 / hr</Text>
        </View>
    </View>
  )
}

export default BookingCarDetailsRate

const styles = StyleSheet.create({})