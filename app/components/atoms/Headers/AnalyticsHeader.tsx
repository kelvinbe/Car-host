import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectUser } from "../../../redux/userSlice";
import { fetchEarningsData, fetchVehicleList, selectVehicleListFeedback } from "../../../redux/analyticsSlice";
import { getYearsSinceJoined } from "../../../utils/utils";

const AnalyticsHeader = () => {
  const [vehicle_id, set_vehicle_id] = useState<string>("all")
  const [interval, set_interval] = useState<"monthly" | "yearly">("monthly")
  const [year, set_year] = useState(new Date().getFullYear())
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const {data: vehicle_list, loading} = useAppSelector(selectVehicleListFeedback)
  const [years, set_years] = useState<number[]>([])

  useEffect(()=>{
    dispatch(fetchEarningsData({
      vehicle_id,
      interval,
      year
    }))
  }, [vehicle_id, interval, year])

  useEffect(()=>{
    const y = getYearsSinceJoined()
    set_years(y)
  },[user])

  useEffect(()=>{
    dispatch(fetchVehicleList())
  }, [])
 
  return (
    <div className="grid grid-cols-5 w-full items-end justify-start gap-x-4">
      <div className="col-span-1 flex flex-row items-end justify-start gap-x-3 w-full">
        <Text variant={"label"} >General earnings: </Text>
        <Text>
          {user?.market?.currency} {user?.earnings?.all_time}
        </Text>
      </div>
      <div className="col-span-2 flex flex-row items-center justify-start gap-x-3 w-full">
          <div className="flex flex-row items-center justify-start gap-x-1">
              <Text className="text-black font-semibold text-sm" > Earnings </Text>
              <span className="text-red-500" >
                &bull;
              </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-1">
              <Text className="text-black font-semibold text-sm" > Reservations </Text>
              <span className="text-black" >
                &bull;
              </span>
          </div>
      </div>
      <div className="col-span-2 flex flex-row items-center justify-end gap-x-5">
        <FormControl>
          <FormLabel sx={{m: 0, p:0}} >
            <Text className="text-black font-semibold text-sm" >
              Select a vehicle
            </Text>
          </FormLabel>
          <Select
            disabled={loading}
            value={vehicle_id}
            onChange={(e)=>{
              set_vehicle_id(e?.target?.value as string)
            }}
            size={"sm"}
          >
            <option value="all">All</option>
            {
              vehicle_list?.map((vehicle)=>{
                return <option key={vehicle.id} value={vehicle.id} >
                  {
                    vehicle?.name
                  }
                </option>
              }) 
            }
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel sx={{m: 0, p:0}} >
            <Text className="text-black font-semibold text-sm" >
              Select an interval
            </Text>
          </FormLabel>
          <Select
            value={interval}
            onChange={(e)=>{
              set_interval(e?.target?.value as "monthly" | "yearly")
            }}
            size={"sm"}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </FormControl>
        {(interval === "monthly") && <FormControl>
          <FormLabel sx={{m: 0, p:0}} >
            <Text className="text-black font-semibold text-sm" >
              Select a year
            </Text>
          </FormLabel>
          <Select
            onChange={(e)=>{
              set_year(Number(e?.target?.value))  
            }}
            value={year}
            size={"sm"}
          >
            {
              years?.map((year)=>{
                return <option key={year} value={year} >{year}</option>
              })
            }
          </Select>
        </FormControl>}
      </div>
    </div>
  );
};

export default AnalyticsHeader;
