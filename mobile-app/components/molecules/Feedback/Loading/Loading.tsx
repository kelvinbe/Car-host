import { View, ActivityIndicator, Text} from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'

interface IProps {
    size?: number | "small" | "large" | undefined
}

type Props = IProps;

const useStyles = makeStyles((theme, props)=>{
    return {
        container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.white
        },
        loadingText: {
            color: theme.colors.black,
            fontSize: 14,
            fontWeight: "700",
            marginTop: 10

        }
    }
})

const Loading = (props: Props) => {
    const styles = useStyles(props)
  return (
    <ThemeConsumer>
        {({theme})=>(
            <View style={styles.container} >
                <ActivityIndicator
                    color={theme.colors.primary}
                    size={props.size || "large"}
                    animating
                />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )}
    </ThemeConsumer>
    
  )
}

export default Loading
