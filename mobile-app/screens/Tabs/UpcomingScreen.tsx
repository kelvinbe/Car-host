import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedScrollList from '../../components/organisms/AnimatedScrollList/AnimatedScrollList'

const UpcomingScreen = () => {
  return (
    <View style={{
      width: "100%",
      height: "100%",
    }} >
      {/* This is for testing the scroll list, so far it doesnt work, but more changes are being made */}
      <AnimatedScrollList/>
    </View>
  )
}

export default UpcomingScreen

const styles = StyleSheet.create({})