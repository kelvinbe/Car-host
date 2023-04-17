import { StyleSheet, Animated, FlatList, View } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
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
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../store/store';
import { selectChosenHostCode, selectUsersLocation } from '../../../store/slices/bookingSlice';
import { isEmpty } from 'lodash';


interface IProps {
    handleSelect?: (vehicle: IVehicle | null) => void,
    items?: any[],
}

type Props = IProps

const useStyles = makeStyles((theme, props)=>{
    return {
        container: {
            width: "100%",
        }
    }
})

const AnimatedScrollList = (props: Props) => {
    const usersLocation = useAppSelector(selectUsersLocation)
    const chosenHostCode = useAppSelector(selectChosenHostCode)
    const { bookingDetails: { start_date_time, end_date_time} } = useBookingActions()
    const { data, isLoading, isError } = useGetVehiclesQuery({
        longitude: usersLocation?.coords?.longitude.toString() ?? undefined,
        latitude: usersLocation?.coords?.latitude.toString() ?? undefined,
        host_code: !isEmpty(chosenHostCode) ? chosenHostCode : undefined,
        start_date_time: !isEmpty(start_date_time) ? start_date_time : undefined,
        end_date_time: !isEmpty(end_date_time) ? end_date_time : undefined,
    }, {
        refetchOnFocus: true
    })
    const toast = useToast()
    const styles = useStyles(props)
    const scrollY = useRef(new Animated.Value(0)).current


    const handlePress = (index: number) =>{
        if(start_date_time && end_date_time){
            if(calcDuration(start_date_time, end_date_time) > 0){
                props.handleSelect && props.handleSelect(data ? data[index] : null);
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
        isLoading ? <Loading/> : isError ? <Error /> : isEmpty(data) ? <Empty
            emptyText={
                new Date(end_date_time).getTime() === new Date(start_date_time).getTime() ? 'Adjust your time range to see available vehicles' :
                'No vehicles available'
            }
        /> : (
            <Animated.FlatList
                ListEmptyComponent={<Empty emptyText="No vehicles " />}
                style={styles.container}
                removeClippedSubviews
                contentContainerStyle={{
                    marginTop: -40
                }}
                keyExtractor={(item, index)=>index.toString()}
                stickyHeaderHiddenOnScroll
                data={data ? [data?.[0],...data, data?.[0]] : []}
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
                        }} ></View> : index == (data?.length ?? 0) + 1  ? (
                            <View style={{
                                height: itemSize,
                                backgroundColor: "transparent"
                            }} ></View>
                        ) : (
                            isLoading ? <Loading /> :  <DriveCardButton key={index} {...item} onPress={()=>{
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