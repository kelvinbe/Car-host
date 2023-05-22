import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AnalyticsHeader from "../../atoms/Headers/AnalyticsHeader";
import { Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectEarnings, fetchEarnings } from "../../../redux/earningSlice";
import useVehicles from "../../../hooks/useVehicles";
import { IAnalyticsData } from "../../../globaltypes";

interface IProps {
  vehicleId?: string;
  setVehicleId: (vehicleId?: string)=>void;
  handleVehicleSelect: (vehicle: string)=>void;
  handleCalendarTypeSelect: (calendarType: string)=>void;
  timeRange: string;
  setTimeRange: (timeRange: string)=>void;
  earnings: IAnalyticsData[]
}
const AnalyticsChart = (props: IProps) => {
  const {vehicleId, setVehicleId, handleCalendarTypeSelect, handleVehicleSelect, timeRange, setTimeRange, earnings} = props
  const {allVehicles}=useVehicles()
  const dispatch = useAppDispatch();

  useEffect(()=>{
    vehicleId && dispatch(fetchEarnings({vehicle_id: vehicleId, time_range: timeRange}))
  },[vehicleId, timeRange])

  useEffect(()=>{
    allVehicles.length>0 && setVehicleId(allVehicles[0].id)
  },[allVehicles])
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Flex paddingBottom={"60px"}>
        <AnalyticsHeader
          handleCalendarTypeSelect={handleCalendarTypeSelect}
          handleVehicleSelect={handleVehicleSelect}
          vehicles = {allVehicles}
        />
      </Flex>
      <ResponsiveContainer>
        <AreaChart
          data={earnings}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F4A9A3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F4A9A3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#E74236"
            fill="url(#gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
