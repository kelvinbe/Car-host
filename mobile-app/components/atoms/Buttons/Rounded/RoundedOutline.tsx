import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ButtonProps, makeStyles } from '@rneui/themed'
import { Button } from '@rneui/base';

interface IProps {
    fullWidth?: boolean;
    width?: number;
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
            width: props?.fullWidth ? '100%' : 'auto',
            borderColor: theme.colors.primary
        },
        titleStyle: {
            color: theme.colors.primary,
            fontSize: 20,
            fontWeight: '700',
            lineHeight: 24,
            textAlign: "center",
            width: '100%',
        }
    })
})

const RoundedOutline = (props: Props) => {
    const styles = useStyles(props)
  return (
    <Button
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