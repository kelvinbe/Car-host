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
  IRequestedAuthCode,
  PayoutMethods,
  IWithdrawals,
  IProperties
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
  vehicle_id:string,
}

interface IUserProps{
  user_id?:string,
  profilePicUrl?:string
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
      <button onClick={onOpen} data-cy={'view-requested-vehicle-button'}>
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
  const [userData, setUserData] = useState<IUserProfile | null>(null)


  const handleUserData = (data: IUserProfile) => {
    setUserData(data)
  }

  const {isOpen, onClose, onOpen} = useDisclosure()
  const { fetchData } = useFetchData(`${USERS_DOMAIN}?user_id=${user_id}`, handleUserData, true)
  const users = useAppSelector(selectUsers)

  useEffect(() => {
    fetchData()
  },[])

  return (
    <>
      {userData && <ViewUserModal isOpen={isOpen} onClose={onClose} user={userData as unknown as IUserProfile} />}
      <Flex {...FlexColStartStart} onClick={onOpen} data-cy={'view-customer-button'}>
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

export const AnalyticsTableColums: ColumnsType<Partial<IReservation>>=[
  {
    title: "Reservation ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Date",
    dataIndex: "start_date_time",
    key: "start_date_time",
    render: (v, { start_date_time }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(start_date_time).format('DD MMM, YYYY')}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Cost",
    dataIndex: "total",
    key: "total",
    align:'center',
    render: (v, { payment }) => (
      <Flex {...FlexColCenterCenter}>
        <Text fontSize="14px" fontWeight="500">
          {payment?.amount}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (v, { status }) => (
      <Flex {...FlexColCenterCenter}>
        <StatusTag status={status as any}>{status}</StatusTag>
      </Flex>
    ),
  }
]

export const PayoutsTableColumns: ColumnsType<IPayout> = [
  {
    title: "Payout Date",
    dataIndex: "payout_date",
    key: "payout_date",
    render: (v, { date: payout_date }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(payout_date).format('DD MMM, YYYY')}
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
          {amount}
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
export const WithdrawalsTableColumns: ColumnsType<IWithdrawals> = [
  {
    title: "Withdrawal Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (v, { createdAt: createdAt }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(createdAt).format('DD MMM, YYYY')}
        </Text>
      </Flex>
    ),
    sorter: (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (v, { amount }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {amount}
        </Text>
      </Flex>
    ),
    sortDirections: ["descend", "ascend"],
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

export const AdminWithdrawalsTableColumns: ColumnsType<IWithdrawals> = [
  {
    title: "Host",
    dataIndex: "user",
    key: "user_id",
    render: (v, { user: user})=> (
      <Flex gap={'3'} direction={'row'}>
        <Avatar
          src={user?.profile_pic_url}
          size="sm"
        />
        <Flex align={'center'}>
          <Text fontSize="14px" fontWeight="500">
            {`${user?.fname} ${user?.lname}`}
          </Text>
        </Flex>       
      </Flex>
    ),
  },
  {
    title: "Withdrawal Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (v, { createdAt: createdAt }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {dayjs(createdAt).format('DD MMM, YYYY')}
        </Text>
      </Flex>
    ),
    sorter: (a, b) => Number(new Date(b?.createdAt)) - Number(new Date(a?.createdAt))
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (v, { amount }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {amount}
        </Text>
      </Flex>
    ),
    sortDirections: ["descend", "ascend"],
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
    render: (v, { user}) => (
      <GetCustomerDetails user_id={user.id} profilePicUrl={user.profile_pic_url}/>
    )
  },
  {
    title: "AuthCode",
    dataIndex: "code",
    key: "code",
    render: (v, { code: authcode }) => (
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
export const RequestedAuthCodeTableColumns: ColumnsType<IAuthCode> = [
  
  {
    title: "Customer Image",
    dataIndex: "user_image",
    key: "user_image",
    render: (v, { user }) => (
      <GetCustomerDetails user_id={user?.id} profilePicUrl={user?.profile_pic_url}/>
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
    render: (v, { vehicle: { VehiclePictures } }) => (
      <Flex alignItems={"center"} justifyContent="center" w="full">
        <VehiclePic image={VehiclePictures[0]} size="small" />
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
    render: (v, { }) => (
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
export const StationTableColumns: ColumnsType<Partial<IStation>> = [
  {
    title: "Station Image",
    dataIndex: "station_image",
    key: "station_image",
    render: (v, { image }) => (
      <Flex {...FlexRowStartStart}>
        {image && <VehiclePic image={image} size="small" />}
      </Flex>
    ),
  },
  {
    title: "Station Name",
    dataIndex: "name",
    key: "name",
    render: (v, { name: station_name }) => (
      <Flex{...FlexRowStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {station_name}
        </Text>
      </Flex>
    ),
    sorter: (a: Partial<IStation>, b: Partial<IStation>) => (a?.name?.length ?? 0) - (b?.name?.length ?? 0),
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
    render: (v, { sub_market }) => (
      <Flex{...FlexRowStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {sub_market?.name}
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
export const AllReservationColumns: ColumnsType<any> = [
  {
    title: "Reservation Id",
    dataIndex: "reservationId",
    key: "reservationId",
  },
  {
    title: "Host Id",
    dataIndex: "hostId",
    key: "hostId",
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
  }
]    
export const ReservationColumns: ColumnsType<Partial<IReservation>> = [
  {
    title: "Reservation Id",
    dataIndex: "id",
    key: "id",
    render: (v, { id }) => {
      return (
        <Flex {...FlexColStartStart}>
          <Text fontSize="14px" fontWeight="500">
            {id}
          </Text>
        </Flex>
      )
    }
  },
  {
    title: "Vehicle Plate",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (v, {vehicle}) => {
      return (
        <Flex {...FlexColStartStart}>
          <Text fontSize="14px" fontWeight="500">
            {vehicle?.plate}
          </Text>
        </Flex>
      )
    }
  },
  {
    title: "Vehicle Name",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (v, {vehicle}) => {
      return (
        <Flex {...FlexColStartStart}>
          <Text fontSize="14px" fontWeight="500">
            {vehicle?.make} {vehicle?.model}
          </Text>
        </Flex>
      )
    }
  },
  {
    title: "Start ",
    dataIndex: "start_date_time",
    key: "start_date_time",
    render: (v, { start_date_time }) => {
      return (
        <Flex {...FlexColStartStart}>
          <Text fontSize="14px" fontWeight="500">
            {
              dayjs().isSame(dayjs(start_date_time), 'day') ? 'Today at '+dayjs(start_date_time).format('hh:mm A') : 
              dayjs().isSame(dayjs(start_date_time).add(1, 'day'), 'day') ? 'Tomorrow at '+dayjs(start_date_time).format('hh:mm A') :
              dayjs().isSame(dayjs(start_date_time).subtract(1, 'day'), 'day') ? 'Yesterday at'+dayjs(start_date_time).format('hh:mm A') :
              dayjs().isSame(dayjs(start_date_time), 'week') ? dayjs(start_date_time).format('dddd hh:mm A') :
              dayjs().isSame(dayjs(start_date_time), 'month') ? dayjs(start_date_time).format('DD hh:mm A') :
              dayjs().isSame(dayjs(start_date_time), 'year') ? dayjs(start_date_time).format('DD MMM hh:mm A') :
              dayjs(start_date_time).format('DD MMM, YYYY')
            }
          </Text>
        </Flex>
      )
    }
  },
  {
    title: "End ",
    dataIndex: "end_date_time",
    key: "end_date_time",
    render: (v, { end_date_time }) => {
      return (
        <Flex {...FlexColStartStart}>
          <Text fontSize="14px" fontWeight="500">
            {
              dayjs().isSame(dayjs(end_date_time), 'day') ? 'Today at '+dayjs(end_date_time).format('hh:mm A') : 
              dayjs().isSame(dayjs(end_date_time).add(1, 'day'), 'day') ? 'Tomorrow at '+dayjs(end_date_time).format('hh:mm A') :
              dayjs().isSame(dayjs(end_date_time).subtract(1, 'day'), 'day') ? 'Yesterday at'+dayjs(end_date_time).format('hh:mm A') :
              dayjs().isSame(dayjs(end_date_time), 'week') ? dayjs(end_date_time).format('dddd hh:mm A') :
              dayjs().isSame(dayjs(end_date_time), 'month') ? dayjs(end_date_time).format('DD hh:mm A') :
              dayjs().isSame(dayjs(end_date_time), 'year') ? dayjs(end_date_time).format('DD MMM hh:mm A') :
              dayjs(end_date_time).format('DD MMM, YYYY')
            }
          </Text>
        </Flex>
      )
    }
  },
  {
    title: "Total cost",
    dataIndex: "payment",
    key: "payment",
    render: (v, { payment, vehicle }) => {
      return (
        <Flex {...FlexColStartStart}>
          <Text fontSize="14px" fontWeight="500">
            {payment?.amount}
          </Text>
        </Flex>
      )
    }
  },
  {
    title: "Station",
    dataIndex: "vehicle",
    key: "station",
    render: (v, { vehicle }) => {
      return (
        <Flex {...FlexColStartStart}>
          <Text fontSize="14px" fontWeight="500">
            {vehicle?.station?.name}
          </Text>
        </Flex>
      )
    }
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
export const VehicleManagementTableColumns: ColumnsType<Partial<IVehicle>> = [
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (v, { pictures: vehicle_pictures }) => (
      <Flex {...FlexColStartStart} w="full">
        <VehiclePic image={vehicle_pictures?.[0]} size="small" />
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
    dataIndex: "hourly_rate",
    key: "hourly_rate",
    render: (v, { hourly_rate }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {hourly_rate}/hr
        </Text>
      </Flex>
    ),
    sorter: (a: Partial<IVehicle>, b: Partial<IVehicle>) => (a?.hourly_rate ?? 0) - (b?.hourly_rate ?? 0),
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
    render: (v, { profile_pic_url: profilePicUrl }) => {
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
export const CardTableColumns: ColumnsType<PayoutMethods> = [
  {
    title: "Payout Id",
    dataIndex: "payout_id",
    key: "payout_id",
    render: (v, {connected_account_id}) => (
      <Flex {...FlexColStartStart}>
        <Text>{connected_account_id}</Text>
      </Flex>
    ),
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
  }
];

export const PropertiesTableColumns: ColumnsType<IProperties> = [
  {
    title: "Properties Name",
    dataIndex: "propertiesName",
    key: "propertiesName",
    render: (v, { propertiesName }) => (
      <Flex {...FlexColStartStart} >
        <Text fontSize="14px" fontWeight="500" >
          {
            propertiesName
          }
        </Text>
      </Flex>
    )
  },

  {
    title: "Bedrooms",
    dataIndex: "bedrooms",
    key: "bedrooms",
    render: (v, { bedrooms }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {bedrooms}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Beds",
    dataIndex: "beds",
    key: "beds",
    render: (v, { beds }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {beds}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Baths",
    dataIndex: "baths",
    key: "baths",
    render: (v, { baths }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500">
          {baths}
        </Text>
      </Flex>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: (v, { location }) => (
      <Flex {...FlexColStartStart}>
        <Text fontSize="14px" fontWeight="500" textTransform={'capitalize'}>
          {location}
        </Text>
      </Flex>
    ),
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