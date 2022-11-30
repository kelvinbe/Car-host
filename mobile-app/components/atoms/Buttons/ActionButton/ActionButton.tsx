import { Text, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { Icon, Image } from '@rneui/base'
import ChevronRight from "../../../../assets/icons/chevron-right.svg"

interface IProps {
    image?: ReactNode;
    title?: string;
    onPress?: () => void;
    customStyle?: StyleProp<ViewStyle>,
    raised?: boolean
}

type Props = IProps

const useStyles = makeStyles((theme, props: Props)=>({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        borderWidth: 1,
        borderColor: theme.colors.stroke,
        padding: 10,
        borderRadius: 10
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 40
    },
    actionImage: {
        width: 40,
        height: 40,
    },
    actionTextStyle: {
        fontSize: 15,
        color: theme.colors.black,
        fontWeight: "600",
        marginLeft: 10
    },
    buttonIcon: {
        width: 10,
        height: 10,
    }
}))

const ActionButton = (props: Props) => {
    const { image, title, onPress } = props;
    const styles = useStyles(props)
  return (
    <ThemeConsumer>
        {({theme})=>(
            <TouchableOpacity onPress={onPress} style={[styles.buttonContainer,props.customStyle]} > 
                <View style={styles.leftSection} >
                    {/* 
                        @todo: add functionality to switch between images
                    */}
                    {image ? image :<Image 
                        source={require("../../../../assets/images/mpesa.png")}
                        style={styles.actionImage}
                    />}
                    <Text style={styles.actionTextStyle} >
                        { title }
                    </Text>
                </View>
                {/* <Icon
                    name="chevron-right"
                    type='font-awesome'
                    color={theme.colors.stroke}
                /> */}
                <ChevronRight
                    stroke={theme.colors.stroke}
                    fill={theme.colors.stroke}
                />
            </TouchableOpacity>
        )}
    </ThemeConsumer>
    
  )
}

export default ActionButton
