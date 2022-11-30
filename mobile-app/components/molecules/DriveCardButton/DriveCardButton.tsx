import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { Image } from '@rneui/base'
import LocationDirection from "../../../assets/icons/direction.svg"

interface IProps {
    customContainerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

type Props = IProps

const useStyles = makeStyles((theme, props: Props)=>{
    return {
        container: {
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.white,
            borderRadius: 15,
            elevation: 4,
            width: "100%"
        },
        carImageContainer: {
            width: 80,
            height: 80,
            marginRight: 10
        },
        carImage: {
            width: 80,
            height: 80,
        },
        leftContainer:{ 
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        driveInfoContainer: {
            alignItems: "flex-start",
            justifyContent: "center"
        },
        driveInfoText: {
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 5
        },
        driverInfoContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 5
        },
        driverAvatarStyle: {
            width: 30,
            height: 30,
        },
        driverNameText: {
            fontWeight: "700",
            fontSize: 14,
            textAlign: "left",
            marginLeft: 5
        },
        locationContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        locationIconStyle: {
            marginRight: 5
        },
        locationText: {
            fontWeight: "600",
            fontSize: 12,
            textAlign: "left",
        },
        amountStyle: {
            fontWeight: "700",
            fontSize: 16,
        }
    }
})

const DriveCardButton = (props: Props) => {

  const styles = useStyles()

  return (
    <ThemeConsumer>
        {({theme})=>(
            <TouchableOpacity onPress={props.onPress} style={[styles.container, props.customContainerStyle ]} >
                <View style={styles.leftContainer} >
                    <View style={styles.carImageContainer} >
                        <Image style={styles.carImage} source={require("../../../assets/images/car.png")} />
                    </View>
                    <View style={styles.driveInfoContainer} >
                        <Text style={styles.driveInfoText} >
                            PROTON-X70
                        </Text>
                        <View style={styles.driverInfoContainer} >
                            <View style={styles.driverAvatarStyle} >
                                <Image style={styles.driverAvatarStyle} source={require("../../../assets/images/driver.png")} />
                            </View>
                            <Text style={styles.driverNameText} >
                                Jesse
                            </Text>
                        </View>
                        <View style={styles.locationContainer} >
                            <LocationDirection 
                                height={12}
                                width={12}
                                style={styles.locationIconStyle}
                            />
                            <Text style={styles.locationText} >
                                2km
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.amountStyle} >
                    $5.00/hr
                </Text>
            </TouchableOpacity>
        )}
    </ThemeConsumer>
    
  )
}

export default DriveCardButton
