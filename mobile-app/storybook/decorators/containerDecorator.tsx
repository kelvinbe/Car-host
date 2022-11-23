import { makeStyles, ThemeConsumer } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export const containerDecorator = (Story: any) => {
    return (
        <ThemeConsumer>
            {({theme})=>(
                <View style={{
                    backgroundColor: theme.colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: 20
                }}>
                    <Story />
                </View>
            )}
        </ThemeConsumer>
    )
}