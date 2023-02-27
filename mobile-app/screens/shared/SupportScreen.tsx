import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { makeStyles, useTheme } from '@rneui/themed'
import { Image } from '@rneui/base'
import Support from "../../assets/icons/feather/help-circle.svg"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import ActionButton from '../../components/atoms/Buttons/ActionButton/ActionButton'
import useFetchDivvlyInfo from '../../hooks/useFetchDivvlyInfo'
import { FETCH_SUPPORT_ENDPOINT } from '../../hooks/constants'

type Props = NativeStackScreenProps<any, any>

const useStyles = makeStyles((theme, props)=>{
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.white,
            alignItems: 'center',
            justifyContent: "space-between"
        },
        topSection: {
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        topContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 30
        },
        titleText: {
            color: theme.colors.title,
            fontSize: 24,
            fontWeight: "700", 
            fontFamily: "Lato_700Bold",
        },
        subtitleText: {
            color: theme.colors.black,
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Lato_400Regular",
        },
        normaltext: {
            color: theme.colors.black,
            fontSize: 14,
            fontWeight: "400",
            fontFamily: "Lato_400Regular",
        },
        centerContainer: {
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 20
        },
        bottomContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
        scrollView: {
            width: "100%",
            height: '80%'
        },
        actionButton: {
            marginBottom: 10,
        }
    }
})

const SupportScreen = (props: Props) => {
    const styles = useStyles()
    const { theme } = useTheme() 
    const [toggleAnswer, setToggleAnswer] = useState<boolean>(false)
    const {data, fetchDivvlyInfo} = useFetchDivvlyInfo(FETCH_SUPPORT_ENDPOINT)

    useEffect(() => {
        fetchDivvlyInfo()
    },[])
  return (
    <View style={styles.container} >
        <View style={styles.topSection} >
            <View style={styles.topContainer} >
                <Image 
                    source={require('../../assets/images/logo.png')}
                    style={{
                        height: 50,
                        width: 50,
                    }}
                    resizeMode="contain"
                />
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }} >
                    <Text style={[styles.titleText, {marginVertical: 10}]} >{data?.[0]['title']}</Text>
                    <Text style={styles.subtitleText} >Need Help?</Text>
                    <Text style={[styles.normaltext, {
                        textAlign: "center",
                        marginTop: 10,
                        paddingHorizontal: 20
                    }]} >
                        We are here to help you. Please contact us if you have any questions or concerns.
                    </Text>
                </View>
            </View>
            <View style={styles.centerContainer} >
                <ScrollView style={styles.scrollView} >
                    {data?.[0].questions?.map((question:{question_id:number,question:string, answer:string}) => (
                        <ActionButton
                        key={question.question_id}
                        data = {data}
                        id={question.question_id}
                        title={question.question}
                        image={<Support stroke={theme.colors.primary} width={20} height={20}   />}
                        customStyle={styles.actionButton}
                        onPress={() => setToggleAnswer(!toggleAnswer)}
                    />
                    ))}
                    
                </ScrollView>
                
            </View>
        </View>
        <View style={styles.bottomContainer} >
            
        </View>
    </View>
  )
}

export default SupportScreen

const styles = StyleSheet.create({})