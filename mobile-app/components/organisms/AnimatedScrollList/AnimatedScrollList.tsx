import { StyleSheet, Animated, FlatList, View } from 'react-native'
import React, {useRef} from 'react'
import { makeStyles } from '@rneui/themed'
import DriveCardButton from '../../molecules/DriveCardButton/DriveCardButton'


interface IProps {

}

type Props = IProps;

const useStyles = makeStyles((theme, props)=>{
    return {
        container: {
            width: "100%",
            padding: 20,
        }
    }
})

const AnimatedScrollList = (props: Props) => {

    const styles = useStyles(props)
    const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View 
    style={{
        width: "100%",
        height: 360
    }}
    >

    <Animated.FlatList
        style={styles.container}
        data={[1,2,3,4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
        renderItem={
            ({item, index})=>{
               
                const itemSize = 120
                const inputRange = [
                    -1,
                    0,
                    itemSize * index,
                    itemSize * (index + 2)
                ]
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: [
                        0,
                        1,
                        1,
                        0
                    ]  
                })
                
                return (
                    <Animated.View 
                        style={{
                            transform: [{scale}]
                        }}
                    >
                        <DriveCardButton  customContainerStyle={{
                            marginBottom: 20
                        }} />
                    </Animated.View>
                    
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
    </View>
  )

}

export default AnimatedScrollList