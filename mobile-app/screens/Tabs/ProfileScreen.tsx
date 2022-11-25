import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Button, ButtonGroup, Divider, Icon, Image, ListItem, Switch } from '@rneui/base'
import LogoutIcon from "../../assets/icons/logout.svg"
import HomeIcon from "../../assets/icons/home.svg"

interface IProps {

}

type Props = IProps & BottomTabScreenProps<BottomTabParamList, "Profile">

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topBarContainerStyle: {
    width: "100%",
    height: 104,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  topBarCardStyle: {
    width: "90%",
    height: 92,
    backgroundColor: theme.colors.background,
    elevation: 5,
    borderRadius: 20,
    marginBottom: -46,
    position: "relative",
    justifyContent: "space-between"
  },
  avatarStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: theme.colors.white,
    overflow: "hidden",
    position: "absolute",
    top: -35,
    left: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImageStyle: {
    width: 70,
    height: 70,
  },
  editButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonTextStyle: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "500",
    marginRight: 5
  },
  topEditSectionContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10
  },
  profileInfoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10
  },
  profileInfoTextStyle: {
    color: theme.colors.title,
    fontSize: 16,
    fontWeight: "700"
  },
  profileInfoSubTextStyle: {
    color: theme.colors.subText,
    fontSize: 10,
    fontWeight: "500"
  },
  profileActionsContainer: {
    width: "100%",
    paddingTop: 30,
    paddingHorizontal: 0,
    flexDirection: "column",
    marginTop: 35,
    marginHorizontal: 0

  },
  actionButtonContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 10,
    borderWidth: 0
  },
  actionButtonTextStyle: {
    color: theme.colors.title,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left"
  },
  listContainerStyle: {
    width: "100%",
    alignItems: "center",
    juestifyContent: "flex-start",
    paddingHorizontal: 20
  },
  listItemContainerStyle: {
    width: "100%",
    padding: 0,
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  listItemContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  listItemTitleStyle: {
    color: theme.colors.title,
    width: "100%",
    fontSize: 16,
    fontWeight: "500"
  },
  dividerStyle: {
    width: "100%",
    borderColor: theme.colors.divider,
  },
  notificationActionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  notificationText: {
    color: theme.colors.title,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    width: "60%"
  },
  logoutSection: {
    width: "100%",
    paddingHorizontal: 20,
    height: "20%",
    justifyContent: "flex-end"
  },
  topNavSection: {
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 25

  },
  homeButtonContainer: {
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    padding: 2,
    height: 24,
    width: 24
  }
}))

const ProfileScreen = (props: Props) => {
  const styles = useStyles(props)
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <SafeAreaView 
          style={styles.container}
        >
          <StatusBar backgroundColor={theme.colors.primary} />
          <View style={styles.topBarContainerStyle} >
            <View style={styles.topNavSection} >
              <Button style={styles.homeButtonContainer} buttonStyle={styles.homeButtonContainer} >
                <HomeIcon width={12} height={12} />
              </Button>
            </View>
            <View style={styles.topBarCardStyle} >
              <View style={styles.avatarStyle} >
                <Image source={require("../../assets/images/user.png")} style={styles.avatarImageStyle} />
              </View>
              <View style={styles.topEditSectionContainer} >
                <View style={styles.editButtonContainer} >
                  <Text style={styles.editButtonTextStyle} >Edit</Text>
                  <Icon name="edit" type="font-awesome" size={10} color={theme.colors.primary} />
                </View>
              </View>
              <View style={styles.profileInfoContainer} >
                    <Text style={styles.profileInfoTextStyle} >
                      Sarah Lane
                    </Text>
                    <Text style={styles.profileInfoSubTextStyle} >
                      @lane_25
                    </Text>
              </View>
            </View>
          </View>
          <View style={styles.profileActionsContainer} >
            <View style={styles.listContainerStyle} >
              <ListItem
                Component={TouchableOpacity}
                containerStyle={styles.listItemContainerStyle}
              >
                  <ListItem.Content style={styles.listItemContent} >
                    <ListItem.Title style={styles.listItemTitleStyle} >Payments</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={styles.listItemContainerStyle}
              >
                  <ListItem.Content style={styles.listItemContent} >
                    <ListItem.Title style={styles.listItemTitleStyle} >Settings</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
              <View style={styles.notificationActionContainer} >
              
                <Text style={styles.notificationText} >
                  Notifications
                </Text>
                <Switch trackColor={{true: theme.colors.primary}} thumbColor={theme.colors.primary} />
              </View>
              <Divider style={styles.dividerStyle} />
              <ListItem
                Component={TouchableOpacity}
                containerStyle={styles.listItemContainerStyle}
              >
                  <ListItem.Content style={styles.listItemContent} >
                    <ListItem.Title style={styles.listItemTitleStyle} >User Agreement</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={styles.listItemContainerStyle}
              >
                  <ListItem.Content style={styles.listItemContent} >
                    <ListItem.Title style={styles.listItemTitleStyle} >Privacy Policy</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={styles.listItemContainerStyle}
              >
                  <ListItem.Content style={styles.listItemContent} >
                    <ListItem.Title style={styles.listItemTitleStyle} >Support</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={styles.listItemContainerStyle}
              >
                  <ListItem.Content style={styles.listItemContent} >
                    <ListItem.Title style={styles.listItemTitleStyle} >About</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
            </View>
          </View>
          <View style={styles.logoutSection} >
            <ListItem
                Component={TouchableOpacity}
                containerStyle={styles.listItemContainerStyle}
              >

                  <ListItem.Content style={styles.listItemContent} >
                    <LogoutIcon/>
                    <ListItem.Title style={[styles.listItemTitleStyle, {marginLeft: 10}]} >Logout</ListItem.Title>
                  </ListItem.Content>
              </ListItem>
          </View>

        </SafeAreaView>
      )}
    </ThemeConsumer>
    
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})