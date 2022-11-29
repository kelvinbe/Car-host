import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { makeStyles } from '@rneui/themed'
import { Button, Input, InputProps  } from '@rneui/base'

interface IProps {
    fullWidth?: boolean;
    width?: number;
    cta?: string | ReactNode ,
    onPress?: (value?: string)=> void
}

type Props = IProps & InputProps;

const useStyles = makeStyles((theme, props: Props)=>{
    return ({
        container: {
            width: props?.fullWidth ? "100%" : props?.width ? props.width : "100%",
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 25,
            padding: 0,
            margin: 0,
            flexDirection: "row",
            alignitems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            height: 50,
        },
        inputParentContainer: {
            margin: 0,
            paddingLeft: 20,
            paddingVertical: 0,
            borderBottomWidth: 0,
            flexDirection: "row",	
            alignItems: "center",
            justifyContent: "flex-start",
            maxWidth: "60%"
        },
        errorStyle: {
            height: 0,
            margin: 0,
            padding: 0
        },
        inputContainer: {
            width: "100%",
            padding: 0,
            margin: 0,
            borderBottomWidth: 0
        },
        inputStyle: {
            borderWidth: 0,
            padding: 0,
            margin: 0,

        },
        rightButton: {
            width: 50,
            height: 50,
            // borderTopRightRadius: 25,
            // borderBottomRightRadius: 25,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            justifyContent: "center",
        },
        style: {
            borderWidth: 0,
        },
        buttonTitleStyle: {
            fontSize: 16,
            lineHeight: 20,
            fontWeight: "700"
        },
        labelStyle: {
            textAlign: "left",
            width: "100%",	
            fontSize:16,
            lineHeight: 20,
            color: theme.colors.black,
            fontWeight: "600",
            marginBottom: 5
        }
    })
})

const InputWithButton = (props: Props) => {
    const styles = useStyles(props)
    const [value, setValue] = useState<string>("")

    const onChangeText = (v: string) =>{
        setValue(v)
        props.onChangeText && props.onChangeText(v)
    }
  return (
    <>
        <Text style={styles.labelStyle}>
            {
                props.label
            }
        </Text>
        <View style={styles.container} >
        
            <Input
                containerStyle={styles.inputParentContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                underlineColorAndroid="transparent"
                errorStyle={styles.errorStyle}
                style={styles.style}
                placeholder={props.placeholder}
                value={value}
                onChangeText={onChangeText}
                
            />
            <Button onPress={()=>{
                props.onPress && props.onPress(value)
            }} buttonStyle={styles.rightButton} titleStyle={styles.buttonTitleStyle} >
                {
                    props.cta ? (
                        typeof props.cta === "string" ? props.cta : props.cta
                    ) : "Go"
                }
            </Button>
        </View>
    </>
    
  )
}

export default InputWithButton

const styles = StyleSheet.create({})