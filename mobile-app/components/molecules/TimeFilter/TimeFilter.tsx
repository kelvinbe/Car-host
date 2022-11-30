import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@rneui/themed'
import Dropdown from '../Dropdown/Dropdown'
import dayjs from 'dayjs'


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

const TimeFilter = () => {
    const styles = useStyles()
    const [viewDropdown, setViewDropdown] = useState(false)
    const [days, setDays] = useState([])
    const [times, setTimes] = useState([])
    const [additionalFilter, setAdditionalFilter] = useState([])
    const handleDayChange = (value: string | string[]) => {
        // console.log(value)
    }

    const handlePickupTime = (value: string | string[]) => {
        // console.log(value)
    }

    const handleDropOffTime = (value: string | string[]) => {
        // console.log(value)
    }

    useEffect(()=>{
        const _days = [...Array(7).keys()].map((day, index)=>{
            return {
                label: dayjs(new Date()).add(index, "day").format("dddd"),
                value: dayjs(new Date()).add(index, "day").format("dddd")
            }
        })

        const _times = [...Array(48).keys()].map((time, index)=>{
            return {
                label: dayjs(dayjs(new Date()).format("hh")).add(index * 30, "minutes").format("hh:mm A")?.replace("AM", "")?.replace("PM", ""),
                value: dayjs(dayjs(new Date()).format("hh")).add(index * 30, "minutes").format("hh:mm A")?.replace("AM", "")?.replace("PM", ""),
                index
            }
        })
        
        console.log(dayjs(new Date()).format("HH"))
        const _additionalFilter = [
            dayjs(Date.now()).format("A"),
            dayjs(Date.now()).format("A") === "AM" ? "PM" : "AM"
        ]
        setAdditionalFilter(()=>_additionalFilter as any)
        setDays(()=>_days as any)
        setTimes(()=>_times as any)
    },[ ])
  return (
    <View style={styles.container} >
            <Dropdown dropdownOpen={setViewDropdown} items={days} onChange={handleDayChange} />
              <View style={[styles.bottomDropdowns, {display: !viewDropdown ? "flex" : "none" }]} >
                <View style={[styles.dropdown]} >
                    <Dropdown items={times} onChange={handlePickupTime} additionalFilter={additionalFilter} />
                </View>
                <View style={[styles.dropdown]} >
                    <Dropdown items={times} onChange={handleDropOffTime} additionalFilter={additionalFilter} />
                </View>
            </View>
    </View>
  )
}

export default TimeFilter

const styles = StyleSheet.create({})