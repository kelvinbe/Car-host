import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { makeStyles } from '@rneui/themed'
import Dropdown from '../Dropdown/Dropdown'


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
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    dropdown: {
        width: "48%",
        position: "absolute",
        top: 0
    }
}))

const days = [
    {
        label: "Today",
        value: "today"
    },
    {
        label: "Tomorrow",
        value: "tomorrow"
    },
    {
        label: "Wednesday",
        value: "wednesday"
    }
]
const times = [
    {
        label: "03:30",
        value: "330"
    },
    {
        label: "05:30",
        value: "530"
    },
    {
        label: "06:30",
        value: "0630"
    }
]

const TimeFilter = () => {
    const styles = useStyles()
    const [viewDropdown, setViewDropdown] = useState(false)
    const handleDayChange = (value: string) => {
        // console.log(value)
    }

    const handlePickupTime = (value: string) => {
        // console.log(value)
    }

    const handleDropOffTime = (value: string) => {
        // console.log(value)
    }
  return (
    <View style={styles.container} >
            <Dropdown dropdownOpen={setViewDropdown} items={days} onChange={handleDayChange} />
              <View style={[styles.bottomDropdowns, {display: !viewDropdown ? "flex" : "none" }]} >
                <View style={[styles.dropdown, {left: 0}]} >
                    <Dropdown items={times} onChange={handlePickupTime} additionlText="AM" />
                </View>
                <View style={[styles.dropdown, {right: 0}]} >
                    <Dropdown items={times} onChange={handleDropOffTime} additionlText="AM" />
                </View>
            </View>
    </View>
  )
}

export default TimeFilter

const styles = StyleSheet.create({})