import { ColumnsType } from "antd/es/table";
import { IReservation, IStation, IUserProfile, IVehicle, IWithdrawals } from "../../globaltypes";
import { Avatar, Flex, Icon, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import StatusTag from "../../components/atoms/status/StatusTag";
import { FlexColStartStart, FlexRowCenterStart } from "../theme/FlexConfigs";
import { get_formatted_date } from "../utils";
import { SettingsIcon } from "@chakra-ui/icons";
import { RiUserLocationFill } from "react-icons/ri";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)



export const UserManagementTable: ColumnsType<IUserProfile & {
    agg: {
        vehicles: number
        reservations: number 
    }
}> = [
    {
        title: "UID",
        dataIndex: "uid",
        key: "uid",
        render: (uid) => {
            return (
                <Text fontWeight="hairline" fontSize="xs">
                    {uid}
                </Text>
            )
        }
    },
    {
        title: "User Type",
        dataIndex: "user_type",
        key: "user_type",
        render: (user_type, { is_admin }) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {is_admin ? (
                        <Tag
                            colorScheme="green"
                            rounded="md"
                            variant="solid"
                        >
                            <TagLeftIcon boxSize="12px" as={SettingsIcon} />
                            <TagLabel>
                                admin
                            </TagLabel>
                        </Tag>
                    ) : user_type}
                </Text>
            )
        }
    },
    {
        title: "Name",
        dataIndex: "fname",
        key: "fname",
        render: (fname, {lname, profile_pic_url, email}) => {
            return (
                <Flex {...FlexRowCenterStart} className="gap-x-5" >
                    <Avatar src={profile_pic_url} 
                        size="sm"
                        name={(fname || lname) ? `${fname ?? ""} ${lname ?? ""}` : `${email}`}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                        {
                            (fname || lname) ? `${fname ?? ""} ${lname ?? ""}` : `No name`
                        }
                    </Text>
                </Flex>
            )
        }
    },
    {
        title: "Handle",
        dataIndex: "handle",
        key: "handle",
        render: (handle) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {handle}
                </Text>
            )
        }
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (email) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {email}
                </Text>
            )
        }
    },
    {
        title: "Market and Submarket",
        dataIndex: "market",
        key: "market",
        render: (_, {market, sub_market}) => {
            return (
                <div className="flex flex-row items-center justify-start w-full gap-x-5">
                    {
                        (isEmpty(market) || isEmpty(sub_market)) ? (
                            <Tag
                                colorScheme="red"
                                rounded="md"
                                variant="solid"
                            >
                                <TagLabel>
                                    Not set
                                </TagLabel>
                            </Tag>
                        ): (
                            <>
                                <Icon as={RiUserLocationFill} color="primary.1000" />
                                <Text fontWeight="light" fontSize="sm">
                                    {sub_market?.name},
                                    {market?.name} 
                                </Text>
                            </>
                        )
                    }
                </div>
            )
        }
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: (phone) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {phone ?? "No phone provided"}
                </Text>
            )
        }
    },
    {
        title: "Vehicles",
        dataIndex: "agg",
        key: "agg",
        render: (_, {user_type, agg}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {agg?.vehicles === 0 ? (user_type === "CUSTOMER" ? "N/A" : "No created vehicles") : agg?.vehicles}
                </Text>
            )
        }
    },
    {
        title: "Reservations",
        dataIndex: "agg",
        key: "agg",
        render: (_, {user_type, agg}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {agg?.reservations === 0 ?  (user_type === "HOST" ? "N/A" : "No created reservations") : agg?.reservations}
                </Text>
            )
        }
    },
    {
        title: "Created",
        dataIndex: "created_at",
        key: "created_at",
        render: (created_at) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {dayjs(created_at).fromNow()}
                </Text>
            )
        }
    }
]

