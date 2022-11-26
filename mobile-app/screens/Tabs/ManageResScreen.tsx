import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '../../types'
import { makeStyles } from '@rneui/themed'
import HistoryCard from '../../components/molecules/HistoryCard/HistoryCard'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = BottomTabScreenProps<BottomTabParamList, "ManageRes">

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

const ManageRes = (props: Props) => {
  const styles = useStyles(props)
  return (
    <View style={styles.container} >
      <FlatList
      style={styles.flatListContainer}
        data={[1,2,3,4,5]}
        renderItem={(({item})=>(
          <HistoryCard customStyle={{
            marginBottom: 20
          }} />
        ))}
        keyExtractor={(item, index)=>index.toString()}
        
      />
    </View>
  )
}

export default ManageRes
