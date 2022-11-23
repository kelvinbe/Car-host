import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed'
import { Button } from '@rneui/base';


interface Props {
    children?: string
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const useStyles = makeStyles((theme, props: Props)=>{
    return ({
        buttonStyle: {
            backgroundColor: theme.colors.primary,
            borderRadius: 25,
            paddingTop: 13,
            paddingHorizontal:  20,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: props?.fullWidth ? '100%' : 'auto',
        },
        titleStyle: {
            color: theme.colors.white,
            fontSize: 20,
            fontWeight: '700',
            lineHeight: 24,
            textAlign: "center",
            width: '100%',
        }
    })
})

const Rounded = (props: Props) => {
  const styles = useStyles(props)
  return (
    <Button buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} title={props.children} />
  )
}

export default Rounded

const styles = StyleSheet.create({})