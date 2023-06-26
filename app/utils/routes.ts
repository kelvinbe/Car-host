import { IconType } from "react-icons";
import { RxDashboard } from "react-icons/rx"
import { RiReservedLine, RiDownload2Fill } from "react-icons/ri"
import { SlLocationPin } from "react-icons/sl"
import { TfiCar } from "react-icons/tfi"
import { MdPowerInput } from "react-icons/md"
import { SiSimpleanalytics } from "react-icons/si"
import { CiWallet, CiTimer } from "react-icons/ci"
import { CgArrowsMergeAltH } from "react-icons/cg"
import { FiSend, FiUsers } from "react-icons/fi"
import {BsHouse} from 'react-icons/bs'

// dashboard routes
export const dashboardRoutes: {
    name: string;
    onClick: "toHome" | "toResports" | "toVehicleManagement" | "toReservations" | "toUsers" | "toAnalytics" | "toAvailability" | "toStations" | "toPayouts" | "toIntegrations" | "toAuthCodeManagement" | "toAllMapView" | "toAllReservations" | "toInvites" | "toWithdrawals" | "toProperties",
    admin: boolean,
    icon?: IconType,
    link?: string,
    match?: any,
    /**
     * !!! IMPORTANT !!! - this is an opt in feature, add it to pages that are in development and should not be released yet, note once a page is ready for release you will need to remove this prop
     * 
     * The current phase of the page
     * 
     * @note this will determine if the page will get rendered or a placeholder will be shown
     * 
     * @default "ph1"
     * 
     * ph1: the page is in phase 1 and should always be rendered
     * 
     * ph1.5: the page is in phase 1.5 and will only be rendered in development mode until the page is ready for release
     * 
     * ph2: the page is in phase 2 and will only be rendered in development mode until the page is ready for release
     * 
     */
    phase?: "ph1" | "ph1.5" | "ph2",
    host_only?: boolean
}[] = [
    {
      name: "dashboard",
      onClick: "toHome",
      admin: false,
      icon: RxDashboard,
      link: "/dashboard",
    },
    {
      name: "properties",
      onClick: "toProperties",
      admin: false,
      link: "/properties/management",
      icon: BsHouse,
      phase: "ph2" // TODO: remove this once the page is ready for release
    },
    {
      name: "reservations",
      onClick: "toReservations",
      admin: false,
      icon: RiReservedLine,
      link: "/reservations"
    },
    {
      name: "stations",
      onClick: "toStations",
      admin: false,
      icon: SlLocationPin,
      link: "/stations"
    },
    {
      name: "vehicle management",
      onClick: "toVehicleManagement",
      admin: false,
      icon: TfiCar,
      link: "/vehicle-management"
    },
    {
      name: "AuthCode",
      onClick: "toAuthCodeManagement",
      admin: false,
      icon: MdPowerInput,
      link: "auth-code-management",
      host_only: true
    },
    {
      name: "analytics & reports",
      onClick: "toResports",
      admin: false,
      icon: SiSimpleanalytics,
      link: "/reports",
      host_only: true
    },
    {
      name: "withdrawals",
      onClick: "toWithdrawals",
      admin: false,
      icon: RiDownload2Fill,
      link: "/withdrawals"
    },
    {
      name: "integrations",
      onClick: "toIntegrations",
      admin: false,
      icon: CgArrowsMergeAltH,
      link: "/integrations",
      host_only: true,
      phase: "ph1.5" // TODO: remove this once the page is ready for release
    },
    {
      name: "availability",
      onClick: "toAvailability",
      admin: false,
      icon: CiTimer,
      link: "/availability"
    },
    {
      name: "users",
      onClick: "toUsers",
      admin: true,
      icon: FiUsers,
      link: "/user-management"
    },
    // {
    //   name: "analytics",
    //   onClick: "toAnalytics",
    //   admin: false,
    //   icon: SiSimpleanalytics,
    //   link: "/analytics"
    // },
    {
      name: "all vehicles",
      onClick: "toAllMapView",
      admin: true,
      icon: TfiCar,
      link: "all-map-view"
    },
    {
      name: "all reservations",
      onClick: "toAllReservations",
      admin: true,
      icon: RiReservedLine,
      link: "/all-reservations"
    },
    {
      name: "invites",
      onClick: "toInvites",
      admin: true,
      link: "/dashboard/admin/invites",
      icon: FiSend
    }
   
  ]