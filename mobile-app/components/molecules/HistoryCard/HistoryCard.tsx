import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import LocationIcon from "../../../assets/icons/location.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";
import ClockIcon from "../../../assets/icons/clock.svg";
import { Divider, Image } from '@rneui/base';
import { IReservation } from '../../../types';
import dayjs from 'dayjs';

interface IProps {
  customStyle?: StyleProp<ViewStyle>,
  onDetailsPress?: (reservationId: string) => void;
}

type Props = IProps & IReservation;

const useStyles = makeStyles((theme, props: Props)=>({
    container: {
        padding: 20,
        borderRadius: 15,
        borderColor: theme.colors.stroke,
        borderWidth: 1,
        width: "100%"
    },
    topSection: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    date: {
      flexDirection: "row",
      alignItems :"center",
      justifyContent: "flex-start"
    },
    dateText: {
      color: theme.colors.grey3,
      fontWeight: "500", fontFamily: "Lato_400Regular",
      fontSize: 14,
      marginLeft: 10
    },
    link: {
      color: theme.colors.link,
      fontSize: 12,
      fontWeight: "500", fontFamily: "Lato_400Regular",
    },
    divider: {
      width: "100%",
      backgroundColor: theme.colors.stroke,
      marginVertical: 10
    },
    rideInfo: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    rideInfoLeft: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    vehicle: {
      width: 70,
      height: 70,
      borderRadius: 15,
      borderColor: theme.colors.stroke,
      overflow: "hidden",
      marginRight: 10
    },
    vehicleImage: {
      width: 70,
      height: 70,
      resizeMode: "contain"
    },
    vehicleInfo: {
      alignItems: "flex-start",
      justifyContent: "center",
      
    },
    vehicleName: {
      fontSize: 14,
      fontWeight: "700", 
 fontFamily: "Lato_700Bold",
      color: theme.colors.black,
    },
    driverInfo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginVertical: 5
    },
    driverImage: {
      width: 24,
      height: 24,
      borderRadius: 12,
      overflow: "hidden",
      marginRight: 10
    },
    driverName: {
      fontSize: 12,
      fontWeight: "700", 
 fontFamily: "Lato_700Bold",
      color: theme.colors.black,
    },
    locationInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    locationIcon: {
      width: 10,
      height: 7,
      color: theme.colors.grey3,
    },
    locationInfo: {
      fontSize: 12,
      fontWeight: "500", fontFamily: "Lato_400Regular",
      color: theme.colors.grey3,
      marginLeft: 10
    },
    ridePrice: {
      alignItems: "flex-end",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: "700", 
 fontFamily: "Lato_700Bold",
      color: theme.colors.black
    },
    rideTimeInfoContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    rideTimeInfo: {
      alignItems: "flex-start",
      justifyContent: "center",
      width: '50%'
    },
    rideTimeTitleInfoContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    rideTimeInfoTitle: {
      fontSize: 14,
      fontWeight: "500", fontFamily: "Lato_400Regular",
      color: theme.colors.black,
      marginLeft: 5
    },
    rideTimeInfoValue: {
      fontSize: 14,
      fontWeight: "700", 
 fontFamily: "Lato_700Bold",
      color: theme.colors.grey3,
      marginTop: 10
    }

}))

const HistoryCard = (props: Props) => {
  const { endDateTime, hostId, locationAddress, marketName, reservationId, startDateTime, status, total, vehicleId, vehicleMake, vehicleModel, vehiclePicUrl, customStyle, onDetailsPress } = props
  const styles = useStyles(props);

  const onPress = () =>{
    onDetailsPress && onDetailsPress(reservationId);
  }

  return (
    <ThemeConsumer>
      {({theme})=>(
         <TouchableOpacity
            style={[styles.container, props.customStyle]}
          >
            <View
              style={styles.topSection}
            >
              <View
                style={styles.date}
              >
                <CalendarIcon stroke={theme.colors.primary} fill={theme.colors.primary} width={12} height={12} color={theme.colors.primary}  /> 
                <Text style={styles.dateText} > 
                  {
                    dayjs(startDateTime).format("DD MMM YYYY")
                  }
                </Text>
              </View>
              <TouchableOpacity onPress={onPress} >
                <Text  style={styles.link}>
                    Details
                </Text>
              </TouchableOpacity>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.rideInfo} >
              <View style={styles.rideInfoLeft} >
                  <View style={styles.vehicle} > 
                    <Image style={styles.vehicleImage} 
                      source={{
                        uri: vehiclePicUrl
                      }}
                    />
                  </View>
                  <View style={styles.vehicleInfo} >
                    <Text style={styles.vehicleName} >
                      {vehicleMake} {vehicleModel}
                    </Text>
                    <View style={styles.driverInfo} >
                      <Image 
                        style={styles.driverImage}
                        source={require("../../../assets/images/driver.png")}
                      />
                      <Text style={styles.driverName} >
                        Jesse
                      </Text>
                    </View>
                    <View style={styles.locationInfoContainer} >
                      <LocationIcon stroke={theme.colors.stroke} style={styles.locationIcon} />
                      <Text style={styles.locationInfo} >
                        21964 Jim Rosa Lane, SF
                      </Text>
                    </View>

                  </View>
                  <Text style={styles.ridePrice} >
                    ${total}
                  </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.rideTimeInfoContainer} >
              <View style={styles.rideTimeInfo} >
                <View style={styles.rideTimeTitleInfoContainer} >
                  <ClockIcon width={12} height={12} fill={theme.colors.primary}  />
                  <Text style={styles.rideTimeInfoTitle} >
                    Pickup Time:
                  </Text>
                </View>
                <Text style={styles.rideTimeInfoValue} >
                  {
                    dayjs(startDateTime).format("hh:mm A")
                  }
                </Text>
              </View>
              <View style={styles.rideTimeInfo} >
                <View style={styles.rideTimeTitleInfoContainer} >
                  <ClockIcon width={12} height={12} fill={theme.colors.primary}  />
                  <Text style={styles.rideTimeInfoTitle} >
                    Dropoff Time:
                  </Text>
                </View>
                <Text style={styles.rideTimeInfoValue} >
                  {
                    dayjs(endDateTime).format("hh:mm A")
                  }
                </Text>
              </View>
            </View>
          </TouchableOpacity>
      )}
    </ThemeConsumer>
   
  )
}

export default HistoryCard

const styles = StyleSheet.create({})