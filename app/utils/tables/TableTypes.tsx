import { Flex, IconButton, Text, Avatar } from "@chakra-ui/react";
import { ColumnsType } from "antd/es/table";
import {
  IAuthCode,
  ILocation,
  IPayout,
  IReservation,
  IUserProfile,
  IVehicle,
  IIntegrations,
  IStation,
  IRequestedAuthCode
} from "../../globaltypes";
import dayjs from "dayjs";
import { FlexColCenterCenter, FlexColStartStart, FlexRowStartStart } from "../theme/FlexConfigs";
import VehiclePic from "../../components/atoms/images/VehiclePic";
import StatusTag from "../../components/atoms/status/StatusTag";
import { LinkIcon } from "@chakra-ui/icons";
import { IVehicleDetails } from "../../globaltypes";
import { DataType } from "../../pages/reservations";
import { useEffect, useState } from "react";
import ViewVehicleModal from "../../components/organism/Modals/ViewVehicleModal";
import { useDisclosure } from "@chakra-ui/react";
import { selectVehicles } from "../../redux/vehiclesSlice";
import { useAppSelector } from "../../redux/store";
import useVehicles from "../../hooks/useVehicles";
import { useFetchData } from "../../hooks";
import { getUsers, selectUsers } from "../../redux/userSlice";
import { USERS_DOMAIN } from "../../hooks/constants";
import ViewUserModal from "../../components/organism/Modals/ViewUserModal";

interface IProps{
  vehicle_id:number,
}

interface IUserProps{
  user_id:number,
  profilePicUrl:string
}
const GetVehicleDetails = ({vehicle_id}:IProps) => {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const vehicles = useAppSelector(selectVehicles)
  const {fetchVehicles} = useVehicles()

  useEffect(() => {
    fetchVehicles()
  },[])

  return (
    <>
    <ViewVehicleModal isOpen={isOpen} onClose={onClose} vehicleId={vehicle_id} vehicles={vehicles}/>
    <Flex {...FlexColStartStart}>
      <button onClick={onOpen}>
        <Text
          cursor="pointer"
          borderBottom="1px solid"
          borderBottomColor={"link"}
          fontSize="14px" 
          fontWeight="500"
        >
          {vehicle_id}
        </Text>
      </button>
      
    </Flex>
    </>
  )
}
const GetCustomerDetails = ({user_id, profilePicUrl}:IUserProps) => {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const {fetchData} = useFetchData(USERS_DOMAIN, getUsers)
  const users = useAppSelector(selectUsers)
  let selectedUser = users.find(user => user.user_id === user_id)

  useEffect(() => {
    fetchData()
  },[])

  return (
    <>
      {selectedUser && <ViewUserModal isOpen={isOpen} onClose={onClose} user={selectedUser}/>}
      <Flex {...FlexColStartStart} onClick={onOpen}>
        <Avatar
          src={profilePicUrl}
          size={'sm'}
        />
      </Flex>
    </>
  )
}

export const ReservationTableColumns: ColumnsType<DataType> = [
  {
    title: "Pickup",
    dataIndex: "startDateTime",
    key: "startDateTime",
    render: (v, { startDateTime }) => (
      <Flex {...FlexColCenterCenter}>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(startDateTime).format("DD MMM YYYY")}
        </Text>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(startDateTime).format("h:mm A")}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Dropoff",
    dataIndex: "endDateTime",
    key: "endDateTime",
    render: (v, { endDateTime }) => (
      <Flex {...FlexColCenterCenter}>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(endDateTime).format("DD MMM YYYY")}
        </Text>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(endDateTime).format("h:mm A")}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (v, { totalCost }) => (
      <Flex {...FlexColCenterCenter}>
        <Text fontSize="14px" fontWeight="500">
          {totalCost}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColCenterCenter}>
        <StatusTag status={status as any}>{status}</StatusTag>
      </Flex>
    ),
  }
];

