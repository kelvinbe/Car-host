import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon, makeStyles, ThemeConsumer, withTheme } from '@rneui/themed'
import { Button, ButtonProps, RneFunctionComponent, Theme } from '@rneui/base'
import { LoadIcon } from '../../../../utils/loadIcons';


interface IIconProps {
    name: string;
    size?: number;
    color?: string;
    iconType?: string
}

interface IProps {
    children?: React.ReactElement | React.ReactElement[];
    shadow?: boolean;

}

type Props = IProps & ButtonProps & IIconProps & { theme?: Theme };
const useStyles = makeStyles((theme, props: Props)=>{

    return ({
        buttonStyle: {
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: props?.shadow ? 0 : 1,
            borderColor: "#e5e5e5",
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: 10,
            ...props?.shadow && {
                shadowColor: "rgba(0, 0, 0, 0.06)",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowBlur: 24,
            }
        },
    })
})

const IconButton = (props: Props) => {
    const styles = useStyles(props)
  return (
    <Button containerStyle={props.containerStyle} style={props.style} buttonStyle={styles.buttonStyle}  >
        <Icon name={props.name} type={props.iconType}  color={props?.theme?.colors.grey0}  />
    </Button>
  )
}

export default withTheme(IconButton)

const styles = StyleSheet.create({})