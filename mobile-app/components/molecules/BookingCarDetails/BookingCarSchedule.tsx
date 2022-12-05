import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import CalendarIcon from "../../../assets/icons/calendar.svg"
import ClockIcon from "../../../assets/icons/clock.svg"

interface IProps {

}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props)=>{
    return {
        container: {
            width: "100%",
        },
        topSection: {
            width: "100%",
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5
        },
        topSectionTitle: {
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 16,
            color: theme.colors.grey3,
            marginLeft: 10
        },
        bottomSection: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        bottomSubSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        bottomSubSectionTitle: {
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 16,
            color: theme.colors.black,
            marginLeft: 5
        },
        bottomSubSectionValue: {
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 16,
            color: theme.colors.grey3,
        },
        bottomSubSectionLeft: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginRight: 5
        }
    }
})

const BookingCarSchedule = (props: Props) => {
    const styles = useStyles(props)
  return (
    <ThemeConsumer>
        {({theme})=>(
            <View style={styles.container} >
                <View style={styles.topSection} >
                    <CalendarIcon  
                        width={12}
                        height={12}
                        fill={theme.colors.primary}
                        stroke={theme.colors.primary}
                    />
                    <Text style={styles.topSectionTitle} >
                        23rd November, 2022
                    </Text>
                </View>
                <View style={styles.bottomSection} >
                    <View style={styles.bottomSubSection} >
                        <View style={styles.bottomSubSectionLeft} >
                            <ClockIcon
                                width={12}
                                height={12}
                                fill={theme.colors.primary}
                                stroke={theme.colors.primary}
                            />
                            <Text style={styles.bottomSubSectionTitle} >
                                Pickup Time:
                            </Text>
                        </View>
                        <Text style={styles.bottomSubSectionValue} >
                            10:00 AM
                        </Text>
                    </View>
                    <View style={styles.bottomSubSection} >
                        <View style={styles.bottomSubSectionLeft} >
                            <ClockIcon
                                width={12}
                                height={12}
                                fill={theme.colors.primary}
                                stroke={theme.colors.primary}
                            />
                            <Text style={styles.bottomSubSectionTitle} >
                               Dropoff Time:
                            </Text>
                        </View>
                        <Text style={styles.bottomSubSectionValue} >
                            10:00 AM
                        </Text>
                    </View>
                </View>
            </View>
        )}
    </ThemeConsumer>
    
  )
}

export default BookingCarSchedule