export const PayoutsTableColumns: ColumnsType<IPayout> = [
  {
    title: "Payout Date",
    dataIndex: "payout_date",
    key: "payout_date",
    render: (v, { payout_date }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {payout_date}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (v, { amount }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          ${amount}
        </Text>
      </Flex>
    ),
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColStartStart}>
        <StatusTag status={status as any}>{status}</StatusTag>
      </Flex>
    ),
  },
];
export const AuthCodeTableColumns: ColumnsType<IAuthCode> = [
  {
    title: "Customer Image",
    dataIndex: "user_image",
    key: "user_image",
    render: (v, { user_image, user_id }) => (
      <GetCustomerDetails user_id={user_id} profilePicUrl={user_image}/>
    )
  },
  {
    title: "AuthCode",
    dataIndex: "code",
    key: "code",
    render: (v, { authcode }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {`${authcode.substring(0, 3)}***${authcode.substring(6,9)}`}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColStartStart}>
        <StatusTag status={status as any}>{status}</StatusTag>
      </Flex>
    ),
  },
];
export const RequestedAuthCodeTableColumns: ColumnsType<IRequestedAuthCode> = [
  
  {
    title: "Customer Image",
    dataIndex: "user_image",
    key: "user_image",
    render: (v, { user_image, user_id }) => (
      <GetCustomerDetails user_id={user_id} profilePicUrl={user_image}/>
    )
  },
  {
    title: "Vehicle ID",
    dataIndex: "vehicle_id",
    key: "vehicle_id",
    render: (v, { vehicle_id }) => (
      <GetVehicleDetails vehicle_id={vehicle_id}/>
    ),
  }
];
export const LocationVehicleMapTableColumns: ColumnsType<ILocation> = [
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (v, { vehicle: { vehiclePictures } }) => (
      <Flex alignItems={"center"} justifyContent="center" w="full">
        <VehiclePic image={vehiclePictures[0]} size="small" />
      </Flex>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColCenterCenter}>
        <StatusTag status={status as any}>{status}</StatusTag>
      </Flex>
    ),
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (v, { locationId }) => (
      <Flex {...FlexColCenterCenter}>
        <IconButton
          rounded="full"
          bg="transparent"
          icon={<LinkIcon />}
          aria-label="link"
        />
      </Flex>
    ),
  },
];
export const StationTableColumns: ColumnsType<IStation> = [
  {
    title: "Station Image",
    dataIndex: "station_image",
    key: "station_image",
    render: (v, { station_images }) => (
      <Flex {...FlexRowStartStart}>
        {station_images && <VehiclePic image={station_images[0]} size="small" />}
      </Flex>
    ),
  },
  {
    title: "Station Name",
    dataIndex: "station_name",
    key: "station_name",
    render: (v, { station_name }) => (
      <Flex{...FlexRowStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {station_name}
        </Text>
      </Flex>
    ),
    sorter: (a: IStation, b: IStation) => a.station_name.length - b.station_name.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (v, { description }) => (
      <Flex{...FlexRowStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {description}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Sub-Market",
    dataIndex: "sub_market_name",
    key: "sub_market_name",
    render: (v, { sub_market_name }) => (
      <Flex{...FlexRowStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {sub_market_name}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex{...FlexRowStartStart}>
        <StatusTag status={status as any}>{status}</StatusTag>
      </Flex>
    ),
  },
];

export const ReservationColumns: ColumnsType<any> = [
  {
    title: "Reservation Id",
    dataIndex: "reservationId",
    key: "reservationId",
  },
  {
    title: "Vehicle Plate",
    dataIndex: "vehiclePlate",
    key: "vehiclePlate",
  },
  {
    title: "Vehicle Name",
    dataIndex: "vehicleName",
    key: "vehicleName",
  },
  {
    title: "Start and End time",
    dataIndex: "startEndTime",
    key: "startEndTime",
  },
  {
    title: "Total cost",
    dataIndex: "totalCost",
    key: "totalCost",
    sorter: (a: DataType, b: DataType) => a.totalCost - b.totalCost,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Host",
    dataIndex: "hostName",
    key: "hostName",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColStartStart}>
        <StatusTag status={status as any}>{status}</StatusTag>
      </Flex>
    ),
  },
];
export const VehicleManagementTableColumns: ColumnsType<IVehicleDetails> = [
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (v, { vehicle_pictures }) => (
      <Flex {...FlexColStartStart} w="full">
        <VehiclePic image={vehicle_pictures[0]} size="small" />
      </Flex>
    ),
  },
  {
    title: "Plate",
    dataIndex: "plate",
    key: "plate",
    render: (v, { plate }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {plate}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Make",
    dataIndex: "make",
    key: "make",
    render: (v, { make }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {make}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
    render: (v, { model }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {model}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    render: (v, { year }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {year}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Transmission",
    dataIndex: "transmission",
    key: "transmission",
    render: (v, { transmission }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500" textTransform={'capitalize'}>
          {transmission}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    render: (v, { hourly_rate }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          ${hourly_rate}/hr
        </Text>
      </Flex>
    ),
    sorter: (a: IVehicleDetails, b: IVehicleDetails) => a.hourly_rate - b.hourly_rate,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColStartStart}>
        <StatusTag status={status as any}>
          {status}
        </StatusTag>
      </Flex>
    ),
  }
];

export const UserTableColumns: ColumnsType<IUserProfile> = [
  {
    title: "Avatar",
    dataIndex: "profilePicUrl",
    key: "profilePicUrl",
    render: (v, { profilePicUrl }) => {
      return (
        <Flex alignItems={"center"} justifyContent="center" w="full">
          <Avatar size="small" src={profilePicUrl} />
        </Flex>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (v, { fname, lname }) => (
      <Flex {...FlexColCenterCenter}>
        <Text fontSize="14px" fontWeight="500">
          {`${fname} ${lname}`}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (v, { email }) => (
      <Flex {...FlexColCenterCenter}>
        <Text fontSize="14px" fontWeight="500">
          {email}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Market Id",
    dataIndex: "marketId",
    key: "marketId",
    render: (v, { marketId }) => (
      <Flex {...FlexColCenterCenter}>
        <Text fontSize="14px" fontWeight="500">
          {marketId}
        </Text>
      </Flex>
    )
  }
]

export const IntegrationsTableColumns: ColumnsType<IIntegrations> = [
  {
    title: "Integration Name",
    dataIndex: "integrationName",
    key: "integrationName",
    render: (v, { integrationName }) => (
      <Flex {...FlexColStartStart} >
        <Text fontSize="14px" fontWeight="500" >
          {
            integrationName
          }
        </Text>
      </Flex>
    )
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColStartStart} >
        <StatusTag status={status as any}>
          {
            status
          }
        </StatusTag>
      </Flex>
    ),
  },
]