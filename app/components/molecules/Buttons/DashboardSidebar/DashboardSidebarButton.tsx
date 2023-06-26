import React from 'react'
import { Grid, GridItem, Text, useMediaQuery, Tooltip } from "@chakra-ui/react"
import Link from 'next/link'

interface IProps {
    isActive?: boolean,
    children?: string | React.ReactNode,
    onClick?: () => void,
    icon?: React.ReactNode,
    link?: string,
    names?: string
}

function DashboardSidebarButton( props: IProps ) {
    const { icon, isActive, children, onClick, link, names} = props


    const [isLargerThan1680] = useMediaQuery('(min-width: 1680px)', {
        ssr: true,
        fallback: true
      })
  return (
    <Link href={link ?link : ""}  onClick={onClick} >
        <Grid  padding="10px 0px" bgColor={isActive ? "primary.100" : "white"} alignItems={"center"}  cursor="pointer" onClick={onClick} w="full" borderLeftWidth={10} borderLeftColor={isActive ? "primary.900" : "transparent"} borderRadius="10px" templateColumns={isLargerThan1680 ? "40px auto" : "105px auto"} columnGap="10px" >
            <Tooltip label={names}>
            <GridItem  display="flex" alignItems={"center"} justifyContent="center" >
                {icon}
            </GridItem>
            </Tooltip>
            <GridItem alignItems={"center"} justifyContent="left" >
                <Text fontSize="18px" textTransform="capitalize" fontWeight={!isActive ? "400" : "700"} color={!isActive ? "black" : "primary.900"} >
                    {children}
                </Text>
            </GridItem>
        </Grid>
    </Link>
  )
}

export default DashboardSidebarButton