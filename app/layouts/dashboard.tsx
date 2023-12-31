/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { app } from "../firebase/firebaseApp";
import useDashboardRoutes from "../hooks/useDashboardRoutes";
import { dashboardRoutes } from "../utils/routes";
import { Flex, Grid, GridItem, useMediaQuery} from "@chakra-ui/react";
import DashboardSidebar from "../components/organism/Bars/Sidebar/DashboardSidebar";
import DashboardTopBar from "../components/organism/Bars/TopBar/DashboardTopBar";
import LoadingComponent from "../components/molecules/feedback/LoadingComponent";
import { FlexColCenterCenter } from "../utils/theme/FlexConfigs";
import { useAppDispatch } from "../redux/store";
import { fetchUser } from "../redux/userSlice";
import DevicesSupported from "../components/molecules/DevicesSupported/DevicesSupported";


interface IProps {
  children: React.ReactNode;
}

const twStyles = {
  dashboardButton:
    "flex flex-row items-center justify-start w-full h-12 px-4 text-gray-500 hover:bg-slate-100 hover:text-slate-500 capitalize cursor-pointer ",
  dashboardButtonsContainer:
    "flex flex-col items-start justify-start w-full h-full",
  logoutButton:
    "flex flex-row items-center justify-start w-full h-12 px-4  bg-blue-100 rounded-md hover:bg-blue-200 hover:text-slate-500 capitalize cursor-pointer ",
};

function Dashboardlayout(props: IProps) {
  const { children } = props;
  const { push, events } = useRouter();
  const [changePageLoad, setChangePageLoad] = useState(false);
  const [isLargerThan900] = useMediaQuery('(min-width: 913px)', {
    ssr: true,
    fallback: true
  }) 
  const [isLargerThan1680] = useMediaQuery('(min-width: 1680px)', {
    ssr: true,
    fallback: true
  }) 
  


  useEffect(() => {

    events.on("routeChangeStart", () => {
      setChangePageLoad(true);
    });
    events.on("routeChangeComplete", () => setChangePageLoad(false));
  }, []);

  const dashboardNavigation = useDashboardRoutes();
  return (
    <>
    {isLargerThan900 ?  (<Grid w="100vw" minH="100vh" bg="background" templateColumns={!isLargerThan1680 ? "150px auto" : "300px auto"}>
      <GridItem h="full" w="full" data-testid="sidebar-on-dashboard">
        <DashboardSidebar />
      </GridItem>
      <GridItem w="full" padding="20px 20px" h="full">
        <Grid gridTemplateRows={"50px full"} rowGap="20px">
          <GridItem w="full" alignItems={"center"}>
            <DashboardTopBar />
          </GridItem>
          <GridItem justifyContent={"center"} height="full">
            {changePageLoad ? (
              <Flex h="full" w="full" flex={1} {...FlexColCenterCenter}>
                <LoadingComponent />
              </Flex>
            ) : (
              children
            )}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>): (<DevicesSupported />)}
    </>
  );
}

export default Dashboardlayout;
