/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useState } from "react";
import { Flex, Grid, GridItem, Divider } from "@chakra-ui/react";
import {
  FlexColCenterStart,
  FlexRowCenterCenter,
} from "../../../../utils/theme/FlexConfigs";
// import Logo from '../../../atoms/Brand/Logo'
import { dashboardRoutes } from "../../../../utils/routes";
import DashboardSidebarButton from "../../../molecules/Buttons/DashboardSidebar/DashboardSidebarButton";
import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import Logo from "../../../atoms/Brand/Logo";

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
  const [{ activeRoute, activeTab }, dispatchAction] = useReducer(
    reducerSlice.reducer,
    initialState
  );

  const [isAdmin, setIsAdmin] = useState(false);

  const { pathname } = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

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

  return (
    <Grid
      overflowY="scroll"
      bg="white"
      h="full"
      rowGap="5"
      position="fixed"
      w="300px"
      templateColumns={"1fr"}
      paddingLeft="10px"
      paddingRight={"15px"}
      paddingTop="20px"
      templateRows="repeat(13, 47px)"
    >
      <Flex w="full" {...FlexRowCenterCenter}>
        <Logo />
      </Flex>
      {dashboardRoutes
        ?.filter(({ admin }) => !admin)
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
            {name}
          </DashboardSidebarButton>
        ))}
      <Divider w="full" borderColor="gray.400" />
      {isAdmin &&
        dashboardRoutes
          ?.filter(({ admin }) => admin)
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
              {name}
            </DashboardSidebarButton>
          ))}
    </Grid>
  );
}

export default DashboardSidebar;