export const AllVehiclesTable: ColumnsType<IVehicle & {
    station: Partial<IStation>,
    host: Partial<IUserProfile & {
        market: Partial<{
            name: string
            currency: string
        }>
    }>,
}> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (id) => {
            return (
                <Text fontWeight="hairline" fontSize="xs">
                    {id}
                </Text>
            )
        }
    },
    {
        title: "Name",
        dataIndex: "model",
        key: "model",
        render: (_, {make, model, year, plate}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {`${make} ${model} ${year} (${plate})`}
                </Text>
            )
        }
    },
    {
        title: "Owner",
        dataIndex: "host",
        key: "host",
        render: (_, {host}) => {
            return (
                <div className="flex flex-row items-center justify-start space-x-2">
                    <Avatar src={host?.profile_pic_url}
                        size="sm"
                        name={`${host?.fname ?? ""} ${host?.lname ?? ""}`}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                        {`${host?.fname ?? ""} ${host?.lname ?? ""}`}
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Station",
        dataIndex: "station",
        key: "station",
        render: (_, {station}) => {
            return (
                <div className="flex flex-row items-center justify-start space-x-2">
                    <Avatar src={station?.image}
                        size="sm"
                        name={station?.name}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                        {
                            station?.name
                        }
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Hourly Rate",
        dataIndex: "hourly_rate",
        key: "hourly_rate",
        render: (hourly_rate, {host}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {host?.market?.currency} {hourly_rate}
                </Text>
            )
        }
    },
    {
        title: "Created",
        dataIndex: "created_at",
        key: "created_at",
        render: (created_at) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {dayjs(created_at).fromNow()}
                </Text>
            )
        }
    }
]

export const AllReservationsTable: ColumnsType<IReservation & {
    vehicle: Partial<IVehicle & {
        host: Partial<IUserProfile & {
            market: Partial<{
                name: string
                currency: string
            }>
        }>
    }>
    user: Partial<IUserProfile>
}> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (id) => {
            return (
                <Text fontWeight="hairline" fontSize="xs">
                    {id}
                </Text>
            )
        }
    },
    {
        title: "Customer",
        dataIndex: "user",
        key: "user",
        render: (_, {user}) => {
            return (
                <div className="flex flex-row items-center justify-start space-x-2">
                    <Avatar src={user?.profile_pic_url}
                        size="sm"
                        name={`${user?.fname ?? ""} ${user?.lname ?? ""} ${user?.email ?? ""}`}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                        {`${user?.fname ?? ""} ${user?.lname ?? ""} ${user?.email ?? ""}`}
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Host",
        dataIndex: "vehicle",
        key: "vehicle",
        render: (_, {vehicle}) => {
            return (
                <div className="flex flex-row items-center justify-start space-x-2">
                   <Avatar src={vehicle?.host?.profile_pic_url}
                        size="sm"
                        name={`${vehicle?.host?.fname ?? ""} ${vehicle?.host?.lname ?? ""}`}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                        {`${vehicle?.host?.fname ?? ""} ${vehicle?.host?.lname ?? ""}`}
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Vehicle",
        dataIndex: "vehicle",
        key: "vehicle",
        render: (_, {vehicle}) => {
            return (
                <div className="flex flex-row items-center justify-start space-x-2">
                    <Avatar src={vehicle?.pictures?.[0]}
                        size="sm"
                        name={`${vehicle?.make ?? ""} ${vehicle?.model ?? ""}`}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                        {`${vehicle?.make} ${vehicle?.model} ${vehicle?.year} (${vehicle?.plate})`}
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Station",
        dataIndex: "vehicle",
        key: "vehicle",
        render: (_, {vehicle}) => {
            return (
                <div className="flex flex-row items-center justify-start space-x-2">
                    <Avatar src={vehicle?.station?.image}
                        size="sm"
                        name={vehicle?.station?.name}
                    />
                    <Text fontWeight="bold" fontSize="sm">
                        {
                            vehicle?.station?.name
                        }
                    </Text>
                </div>
            )
        }
    },
    {
        title: "Hourly Rate",
        dataIndex: "vehicle",
        key: "vehicle",
        render: (_, {vehicle}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {vehicle?.host?.market?.currency} {vehicle?.hourly_rate}
                </Text>
            )
        }
    },
    {
        title: "Payment",
        dataIndex: "payment",
        key: "payment",
        render: (_, {payment, vehicle}) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {vehicle?.host?.market?.currency} {payment?.amount}
                </Text>
            )
        }
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => {
            return (
                <StatusTag status={status} >
                    {status}
                </StatusTag>
            )
        }
    },
    {
        title: "Start",
        dataIndex: "start_date_time",
        key: "start_date_time",
        render: (start_date_time) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {get_formatted_date(start_date_time)}
                </Text>
            )
        }
    },
    {
        title: "End",
        dataIndex: "end_date_time",
        key: "end_date_time",
        render: (end_date_time) => {
            return (
                <Text fontWeight="bold" fontSize="sm">
                    {get_formatted_date(end_date_time)}
                </Text>
            )
        }
    },
]


