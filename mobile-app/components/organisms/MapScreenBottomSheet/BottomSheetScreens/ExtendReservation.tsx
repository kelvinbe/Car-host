import { Text, View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { makeStyles, ThemeConsumer } from '@rneui/themed';
import Rounded from '../../../atoms/Buttons/Rounded/Rounded';
import TimeFilter from '../../../molecules/TimeFilter/TimeFilter';
import RoundedOutline from '../../../atoms/Buttons/Rounded/RoundedOutline';
import useBookingActions from '../../../../hooks/useBookingActions';
import { useUpdateBookingMutation } from '../../../../store/slices/reservationSlice';
import useExtendBooking from '../../../../hooks/useExtendBooking';
import useToast from '../../../../hooks/useToast';
import { IReservation } from '../../../../types';

interface IProps {
  closeBottomSheet?: () => void;
}

type Props = IProps & IReservation;

const useStyles = makeStyles((theme, props: Props) => {
  return {
    container: {},
    backdropContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    backgroundStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.white,
    },
    contentContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    contentTitleStyle: {
      width: '100%',
      fontWeight: '700',
      fontFamily: 'Lato_700Bold',
      fontSize: 20,
      textAlign: 'center',
    },
    inputContainer: {
      width: '100%',
      marginTop: 20,
    },
    bottomButtonsContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 20,
      marginTop: 150,
    },
  };
});

const ExtendReservation = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['45%'];
  const styles = useStyles(props);
  const toast = useToast()

  const { setStartDateTime, setEndDateTime, bookingDetails } = useBookingActions();
  const [ updateBooking ] = useUpdateBookingMutation();
  const {extendBooking, data, error, loading} = useExtendBooking()

  const close = () => {
    bottomSheetRef.current?.close();
    props.closeBottomSheet && props.closeBottomSheet();
  };

  const handleCancel = () => {
    /**
     * @todo: handle cancel booking
     */
    close();
  };

  const handleSave = () => {
    extendBooking(props?.reservation_id)
    updateBooking({
      endDateTime: bookingDetails.endDateTime,
      startDateTime: bookingDetails.startDateTime,
    } as any);
  };
  useEffect(() => {
    if(data && data[0]?.status === "Extended"){
      close();
      toast({
        type:"success",
        title:"Extended",
        message:"Your dropoff time has been extended",
        duration:3000
      })
    }else if(error){
      close();
      toast({
        type:"error",
        title:"Failed",
        message:"Something went wrong. Could not extend your ride",
        duration:3000
      })
    }
  },[data, error])

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          containerStyle={styles.backdropContainer}
          backgroundStyle={styles.backgroundStyle}
          enablePanDownToClose
          onClose={props.closeBottomSheet}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitleStyle}>Extend reservation time</Text>
            <View style={styles.inputContainer}>
              <View style={styles.bottomButtonsContainer}>
                <RoundedOutline
                  customStyle={{
                    elevation: 0,
                  }}
                  onPress={handleCancel}
                  width="40%">
                  Cancel
                </RoundedOutline>
                <Rounded loading={loading} onPress={handleSave} width="40%">
                  Save
                </Rounded>
              </View>
              <TimeFilter
                displayDay={false}
                displayPickup={false}
                displayExtendText={true}
                customStyles={{
                  paddingVertical: 0,
                  elevation: 5,
                }}
                setEndDateTime={setEndDateTime}
                setStartDateTime={setStartDateTime}
              />
            </View>
          </View>
        </BottomSheet>
      )}
    </ThemeConsumer>
  );
};

export default ExtendReservation;
