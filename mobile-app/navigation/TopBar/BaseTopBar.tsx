import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { Button } from '@rneui/base';
import HomeIcon from "../../assets/icons/home.svg";
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

interface IProps {
    title?: string;
}

type Props = IProps & BottomTabHeaderProps;

const useStyles = makeStyles((theme, props: Props)=>{
    return {
        container: {
            width: "100%",
            height: 36,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.white,
            paddingHorizontal: 10
        },
        iconButtonStyle: {
            borderRadius: 4,
            borderColor: theme.colors.grey0?.trim()
        },
        iconButtonContainerStyle: {
            borderRadius: 4,
        },
        titleStyle: {
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
            color: theme.colors.black,
            width: "90%"
        }
    }
})

const BaseTopBar = (props: Props) => {
    const styles = useStyles(props)

    const goBack = () => {
        props.navigation.navigate("SearchScreen")
    }
  return (
    <ThemeConsumer>
        {({theme})=>(
            <View style={styles.container} >
            <StatusBar backgroundColor={theme.colors.white} />
            
            <Text style={styles.titleStyle} >
                { props?.title }
            </Text>
            <Button onPress={goBack} style={styles.iconButtonContainerStyle} containerStyle={styles.iconButtonContainerStyle} type="outline" buttonStyle={styles.iconButtonStyle} >
                <HomeIcon height={12} width={12}  />
            </Button>
        </View>
        )}
    </ThemeConsumer>
  )
}

export default BaseTopBar