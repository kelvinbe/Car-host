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
import TimeFilter from '../../../molecules/TimeFilter/TimeFilter'
import RoundedOutline from '../../../atoms/Buttons/Rounded/RoundedOutline'

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
            alignItems: "center",
            justifyContent: "flex-start",
        },
        contentTitleStyle: {
            width: "100%",
            fontWeight: "700",
            fontSize: 20,
            textAlign: "center"
        },
        inputContainer: {
            width: "100%",
            marginTop: 20
        },
        bottomButtonsContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 20,
            marginTop: 150
        }
    }
})

const ModifyBookingBottomSheet = (props: Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = ["45%"]
    const styles = useStyles(props)

    const close = () =>{
        bottomSheetRef.current?.close()
        props.closeBottomSheet && props.closeBottomSheet()
    }

    const handleCancel = () =>{
        /**
         * @todo: handle cancel booking
         */
        close()
    }

    const handleSave = () =>{
        /**
         * @todo: handle save booking
         */
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
                        Modify Booking
                    </Text>
                    <View style={styles.inputContainer} >
                    <View style={styles.bottomButtonsContainer} >
                            <RoundedOutline customStyle={{
                                elevation: 0
                            }} onPress={handleCancel} width="45%" >
                                Cancel
                            </RoundedOutline>
                            <Rounded onPress={handleSave} width="45%" >
                                Save
                            </Rounded>
                        </View>
                        <TimeFilter customStyles={{
                            paddingVertical: 0,
                            elevation: 5
                        }} />
                        
                    </View>
                    
                </View>
            </BottomSheet>
        )}
    </ThemeConsumer>
    
  )
}

export default ModifyBookingBottomSheet
