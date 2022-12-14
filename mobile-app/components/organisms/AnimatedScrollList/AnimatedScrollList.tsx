import { StyleSheet, Animated, FlatList, View } from 'react-native'
import React, {useRef} from 'react'
import { makeStyles } from '@rneui/themed'
import DriveCardButton from '../../molecules/DriveCardButton/DriveCardButton'


interface IProps {
    handleSelect?: (index: number) => void,
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

    const styles = useStyles(props)
    const scrollY = useRef(new Animated.Value(0)).current

    const handlePress = (index: number) =>{
        props.handleSelect && props.handleSelect(index);
    }

  return (
    <View 
    style={{
        width: "100%",
        height: 240
    }}
    >

    <Animated.FlatList
        style={styles.container}
        removeClippedSubviews
        contentContainerStyle={{
            marginTop: -40
        }}
        stickyHeaderHiddenOnScroll
        data={[1,2,3,4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
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
                }} ></View> : index == 19 ? (
                    <View style={{
                        height: itemSize,
                        backgroundColor: "transparent"
                    }} ></View>
                ) : (
                        
                            <DriveCardButton onPress={()=>{
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
    </View>
  )

}

export default AnimatedScrollList