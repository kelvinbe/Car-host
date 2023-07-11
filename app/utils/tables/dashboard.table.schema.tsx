import { ColumnsType } from "antd/es/table";
import { IReservation, IUserProfile, IVehicle, IWithdrawals } from "../../globaltypes";
import { Avatar, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text, chakra } from "@chakra-ui/react";
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
    render: (v, { created_at: createdAt }) => (
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

export const ReservationsPendingConfirmationTableColumns: ColumnsType<Partial<IReservation> & {
    user?: Partial<IUserProfile>
    vehicle?: Partial<IVehicle>,
    current_host: Partial<IUserProfile>
}> = [
    {
        title: "Payment Made",
        dataIndex: "created_at",
        key: "created_at",
        render: (v, { created_at }) => {
            return (
                <div className="flex flex-row items-center justify-start" >
                    <span className="font-semibold">
                    {
                        get_formatted_date(created_at)
                    }
                    </span>
                </div>
            )
        }
    },
    {
        title: "User",
        dataIndex: "user",
        key: "user", 
        render: (v, { user }) => {
            return (
                <Popover
                    placement="bottom"
                    strategy="fixed"
                    trigger="hover"
                >
                    <PopoverTrigger>
                        <chakra.div role="button" className="flex flex-row items-center cursor-pointer hover:bg-slate-50 justify-start gap-x-5">
                            <Avatar src={user?.profile_pic_url} name={
                                (user?.fname || user?.lname)  ? `${user?.fname ?? ''} ${user?.lname ?? ''}` : user?.email
                            } />
                            <span className="font-semibold">
                                {(user?.fname || user?.lname)  ? `${user?.fname ?? ''} ${user?.lname ?? ''}` : user?.email}
                            </span>
                        </chakra.div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow/>
                        <PopoverHeader>
                            Contact information
                        </PopoverHeader>
                        <PopoverBody>
                            <div className="grid grid-cols-2 w-full">
                                <Text variant="label" >
                                    Email 
                                </Text>
                                <Text size="sm" >
                                    {user?.email}
                                </Text>
                                <Text variant="label" >
                                    Phone number
                                </Text>
                                <Text size="sm" >
                                    {user?.phone ?? "None provided"}
                                </Text>
                                <Text variant="label" >
                                    Handle
                                </Text>
                                <Text size="sm" >
                                    {user?.handle}
                                </Text>
                            </div>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
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
        title: "Hourly Rate",
        dataIndex: "vehicle",
        key: "vehicle_hourly_rate",
        render: (v, {vehicle, current_host}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                     {current_host?.market?.currency} {vehicle?.hourly_rate}
                </Text>
            )
        }
    },
    {
        title: "Amount Paid",
        dataIndex: "payment",
        key: "payment",
        render: (v, {payment, current_host}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {current_host?.market?.currency} {payment?.amount}
                </Text>
            )
        }
    },
    {
        title: "Pick Up Time", 
        dataIndex: "start_date_time",
        key: "start_date_time",
        render: (v, {start_date_time}) => {
            return (
                <Text fontWeight={'bold'} fontSize={'sm'} >
                    {
                        get_formatted_date(start_date_time)
                    }
                </Text>
            )
        }
    },
    {
        title: "Drop Time", 
        dataIndex: "end_date_time",
        key: "end_date_time",
        render: (v, {end_date_time}) => {
            return (
                <Text fontWeight={'bold'} fontSize={'sm'} >
                    {
                        get_formatted_date(end_date_time)
                    }
                </Text>
            )
        }
    },
    {
        title: "Duration",
        dataIndex: "start_date_time",
        key: "start_date_time",
        render: (v, { start_date_time, end_date_time }) => {
            return (
                <Text fontWeight={'bold'} fontSize={'sm'} >
                    {
                    dayjs(end_date_time).diff(dayjs(start_date_time), "hours") + " "
                    }
                     hours
                </Text>
            )
        }
    }
]