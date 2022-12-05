import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BottomTabParamList, ManageResParamList } from '../../../types'
import { makeStyles } from '@rneui/themed'
import HistoryCard from '../../../components/molecules/HistoryCard/HistoryCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { setChosenReservation } from '../../../store/slices/reservationSlice'

type Props = NativeStackScreenProps<ManageResParamList, "ManageResHome">

const useStyles = makeStyles((theme, props: Props)=>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,

  },
  flatListContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20
  }
}))

const ManageResHomeScreen = (props: Props) => {
  const styles = useStyles(props)
  const dispatch = useDispatch()
  const onCardDetailsPress = (index?: number) => {
    props.navigation.navigate("BookingDetails")
    dispatch(setChosenReservation({
      id: 1
    }))
  }
  return (
    <View style={styles.container} >
      <FlatList
      style={styles.flatListContainer}
        data={[1,2,3,4,5]}
        renderItem={(({item})=>(
          <HistoryCard onDetailsPress={onCardDetailsPress} customStyle={{
            marginBottom: 20
          }} />
        ))}
        keyExtractor={(item, index)=>index.toString()}
        
      />
    </View>
  )
}

export default ManageResHomeScreen
