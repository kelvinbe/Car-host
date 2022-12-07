import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { ButtonProps, makeStyles } from '@rneui/themed'
import { Button } from '@rneui/base';

interface IProps {
    fullWidth?: boolean;
    width?: number | string;
    customStyle?: StyleProp<ViewStyle>
}

type Props = IProps & ButtonProps;

const useStyles = makeStyles((theme, props: Props)=> {
    return ({
        buttonStyle: {
            borderRadius: 25,
            paddingTop: 13,
            paddingHorizontal:  20,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderColor: theme.colors.primary
        },
        titleStyle: {
            color: theme.colors.primary,
            fontSize: 20,
            fontWeight: '700',
            fontFamily: "Lato_700Bold",
            lineHeight: 24,
            textAlign: "center",
            width: '100%',
        },
        containerStyle: {
            width: props?.fullWidth ? '100%' : props?.width ? props?.width : 'auto',
        }
    })
})

const RoundedOutline = (props: Props) => {
    const styles = useStyles(props)
  return (
    <Button
        containerStyle={[styles.containerStyle , props.customStyle]}
        onPress={props.onPress}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        type='outline'
    >
        {props.children}
    </Button>
  )
}

export default RoundedOutline

const styles = StyleSheet.create({})