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


// dashboard routes
export const dashboardRoutes: {
    name: string;
    onClick: "toHome" | "toResports" | "toVehicleManagement" | "toReservations" | "toUsers" | "toAnalytics" | "toAvailability" | "toStations" | "toPayouts" | "toIntegrations" | "toAuthCodeManagement" | "toAllMapView" | "toAllReservations" | "toInvites" | "toWithdrawals",
    admin: boolean,
    icon?: IconType,
    link?: string,
    match?: any
}[] = [
    {
      name: "dashboard",
      onClick: "toHome",
      admin: false,
      icon: RxDashboard,
      link: "/dashboard",
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
      link: "auth-code-management"
    },
    {
      name: "analytics & reports",
      onClick: "toResports",
      admin: false,
      icon: SiSimpleanalytics,
      link: "/reports"
    },
    {
      name: "payouts",
      onClick: "toPayouts",
      admin: false,
      icon: CiWallet,
      link: "/payouts"
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
      link: "/integrations"
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
      name: "all map view",
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