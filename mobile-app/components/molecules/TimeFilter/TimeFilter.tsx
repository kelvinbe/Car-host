import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@rneui/themed'
import Dropdown from '../Dropdown/Dropdown'
import dayjs from 'dayjs'
import { isArray } from 'lodash'
import { daysOfTheWeekFromToday, isAm, timeTilEndOfDay, timeTilEndOfNewDay } from '../../../utils/utils'


type Props ={
    customStyles?: StyleProp<ViewStyle>,
    setStartDateTime?: (date: string) => void,
    setEndDateTime?: (date: string) => void,
}

const useStyles = makeStyles((theme)=>({
    container: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0
    },
    bottomDropdowns: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 10,
        elevation: 5
    },
    dropdown: {
        width: "48%",
    }
}))

const TimeFilter = (props: Props) => {
    const styles = useStyles(props)
    const [viewDayDropdown, setViewDayDropdown] = useState<boolean>(false)
    const [chosenDay, setChosenDay] = useState(0)
    const [times, setTimes] = useState<{label: string, value: string }[]>([])

    const handlePickupTime = (v: any) => {
        props.setStartDateTime && props.setStartDateTime(dayjs(v?.[0]).toISOString())
    }

    const handleDropOffTime = (v: any) => {
        props.setEndDateTime && props.setEndDateTime(dayjs(v?.[0]).toISOString())
    }

    useEffect(()=>{
        if(chosenDay === 0){
            setTimes(()=>timeTilEndOfDay() as any)
        }else{
            setTimes(()=>timeTilEndOfNewDay(chosenDay) as any)
        }
    }, [chosenDay])

  return (
    <View style={[styles.container, props.customStyles]} >
            <Dropdown key={times?.length} dropdownOpen={setViewDayDropdown} defaultValue={daysOfTheWeekFromToday()?.[0]?.label} items={daysOfTheWeekFromToday()} onChange={(v)=>{
                    setChosenDay(v as any)
            }} />
              <View style={[styles.bottomDropdowns, {display: !viewDayDropdown ? "flex" : "none" }]} >
                <View style={[styles.dropdown]} >
                    <Dropdown key={times?.length}  items={times} onChange={handlePickupTime} defaultValue={times?.[0]?.label} defaultAdditionalFilter={isAm(times?.[0]?.value) ? "AM" : "PM"} additionalFilter={["AM", "PM"]} />
                </View>
                <View style={[styles.dropdown]} >
                    <Dropdown key={times?.length} items={times} onChange={handleDropOffTime} defaultValue={times?.[0]?.label} defaultAdditionalFilter={isAm(times?.[0]?.value) ? "AM" : "PM"} additionalFilter={["AM", "PM"]} />
                </View>
            </View>
    </View>
  )
}

export default TimeFilter

const styles = StyleSheet.create({})