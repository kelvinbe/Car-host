import { Flex, IconButton, Text } from "@chakra-ui/react"
import { ColumnsType } from "antd/es/table"
import { ILocation, IPayout, IReservation, IUserProfile, IVehicle } from "../../globaltypes"
import dayjs from "dayjs"
import { FlexColCenterCenter } from "../theme/FlexConfigs"
import VehiclePic from "../../components/atoms/images/VehiclePic"
import StatusTag from "../../components/atoms/status/StatusTag"
import { LinkIcon } from "@chakra-ui/icons"
import { Avatar } from "antd"


export const ReservationTableColumns: ColumnsType<IReservation> = [
    {
      title: "Pickup",
      dataIndex: "startDateTime",
      key: "startDateTime",
      render: (v, { startDateTime }) => (
        <Flex {...FlexColCenterCenter} >
          <Text fontSize="14px" fontWeight="500" >
            {
              dayjs(startDateTime).format("DD MMM YYYY")
            }
          </Text>
          <Text fontSize="14px" fontWeight="500" >
            {
              dayjs(startDateTime).format("h:mm A")
            }
          </Text>
        </Flex>
      )
    },
    {
      title: "Dropoff",
      dataIndex: "endDateTime",
      key: "endDateTime",
      render: (v, { endDateTime }) => (
        <Flex {...FlexColCenterCenter} >
          <Text fontSize="14px" fontWeight="500" >
            {
              dayjs(endDateTime).format("DD MMM YYYY")
            }
          </Text>
          <Text fontSize="14px" fontWeight="500" >
            {
              dayjs(endDateTime).format("h:mm A")
            }
          </Text>
        </Flex>
      )
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (v, { total }) => (
        <Flex {...FlexColCenterCenter} >
          <Text fontSize="14px" fontWeight="500" >
            {
              total
            }
          </Text>
        </Flex>
      )
    },
    {
      title: "Vehicle",
      dataIndex: "vehiclePicUrl",
      key: "vehiclePicUrl",
      render: (v, { vehiclePicUrl }) => (
        <Flex alignItems={"center"} justifyContent="center" w="full"   >
          <VehiclePic
            image={vehiclePicUrl}
            size="small"
          />
        </Flex>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v, { status }) => (
        <Flex {...FlexColCenterCenter} >
          <StatusTag status={status as any} >
            {status}
          </StatusTag>
        </Flex>
      )
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (v, { hostId }) => (
        <Flex {...FlexColCenterCenter} >
          <IconButton rounded="full" bg="transparent" icon={<LinkIcon/>}  aria-label="link" />
        </Flex>
      )
    }
]

export const PayoutsTableColumns: ColumnsType<IPayout> = [
  {
    title: "Pay Date",
    dataIndex: "payDate",
    key: "payDate",
    render: (v, { payDate }) => (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            dayjs(payDate).format("DD MMM YYYY")
          }
        </Text>
      </Flex>
    )
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (v, { amount }) => (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            amount
          }
        </Text>
      </Flex>
    ),
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.amount - b.amount
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, { status }) => (
      <Flex {...FlexColCenterCenter} >
        <StatusTag status={status as any} >
            {status}
        </StatusTag>
      </Flex>
    )
  }
]


export const LocationTableColumns: ColumnsType<ILocation> = [
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (v, {vehicle: {vehiclePictures}})=> (
      <Flex alignItems={"center"} justifyContent="center" w="full"   >
        <VehiclePic
          image={vehiclePictures[0]}
          size="small"
        />
      </Flex>
    )
  },
  {
    title: "Location Id",
    dataIndex: "locationId",
    key: "locationId",
    render: (v, {locationId})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            locationId
          }
        </Text>
      </Flex>
    )
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (v, {address})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            address
          }
          </Text>
      </Flex>
    )
  },
  {
    title: "Market Name",
    dataIndex: "marketName",
    key: "marketName",
    render: (v, {marketName})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            marketName
          }
        </Text>
      </Flex>
    )
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v, {status})=> (
      <Flex {...FlexColCenterCenter} >
        <StatusTag status={status as any} >
            {status}
        </StatusTag>

      </Flex>
    )
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (v, {locationId})=> (
      <Flex {...FlexColCenterCenter} >
        <IconButton rounded="full" bg="transparent" icon={<LinkIcon/>}  aria-label="link" />
      </Flex>

    )
  }
]


export const VehicleManagementTableColumns: ColumnsType<IVehicle> = [
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (v, {vehiclePictures})=> (
      <Flex alignItems={"center"} justifyContent="center" w="full"   >
        <VehiclePic
          image={vehiclePictures[0]}
          size="small"
        />
      </Flex>
    )
  },
  {
    title: "Vehicle Id",
    dataIndex: "vehicleId",
    key: "vehicleId",
    render: (v, {vehicleId})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            vehicleId
          }
        </Text>
      </Flex>
    )
  },
  {
    title: "Vehicle Type",
    dataIndex: "vehicleType",
    key: "vehicleType",
    render: (v, {vehicleType})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            vehicleType
          }
          </Text>
      </Flex>
    )
  },
  {
    title: "Vehicle Model",
    dataIndex: "vehicleModel",
    key: "vehicleModel",
    render: (v, {vehicleModel})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            vehicleModel
          }
        </Text>
      </Flex>
    )
  },
  {
    title: "LocationId",
    dataIndex: "locationId",
    key: "locationId",
    render: (v, {locationId})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            locationId
          }
        </Text>
      </Flex>
    )
  }
]


export const UserTableColumns: ColumnsType<IUserProfile> = [
  {
    title: "Avatar",
    dataIndex: "profilePicUrl",
    key: "profilePicUrl",
    render: (v, {profilePicUrl})=> {
      return (
        <Flex alignItems={"center"} justifyContent="center" w="full"   >
          <Avatar
            size="small"
            src={profilePicUrl}
          />
        </Flex>
      )
    }
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (v, { fname, lname })=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            `${fname} ${lname}`
          }
          </Text>
      </Flex>
    )
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (v, {email})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            email
          }
        </Text>
      </Flex>
    )
  },
  {
    title: "Market Id",
    dataIndex: "marketId",
    key: "marketId",
    render: (v, {marketId})=> (
      <Flex {...FlexColCenterCenter} >
        <Text fontSize="14px" fontWeight="500" >
          {
            marketId
          }
        </Text>
      </Flex>
    )
  }
]
