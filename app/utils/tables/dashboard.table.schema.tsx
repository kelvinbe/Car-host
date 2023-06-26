import { ColumnsType } from "antd/es/table";
import { IReservation, IUserProfile, IVehicle, IWithdrawals } from "../../globaltypes";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import StatusTag from "../../components/atoms/status/StatusTag";
import { FlexColStartStart } from "../theme/FlexConfigs";
import { get_formatted_date } from "../utils";



export const DashboardReservations: ColumnsType<IReservation & {
    user: Partial<IUserProfile>,
    vehicle: Partial<IVehicle>
}> = [
    {
        title: "Customer",
        dataIndex: "user",
        key: "user",
        render: (v, {user}) =>{
            return (
                <div className="flex flex-row items-center justify-start gap-x-3">
                    <Avatar src={user?.profile_pic_url} name={user?.email} />
                    <Text>
                        { (user?.fname || user?.lname) ? `${user?.fname ?? ""} ${user?.lname ?? ""}` : user?.email }
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Vehicle",
        dataIndex: "vehicle",
        key: "vehicle",
        render: (v, {vehicle}) =>{
            return (
                <div className="flex flex-row items-center justify-start gap-x-3">
                    <Avatar src={vehicle?.pictures?.[0]} name={vehicle?.make} />
                    <Text>
                        {vehicle?.make ?? ""} {vehicle?.model ?? ""}
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Starting",
        dataIndex: "start_date_time",
        key: "start_date_time",
        render: (v, {start_date_time}) => {
            return (
                <Text fontSize="14px" fontWeight="500">
                    {
                        get_formatted_date(start_date_time)
                    }
            </Text>
            )
        }
    },
    {
        title: "Amount",
        dataIndex: "payment",
        key: "payment",
        render: (v, {payment}) => {
            return (
                <Text fontSize="14px" fontWeight="500">
                    {payment?.amount ?? 0}
                </Text>
            )
        }
    }
]



export const DashboardWithdrawals: ColumnsType<IWithdrawals> = [
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
]