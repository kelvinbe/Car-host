import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { makeStyles } from '@rneui/themed'
import { Image } from '@rneui/base'
import { ScrollView } from 'react-native-gesture-handler'
import useFetchDivvlyInfo from '../../../hooks/useFetchDivvlyInfo'
import { FETCH_PRIVACY_POLICY_ENDPOINT } from '../../../hooks/constants'

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
            paddingHorizontal: 20,
            height: "60%"
        },
        bottomContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
        policyContainer: {
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row", 
            width: "100%",
            marginVertical: 10
        },
        policyNumber: {
            alignItems: "center",
            justifyContent: "center",
            width: 50,
        },
        policyText: {
            justifyContent: "center",
            width: "85%",
        },
        policiesContainer: {
            flex: 1
        }
    }
})

const PrivacyPolicy = () => {
  const styles = useStyles()
  const {data, fetchDivvlyInfo} = useFetchDivvlyInfo(FETCH_PRIVACY_POLICY_ENDPOINT)

  useEffect(() => {
    fetchDivvlyInfo()
  },[])

  return (
    <View style={styles.container} >
        <View style={styles.topSection} >
            <View style={styles.topContainer} >
                <Image 
                    source={require('../../../assets/images/logo.png')}
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
                    <Text style={styles.subtitleText} >Last Updated: {data?.[0]['last_updated']}</Text>
                    <Text style={[styles.normaltext, {
                        textAlign: "center",
                        marginTop: 10,
                        paddingHorizontal: 20
                    }]} >
                        {data?.[0]['sub_title']} 
                    </Text>
                </View>
            </View>
            <View style={styles.centerContainer}>
                <ScrollView style={styles.policiesContainer} >
                    {data?.[0]['policies'].map((policy:{number:number, title:string, description:string}) => (
                        <View style={styles.policyContainer} key={policy.number}>
                            <View style={styles.policyNumber} >
                                <Text style={styles.titleText} >
                                    {policy.number}
                                </Text>
                            </View>    
                            <View style={styles.policyText} >
                                <Text style={styles.subtitleText} >
                                    {policy.title}
                                </Text>
                                <Text style={[styles.normaltext]} >
                                    {policy.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
        <View style={styles.bottomContainer} >
            
        </View>
    </View>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({})