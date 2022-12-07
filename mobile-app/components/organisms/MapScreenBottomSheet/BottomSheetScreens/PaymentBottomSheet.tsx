import { StyleSheet, Text, View } from 'react-native'
import React, {useRef} from 'react'
import BottomSheet from "@gorhom/bottom-sheet"
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import CashIcon from "../../../../assets/icons/cash.svg"
import ActionButton from '../../../atoms/Buttons/ActionButton/ActionButton'
import VisaIcon from "../../../../assets/icons/visa.svg"
import { Image } from '@rneui/base'

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
 fontFamily: "Lato_700Bold",
            fontSize: 20,
            marginBottom: 20
        },
        cardsContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    }
})

const PaymentBottomSheet = (props: Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = ["50%"]
    const styles = useStyles(props)

    

    const close = () =>{
        bottomSheetRef.current?.close()
        props.closeBottomSheet && props.closeBottomSheet()
    }

    const handlePaymentSelect = () =>{
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
                onClose={props.closeBottomSheet}
                enablePanDownToClose
            >
                <View style={styles.contentContainer} >
                    <Text style={styles.contentTitleStyle} >
                        Select payment
                    </Text>
                    <View style={styles.cardsContainer} >
                        <ActionButton
                            image={
                                <CashIcon
                                    width={24}
                                    height={24}
                                    // fill={theme.colors.background4}
                                />
                            }
                            title="Cash"
                            customStyle={{
                                marginBottom: 10
                            }}
                            onPress={handlePaymentSelect}
                        />
                        <ActionButton
                            image={
                                <VisaIcon
                                    width={24}
                                    height={24}
                                    fill={theme.colors.background4}
                                />
                            }
                            title="**** 1234"
                            customStyle={{
                                marginBottom: 10
                            }}
                            onPress={handlePaymentSelect}
                        />
                        <ActionButton
                            image={
                                <Image
                                    source={require("../../../../assets/images/mpesa.png")}
                                    style={{
                                        width: 40,
                                        height: 40
                                    }}
                                />
                            }
                            title="M-PESA"
                            onPress={handlePaymentSelect}
                        />
                    </View>
                </View>
            </BottomSheet>
        )}
    </ThemeConsumer>
    
  )
}

export default PaymentBottomSheet

const styles = StyleSheet.create({})