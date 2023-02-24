import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, {useRef, useState} from 'react'
import BottomSheet from "@gorhom/bottom-sheet"
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import CashIcon from "../../../../assets/icons/cash.svg"
import ActionButton from '../../../atoms/Buttons/ActionButton/ActionButton'
import VisaIcon from "../../../../assets/icons/visa.svg"
import { Image } from '@rneui/base'
import BaseInput from '../../../atoms/Input/BaseInput/BaseInput'
import Rounded from '../../../atoms/Buttons/Rounded/Rounded'
import useBookingActions from '../../../../hooks/useBookingActions'
import { useVerifyAuthCode } from '../../../../hooks'
import Loading from '../../../molecules/Feedback/Loading/Loading'
import Error from '../../../molecules/Feedback/Error/Error'
import useRequestAuthCode from '../../../../hooks/useRequestAuthCode'
import useToast from '../../../../hooks/useToast'
import { requestAuthCode } from '../../../../hooks/useRequestAuthCode'

interface IProps {
    closeBottomSheet?: () => void
}

type Props = IProps & requestAuthCode

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
            padding: 20,
            textAlign: "center",
        },
        contentTitleStyle: {
            width: "100%",
            fontWeight: "700", 
            fontFamily: "Lato_700Bold",
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
        },
        cardsContainer: {
            width: "100%",
        },
        bottomTextContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: "500", fontFamily: "Lato_400Regular",
            marginVertical: 20
        },
        leftText: {
            
            color: theme.colors.primary,
            marginRight: 5
        },
        rightText: {
            color: theme.colors.link,
        },
        errorText: {
            color: theme.colors.error,
            fontSize: 14,
            fontWeight: "400", 
            fontFamily: "Lato_400Regular",
        }
    }
})

const AuthorizationBottomSheet = (props: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = ["40%"]
    const styles = useStyles(props)
    const [verificationInput, setVerificationInput] = useState<string>("")

    const { data, error, loading } = useVerifyAuthCode(verificationInput)

    const {dataRequest, err, requestAuthorizationCode} = useRequestAuthCode(props)

    const toast = useToast()

    const close = () =>{
        bottomSheetRef.current?.close()
        props.closeBottomSheet && props.closeBottomSheet()
    }

    const handleVerify = () =>{
        close()
    }


    const handleRequestAuthCode = () => {
        requestAuthorizationCode()
        
        if(dataRequest?.status === 'success'){      
            toast({
            type: 'success',
            message: 'Successfully requested an authcode.',
            title: 'Success',
            duration: 3000,
            })
            close()
        }else if(err){
            toast({
                type: 'error',
                message: 'Something went wrong',
                title: 'Error',
                duration: 3000
            })
        }
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
                    {
                            <KeyboardAvoidingView 
                            behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                            }
                            style={styles.contentContainer} >
                                <Text style={styles.contentTitleStyle} >
                                    Authorization Code
                                </Text>
                                <View style={styles.cardsContainer} >
                                    {
                                        error && <Text style={styles.errorText} >
                                            Code not valid
                                        </Text>
                                    }
                                    <BaseInput
                                        // label="Authorization Code"
                                        placeholder="Enter Authorization code"
                                        containerStyle={{
                                            marginBottom: 20
                                        }}
                                        onChangeText={setVerificationInput}
                                        maxLength={6}
                                    />
                                    <Rounded 
                                        loading={loading}
                                        onPress={handleVerify} >
                                        {(data && verificationInput.length  === 6 ) ? "Done" :"Verify"}
                                    </Rounded>
                                </View>
                                <View style={styles.bottomTextContainer} >
                                    <Text style={styles.leftText} >
                                        Don't have a code?
                                    </Text>
                                    <Text  style={styles.rightText} onPress={handleRequestAuthCode} >
                                        Ask for One
                                    </Text>
                                </View>
                            </KeyboardAvoidingView>
                    }
            </BottomSheet>
        )}
    </ThemeConsumer>
    
  )
}

export default AuthorizationBottomSheet

const styles = StyleSheet.create({})