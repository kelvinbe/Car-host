import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { Image } from '@rneui/base';
import LocationIcon from "../../../assets/icons/location.svg"
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
    openAuthorizationCode?: () => void;
}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props)=>{
    return {
        container: {
            width: "100%"
        },
        driverInfo: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 5
        },
        driverPicContainer: {
            width: 30,
            height: 30,
            borderRadius: 15,
            overflow: "hidden",
        },
        driverPic: {
            width: 30,
            height: 30,
        },
        driverName: {
            fontWeight: "700",
            fontSize: 14,
            textAlign: "left",
            marginLeft: 5,
            color: theme.colors.black
        },
        locationInfoContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 5
        },
        locationInfoTitle: {
            fontWeight: "500",
            fontSize: 14,
            color: theme.colors.grey3
        },
        authCodeContainer: {
            width: "100%",
            flexDirection: "row",   
            alignItems: "center",
            justifyContent: "flex-start",
        },
        authCodeTitle: {
            fontWeight: "500",
            fontSize: 14,
            color: theme.colors.black,
            marginRight: 5
        },
        authCodeButton: {
            borderBottomWidth: 1,
            borderColor: theme.colors.link,
            alignItems: "center",
            justifyContent: "center",
        },
        authCodeButtonText: {
            fontWeight: "500",
            fontSize: 14,
            color: theme.colors.link
        }
    }
})

const BookingCarDetailsDriver = (props: Props) => {
    const styles = useStyles(props)
  return (
    <ThemeConsumer>
        {({theme})=>(
            <View style={styles.container} >
                <View style={styles.driverInfo}>
                    <View style={styles.driverPicContainer}>
                        <Image style={styles.driverPic} source={require("../../../assets/images/driver.png")} />
                    </View>
                    <Text style={styles.driverName}>Jesse</Text>
                </View>
                <View style={styles.locationInfoContainer}>
                    <LocationIcon 
                        width={12}
                        height={12}
                        fill={theme.colors.primary}
                        stroke={theme.colors.primary}
                        style={{
                            marginRight: 10
                        }}
                    />
                    <Text style={styles.locationInfoTitle}>21964 Jim Rosa Lane, SF</Text>
                </View>
                <View style={styles.authCodeContainer} >
                    <Text style={styles.authCodeTitle}>Authorization Code:</Text>
                    <TouchableOpacity onPress={props?.openAuthorizationCode} style={styles.authCodeButton} >
                        <Text style={styles.authCodeButtonText}>Enter here</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        )}
    </ThemeConsumer>
    
  )
}

export default BookingCarDetailsDriver
