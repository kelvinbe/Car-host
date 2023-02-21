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
import { useCancelBooking } from '../../../../hooks';
import useToast from '../../../../hooks/useToast';
import { IReservation } from '../../../../types'

interface IProps {
    closeBottomSheet?: () => void;
}

type Props = IProps & IReservation;

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
            alignItems: "center"
        },
        contentTitleStyle: {
            fontWeight: "700", 
 fontFamily: "Lato_700Bold",
            fontSize: 20,
            marginBottom: 20
        },
        descriptionContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20
        },
        textStyle: {
            fontSize: 20,
            fontWeight: "400", fontFamily: "Lato_400Regular",
            color: theme.colors.black
        },
        bottomButtonsContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
        }
    }
})

const CancelBookingBottomSheet = (props: Props) => {
    const { data, error, cancelBooking } = useCancelBooking(props?.reservation_id);
    const toast = useToast();
    
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = ["30%"]
    const styles = useStyles(props)

    const close = () =>{
        bottomSheetRef.current?.close()
        props.closeBottomSheet && props.closeBottomSheet()
    }

    const handleCancel = () =>{
        cancelBooking();
        close();

        if (data) {
        toast({
            type: 'success',
            message: 'Your reservation has been cancelled.',
            title: 'Success',
            duration: 3000,
        });
        }
        if (error) {
        toast({
            type: 'error',
            message: 'Something went wrong',
            title: 'Error',
            duration: 3000,
        });
        }
    }

    const handleStop = () =>{
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
                        Are you sure?
                    </Text>
                    <View style={styles.descriptionContainer} >
                            <Text style={styles.textStyle} >
                                Your Booking will be cancelled
                            </Text>
                    </View>
                    <View style={styles.bottomButtonsContainer} >
                        <RoundedOutline onPress={handleCancel} width="45%" >
                            Yes
                        </RoundedOutline>
                        <Rounded onPress={handleStop} width="45%" >
                            No
                        </Rounded>
                    </View>
                </View>
            </BottomSheet>
        )}
    </ThemeConsumer>
    
  )
}

export default CancelBookingBottomSheet
