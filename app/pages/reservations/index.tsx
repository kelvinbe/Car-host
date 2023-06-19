import React, { useEffect, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ReservationModal from "../../components/organism/Modals/ReservationModal";
import { useDisclosure } from "@chakra-ui/react";
import { fetchReservations, selectReservations, selectReservationsFeedback, selectReservationsPaginationState } from "../../redux/reservationSlice";
import useReservation from "../../hooks/useReservation";
import { insertTableActions } from "../../utils/tables/utils";
import { FlexRowCenterBetween } from "../../utils/theme/FlexConfigs";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { isEmpty, isNull, lowerCase } from "lodash";
import { ReservationColumns } from "../../utils/tables/TableTypes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import { IReservation } from "../../globaltypes";
export interface DataType {
  reservationId: string;
  vehiclePlate: string;
  vehicleName: string;
  startEndTime: string;
  startDateTime?: string;
  endDateTime?: string;
  totalCost: number;
  hostName: string;
  location: string;
  status: string;
}

function Reservations() {
  const feedback = useAppSelector(selectReservationsFeedback)
  const { current_page, current_size} = useAppSelector(selectReservationsPaginationState)
  const dispatch = useAppDispatch()
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [toggleViewReservationModal, setToggleViewReservationModal] =
    useState(false);
  const [toggleEditReservationModal, setToggleEditReservationModal] =
    useState(false);
  const [search, setSearch] = useState<string>("");
  const { deleteReservation } = useReservation();
  const [currentReservation, setCurrentReservation] = useState<string>()
  const [currentVehicle, setCurrentVehicle] = useState<string>()


  useEffect(() => {
    dispatch(fetchReservations({
      search: search
    }))
  }, [search])

  const changeStateViewModal = () => {
    setToggleViewReservationModal(!toggleViewReservationModal);
  };
  const changeStateEditModal = () => {
    setToggleEditReservationModal(!toggleEditReservationModal);
  };
  const showViewReservationModal = (id: string) => {
    setCurrentReservation(id)
    const reservation = feedback?.data?.find((reservation) => reservation.id === id)
    setCurrentVehicle(reservation?.vehicle_id?.toString())
    onOpen();
    changeStateViewModal();
  };
  const showEditReservationModal = (id: string) => {
    setCurrentReservation(id)
    const reservation = feedback?.data?.find((reservation) => reservation.id === id)
    setCurrentVehicle(reservation?.vehicle_id?.toString())
    onOpen();
    changeStateEditModal();

  };



  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Flex w="full" h="full" data-testid="reservations-table">
        <ReservationModal
          isOpen={isOpen}
          onClose={onClose}
          toggleViewReservationModal={toggleViewReservationModal}
          changeStateViewModal={changeStateViewModal}
          toggleEditReservationModal={toggleEditReservationModal}
          changeStateEditModal={changeStateEditModal}
          reservationId={currentReservation}
          vehicleId={currentVehicle}
        />
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
                  onClick={() => showViewReservationModal(data.id)}
                  marginRight="4"
                  data-cy={"view-button"}
                />
                {/* <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => {
                    showEditReservationModal(data.id);
                  }}
                  marginRight="4"
                  data-cy={"edit-button"}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => {
                    deleteReservation(data.id);
                  }}
                  color="cancelled.1000"
                  data-cy={"delete-button"}
                /> */}
              </Flex>
            );
          })}
          pagination={{
            position: ["bottomCenter"],
            onChange: (page, pageSize) => {
              dispatch(fetchReservations({ page, size: pageSize }))
            },
            total: ((current_page ?? 0) * (current_size ?? 0)) + (
              feedback?.data?.length < (current_size ?? 0) ? 0 : 1
            ),
            showSizeChanger: true, 
          }}
          data={feedback?.data ?? [] } 
          setSearch={setSearch}
          sortables={[
            {
              columnKey: "payment",
              columnName: "Cost",
            },
          ]}
          primitiveTableProps={{
            loading: feedback?.loading,
            showSorterTooltip: false
          }}
          onSort={(sort)=>{
            const order = (!isNull(sort?.order) && ['desc', 'descending', 'descend'].includes(sort?.order)) ? 'desc' : 'asc'
            const sort_by = lowerCase(sort.columnKey) as keyof IReservation
            dispatch(fetchReservations({
              sort: order,
              sort_by,
            }))
          }}
        />
      </Flex>
    </ErrorBoundary>
  );
}

export default Reservations;

export function getServerSideProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
