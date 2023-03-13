import React, { useEffect, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { ColumnsType } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ReservationModal from "../../components/organism/Modals/ReservationModal";
import {useDisclosure} from '@chakra-ui/react'
import { selectReservations } from "../../redux/reservationSlice";
import useReservation from "../../hooks/useReservation";
import dayjs from "dayjs";
import { insertTableActions } from "../../utils/tables/utils";
import { FlexRowCenterBetween, FlexRowCenterStart } from "../../utils/theme/FlexConfigs";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { lowerCase } from "lodash";
import { ReservationColumns } from "../../utils/tables/TableTypes";
export interface DataType {
  id:number | undefined,
  reservationId:string,
  vehiclePlate:string,
  vehicleName:string,
  startEndTime:string,
  totalCost:number,
  hostName:string,
  location:string,
  status:string,
}

function Reservations() {
  const dispatch = useAppDispatch()
  const {isOpen, onClose, onOpen} = useDisclosure()
  const reservations = useAppSelector(selectReservations)
  const {fetchReservations, deleteReservation} = useReservation()
  const [toggleViewReservationModal, setToggleViewReservationModal] = useState(false)
  const [toggleEditReservationModal, setToggleEditReservationModal] = useState(false)
  const [reservationData, setReservationData] = useState<DataType[]>([])
  const [reservationId, setReservationId] = useState<null|number|string>(null)

  useEffect(() => {
    fetchReservations()
  },[])


  useEffect(()=>{
    setReservationData(()=>reservations.map((reservation)=>({
      id:reservation?.id,
      reservationId: reservation?.reservation_id,
      vehiclePlate:reservation?.plate,
      vehicleName:`${reservation?.make} ${reservation?.model}`,
      startEndTime:`${dayjs(reservation?.start_date_time).format("DD/MM/YYYY h:mm A")} ${dayjs(reservation?.end_date_time).format("DD/MM/YYYY h:mm A")}`,
      totalCost:reservation?.total_cost,
      hostName:reservation?.host_handle,
      location:`${reservation?.address} ${reservation?.building_name}`,
      status:lowerCase(reservation?.status),
    })))
  }, [reservations])
  
 
  const changeStateViewModal = () => {
    setToggleViewReservationModal(!toggleViewReservationModal)
  }
  const changeStateEditModal = () => {
    setToggleEditReservationModal(!toggleEditReservationModal)
  }
  const showViewReservationModal = (reservation_id:string) => {
    onOpen()
    changeStateViewModal()
    setReservationId(reservation_id)
  }
  const showEditReservationModal = (id:number) => {
    onOpen()
    changeStateEditModal()
    setReservationId(id)
  }
  return (
    <Flex w="full" h="full" data-testid="reservations-table">
      <ReservationModal isOpen={isOpen} onClose={onClose} toggleViewReservationModal = {toggleViewReservationModal} changeStateViewModal = {changeStateViewModal} toggleEditReservationModal = {toggleEditReservationModal} changeStateEditModal = {changeStateEditModal} reservationId={reservationId}/>
      <FilterableTable
        viewSearchField={true}
        viewSortablesField={true}
        columns={insertTableActions(ReservationColumns, (i, data) => {
          return (
            <Flex {...FlexRowCenterBetween}>
              <IconButton
                aria-label="View"
                icon={<ViewIcon />}
                size="sm"
                onClick={() => showViewReservationModal(data.reservationId)}
                marginRight='4'
              />
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                size="sm"
                onClick={() => {
                  showEditReservationModal(data.id)
                }}
                marginRight='4'
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => {
                  deleteReservation(data.id)
                }}
                color="cancelled.1000"
              />
            </Flex>
          );
        })}
        data={reservationData}
        sortables={[
          {
            columnKey: "vehiclePlate",
            columnName: "Vehicle Plate",
          }
        ]}
      />
    </Flex>
  );
}

export default Reservations;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
