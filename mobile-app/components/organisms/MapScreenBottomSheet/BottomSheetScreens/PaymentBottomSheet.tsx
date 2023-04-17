import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { makeStyles, ThemeConsumer } from '@rneui/themed';
import ActionButton from '../../../atoms/Buttons/ActionButton/ActionButton';
import VisaIcon from '../../../../assets/icons/visa.svg';
import { FlatList } from 'react-native-gesture-handler';
import useBookingActions from '../../../../hooks/useBookingActions';
import useToast from '../../../../hooks/useToast';
import { useAppSelector } from '../../../../store/store';
import { selectUserProfile } from '../../../../store/slices/userSlice';
import { FontAwesome5 } from '@expo/vector-icons';
interface IProps {
  closeBottomSheet?: () => void;
  hasSelected?: Boolean;
}

type Props = IProps;

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
      padding: 20,
    },
    contentTitleStyle: {
      width: '100%',
      fontWeight: '700',
      fontFamily: 'Lato_700Bold',
      fontSize: 20,
      marginBottom: 20,
    },
    cardsContainer: {
      width: '100%',
      flex: 1,
    },
  };
});

const PaymentBottomSheet = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['50%'];
  const styles = useStyles(props);
  const { setPaymentType } = useBookingActions();
  const user = useAppSelector(selectUserProfile)
  const toast = useToast()

  const close = () => {
    bottomSheetRef.current?.close();
    props.closeBottomSheet && props.closeBottomSheet();
  };

  const handlePaymentSelect = (pt_id: any) => {
    const paymentType = user?.payment_types?.find(({id})=>pt_id === id)
    if (paymentType) {
      setPaymentType(paymentType)
      close()
    }else{
      toast({
        message: "Payment type not found",
        type: "error"
      })
    }
  };

  /**
   * Need more clarification on switching payment methods
   */

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          containerStyle={styles.backdropContainer}
          backgroundStyle={styles.backgroundStyle}
          onClose={props.closeBottomSheet}
          enablePanDownToClose>
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitleStyle}>Select payment</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={user?.payment_types}
              keyExtractor={(item) => item.id}
              renderItem={({item: pm, index})=>(
                <ActionButton
                  key={index}
                  image={pm.type === "STRIPE" ? <VisaIcon /> : pm.type === "UNKNOWN" ? <FontAwesome5 name="money-bill-wave-alt" size={24} color="black" /> : null}
                  title={pm.type === "MPESA" ? "M-PESA" : pm.type}
                  customStyle={{
                    marginBottom: 10,
                  }}
                  onPress={()=>{
                    handlePaymentSelect(pm.id)
                  }}
                />
              )}
            />
          </View>
        </BottomSheet>
      )}
    </ThemeConsumer>
  );
};

export default PaymentBottomSheet;

const styles = StyleSheet.create({});
