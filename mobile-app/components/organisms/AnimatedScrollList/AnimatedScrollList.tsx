import { StyleSheet, Animated, FlatList, View } from 'react-native'
import React, {useRef} from 'react'
import { makeStyles } from '@rneui/themed'
import DriveCardButton from '../../molecules/DriveCardButton/DriveCardButton'
import { useGetVehiclesQuery } from '../../../store/slices/vehiclesSlice';
import Empty from '../../molecules/Feedback/Empty/Empty';
import Loading from '../../molecules/Feedback/Loading/Loading';
import Error from '../../molecules/Feedback/Error/Error';
import { IVehicle } from '../../../types';
import useBookingActions from '../../../hooks/useBookingActions';
import useToast from '../../../hooks/useToast';
import { calcDuration } from '../../../utils/utils';


interface IProps {
    handleSelect?: (vehicle: IVehicle | null) => void,
    items?: any[],
}

type Props = IProps;

const useStyles = makeStyles((theme, props)=>{
    return {
        container: {
            width: "100%",
        }
    }
})

const AnimatedScrollList = (props: Props) => {
    const { data: vehicles, isLoading: vehiclesLoading, error: vehiclesFetchError } = useGetVehiclesQuery("")
    const { bookingDetails: { startDateTime, endDateTime } } = useBookingActions()
    const toast = useToast()
    const styles = useStyles(props)
    const scrollY = useRef(new Animated.Value(0)).current
    const handlePress = (index: number) =>{
        if(startDateTime && endDateTime){
            if(calcDuration(startDateTime, endDateTime) > 0){
                props.handleSelect && props.handleSelect(vehicles ? vehicles[index] : null);
            }else {
                toast({
                    type: "primary",
                    message: "Please select a valid time range",
                    duration: 3000,
                    title: "Invalid time range"
                })
            }
        }else{
            toast({
                type: "primary",
                message: "Please select a valid time range",
                duration: 3000,
                title: "Invalid time range"
            })
        }
        
    }
    

  return (
    <View 
    style={{
        width: "100%",
        height: 240
    }}
    >
    {
        vehiclesLoading ? <Loading/> : vehiclesFetchError ? <Error /> : (
            <Animated.FlatList
                ListEmptyComponent={<Empty emptyText="No vehicles " />}
                style={styles.container}
                removeClippedSubviews
                contentContainerStyle={{
                    marginTop: -40
                }}
                stickyHeaderHiddenOnScroll
                data={vehicles ? [vehicles?.[0],...vehicles, vehicles?.[0]] : []}
                showsVerticalScrollIndicator={false}
                renderItem={
                    ({item, index})=>{
                    
                        const itemSize = 120
                        // -2 -1 0 1
                        const inputRange = [
                            (index -2 ) * itemSize,
                            (index -1 ) * itemSize,
                            index * itemSize,
                            (index +1 ) * itemSize,

                        ]
                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [
                                0.8,
                                1,
                                0.8,
                                1
                            ]  
                        })

                        const translateY = scrollY.interpolate({
                            inputRange,
                            outputRange: [
                                -itemSize *0.7,
                                -itemSize * 0.3,
                                itemSize * 0.3,
                                itemSize * 0.3
                            ]
                        })

                        const opacity = scrollY.interpolate({
                            inputRange,
                            outputRange: [
                                0.8,
                                1,
                                0.8,
                                0
                            ]
                        })

                        return index == 0 ? <View style={{
                            height: itemSize,
                            backgroundColor: "transparent"
                        }} ></View> : index == vehicles?.length + 1  ? (
                            <View style={{
                                height: itemSize,
                                backgroundColor: "transparent"
                            }} ></View>
                        ) : (
                                    <DriveCardButton {...item} onPress={()=>{
                                        handlePress(index)
                                    }} index={index} opacity={opacity} scale={scale} translateY={translateY} customContainerStyle={{
                                        marginBottom: 20
                                    }} />
                        )
                    }
                }
                onScroll={
                    Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: scrollY
                                    }
                                }
                            }
                        ],
                        {
                            useNativeDriver: true
                        }
                    )
                }
            />
        )
    }
    
    </View>
  )

}

export default AnimatedScrollList