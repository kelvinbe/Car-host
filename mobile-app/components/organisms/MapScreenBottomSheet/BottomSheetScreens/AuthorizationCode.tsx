import { StyleSheet, Text, View } from 'react-native'
import React, {useRef} from 'react'
import BottomSheet from "@gorhom/bottom-sheet"
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import CashIcon from "../../../../assets/icons/cash.svg"
import ActionButton from '../../../atoms/Buttons/ActionButton/ActionButton'
import VisaIcon from "../../../../assets/icons/visa.svg"
import { Image } from '@rneui/base'
import BaseInput from '../../../atoms/Input/BaseInput/BaseInput'
import Rounded from '../../../atoms/Buttons/Rounded/Rounded'

interface IProps {
    closeBottomSheet?: () => void
}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props)=> {
    return {
        container: {
            
        },
        backdropContainer: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
        backgroundStyle: {
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.white,
        },
        contentContainer: {
            width: "100%",
            height: "100%",
            padding: 20
        },
        contentTitleStyle: {
            width: "100%",
            fontWeight: "700",
            fontSize: 20,
            marginBottom: 20
        },
        cardsContainer: {
            width: "100%",
            marginTop: 20
        },
        bottomTextContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: "500",
            marginVertical: 20
        },
        leftText: {
            
            color: theme.colors.primary,
            marginRight: 5
        },
        rightText: {
            color: theme.colors.link,
        },
    }
})

const AuthorizationBottomSheet = (props: Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = ["40%"]
    const styles = useStyles(props)

    const close = () =>{
        bottomSheetRef.current?.close()
        props.closeBottomSheet && props.closeBottomSheet()
    }

    const handleVerify = () =>{
        close()
    }

  return (
    <ThemeConsumer>
        {({theme})=>(
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={0}
                containerStyle={styles.backdropContainer}
                backgroundStyle={styles.backgroundStyle}
                enablePanDownToClose 
                onClose={props.closeBottomSheet}
            >
                <View style={styles.contentContainer} >
                    <Text style={styles.contentTitleStyle} >
                        Authorization Code
                    </Text>
                    <View style={styles.cardsContainer} >
                        <BaseInput
                            label="Authorization Code"
                            placeholder="Enter Authorization code"
                            containerStyle={{
                                marginBottom: 20
                            }}
                        />
                        <Rounded onPress={handleVerify} >
                            Verify
                        </Rounded>
                    </View>
                    <View style={styles.bottomTextContainer} >
                        <Text style={styles.leftText} >
                            Don't have a code?
                        </Text>
                        <Text  style={styles.rightText} >
                            Ask for One
                        </Text>
                </View>
                </View>
            </BottomSheet>
        )}
    </ThemeConsumer>
    
  )
}

export default AuthorizationBottomSheet

const styles = StyleSheet.create({})