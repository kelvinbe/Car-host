/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import LoadingComponent from '../components/molecules/feedback/LoadingComponent'
import { Flex, Grid, GridItem, useMediaQuery, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { FlexColCenterCenter } from '../utils/theme/FlexConfigs';
import DevicesSupported from '../components/molecules/DevicesSupported/DevicesSupported';


interface IProps {
  children: React.ReactNode
}

function MainLayout(props: IProps) {
  const { children } = props

  const [isLargerThan900] = useMediaQuery('(min-width: 913px)')



  return (
    <>
   {isLargerThan900 ? <div className="flex flex-row items-center justify-start w-screen flex-1 h-full">
        {
          children
        }
    </div>: <DevicesSupported />}
    </>
  )
}

export default MainLayout