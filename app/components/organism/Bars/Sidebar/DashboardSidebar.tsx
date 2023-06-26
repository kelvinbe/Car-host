/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useState } from "react";
import { Flex, Grid, Divider, useMediaQuery } from "@chakra-ui/react";
import {
  FlexRowCenterCenter,
} from "../../../../utils/theme/FlexConfigs";
// import Logo from '../../../atoms/Brand/Logo'
import { dashboardRoutes } from "../../../../utils/routes";
import DashboardSidebarButton from "../../../molecules/Buttons/DashboardSidebar/DashboardSidebarButton";
import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import Logo from "../../../atoms/Brand/Logo";
import { useAppSelector } from "../../../../redux/store";
import { selectUser } from "../../../../redux/userSlice";

interface IReducerState {
  activeRoute: string;
  activeTab: string;
}

const initialState: IReducerState = {
  activeRoute: "/dashboard",
  activeTab: "/dashboard",
};

const reducerSlice = createSlice({
  name: "dashboardSidebar",
  initialState,
  reducers: {
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveRoute, setActiveTab } = reducerSlice.actions;

function DashboardSidebar() {
  const [{ activeTab }, dispatchAction] = useReducer(
    reducerSlice.reducer,
    initialState
  );
  const user = useAppSelector(selectUser)
  const [isAdmin, setIsAdmin] = useState(false);

  const { pathname } = useRouter();

  useEffect(() => {
    if (user?.is_admin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user?.is_admin]);

  useEffect(() => {
    if (pathname && !pathname.includes(activeTab)) {
      dashboardRoutes?.forEach(({ link }) => {
        if (link && pathname.includes(link)) {
          dispatchAction(setActiveRoute(link));
          dispatchAction(setActiveTab(link));
        }
      });
    }
  }, [pathname]);


  const [isLargerThan900] = useMediaQuery('(min-width: 1680px)', {
    ssr: true,
    fallback: true
  }) 


  return (
    <Grid
      overflowY="scroll"
      bg="white"
      h="full"
      rowGap="5"
      position="fixed"
      w={isLargerThan900 ? "300px" : "150px"}
      templateColumns={"1fr"}
      paddingLeft="10px"
      paddingRight={"15px"}
      paddingTop="20px"
      templateRows="repeat(13, 47px)"
      data-testid="sidebar-on-dashboard-links"
    >
      <Flex w="full" {...FlexRowCenterCenter}>
        <Logo />
      </Flex>
      {dashboardRoutes
        ?.filter(({ admin }) => !admin)
        ?.filter(({phase})=> {
          if(!phase){
            return true
          }
          if(phase){
            if(process.env.NEXT_PUBLIC_APP_ENV === "testing"){
              return true
            }
            if(process.env.NEXT_PUBLIC_APP_ENV === "development"){
              return true
            }
            if(process.env.NEXT_PUBLIC_APP_ENV === "staging"){
              return true
            }
            if(process.env.NEXT_PUBLIC_APP_ENV === "production"){
              return false
            }
          }
        })
        ?.filter(({host_only})=>{
          if(host_only){
            return !user?.is_admin
          }
          return true
        })
        ?.map(({ name, icon: Icon, link }, index) => (
          <DashboardSidebarButton
            onClick={() => {
              dispatchAction(setActiveTab(link));
            }}
            key={index}
            icon={
              Icon && (
                <Icon color={activeTab === link ? "primary.900" : "black"} />
              )
            }
            link={link}
            isActive={!link ? false : activeTab === link}
            names={name}
          >
          {isLargerThan900 ? name : ''}
          </DashboardSidebarButton>
        ))}
      <Divider w="full" borderColor="gray.400" />
      {isAdmin &&
        dashboardRoutes
          ?.filter(({ admin }) => admin)
          ?.filter(({phase})=> {
            if(!phase){
              return true
            }
            if(phase){
              if(process.env.NEXT_PUBLIC_APP_ENV === "testing"){
                return true
              }
              if(process.env.NEXT_PUBLIC_APP_ENV === "development"){
                return true
              }
              if(process.env.NEXT_PUBLIC_APP_ENV === "staging"){
                return true
              }
              if(process.env.NEXT_PUBLIC_APP_ENV === "production"){
                return false
              }
            }
          })
          ?.map(({ name, icon: Icon, link }, index) => (
            <DashboardSidebarButton
              onClick={() => {
                dispatchAction(setActiveTab(link));
              }}
              key={index}
              icon={
                Icon && (
                  <Icon color={activeTab === link ? "primary.900" : "black"} />
                )
              }
              link={link}
              isActive={!link ? false : activeTab === link}
            >
              {isLargerThan900 ? name : ''}
            </DashboardSidebarButton>
          ))}
    </Grid>
  );
}

export default DashboardSidebar;
