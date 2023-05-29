import React, { useEffect, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { TablePaginationConfig } from "antd/es/table";
import { useAppSelector } from "../../redux/store";
import ReservationModal from "../../components/organism/Modals/ReservationModal";
import { useDisclosure } from "@chakra-ui/react";
import { selectReservations } from "../../redux/reservationSlice";
import useReservation from "../../hooks/useReservation";
import dayjs from "dayjs";
import { insertTableActions } from "../../utils/tables/utils";
import { FlexRowCenterBetween } from "../../utils/theme/FlexConfigs";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { lowerCase } from "lodash";
import { ReservationColumns } from "../../utils/tables/TableTypes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleViewReservationModal, setToggleViewReservationModal] =
    useState(false);
  const [toggleEditReservationModal, setToggleEditReservationModal] =
    useState(false);
  const [reservationData, setReservationData] = useState<DataType[]>([]);
  const [reservationId, setReservationId] = useState<string>();
  const [search, setSearch] = useState<string>("");

  const reservations = useAppSelector(selectReservations);
  const { fetchReservations, deleteReservation } = useReservation(
    undefined,
    undefined,
    currentPage
  );

  useEffect(() => {
    fetchReservations();
  }, [currentPage]);

  useEffect(() => {
    setReservationData(() =>
      reservations.map((reservation) => ({
        reservationId: reservation?.id,
        vehiclePlate: reservation?.vehicle?.plate,
        vehicleName: `${reservation?.vehicle?.make} ${reservation?.vehicle?.model}`,
        startEndTime: `${dayjs(reservation?.start_date_time).format(
          "DD/MM/YYYY h:mm A"
        )} ${dayjs(reservation?.end_date_time).format("DD/MM/YYYY h:mm A")}`,
        totalCost: reservation?.payment?.amount,
        hostName: `${reservation?.vehicle?.host?.fname} ${reservation?.vehicle?.host?.lname}`,
        location: reservation?.vehicle?.station?.name,
        status: lowerCase(reservation?.status),
      }))
    );
  }, [reservations]);

  const filteredReservationData = reservationData.filter(
    (reservation) =>
      reservation?.vehiclePlate
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      reservation?.hostName
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      reservation?.location
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      reservation?.vehicleName
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
  );

  const changeStateViewModal = () => {
    setToggleViewReservationModal(!toggleViewReservationModal);
  };
  const changeStateEditModal = () => {
    setToggleEditReservationModal(!toggleEditReservationModal);
  };
  const showViewReservationModal = (reservation_id: string) => {
    onOpen();
    changeStateViewModal();
    setReservationId(reservation_id);
  };
  const showEditReservationModal = (id: string) => {
    onOpen();
    changeStateEditModal();
    setReservationId(id);
  };

  const handlePageChange = (pagination: TablePaginationConfig) => {
    pagination.current && setCurrentPage(pagination.current);
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
          reservationId={reservationId}
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
                  onClick={() => showViewReservationModal(data.reservationId)}
                  marginRight="4"
                  data-cy={"view-button"}
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => {
                    showEditReservationModal(data.reservationId);
                  }}
                  marginRight="4"
                  data-cy={"edit-button"}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => {
                    deleteReservation(data.reservationId);
                  }}
                  color="cancelled.1000"
                  data-cy={"delete-button"}
                />
              </Flex>
            );
          })}
          pagination={{
            position: ["bottomCenter"],
          }}
          handlePageChange={handlePageChange}
          data={filteredReservationData}
          setSearch={setSearch}
          sortables={[
            {
              columnKey: "totalCost",
              columnName: "Total Cost",
            },
          ]}
        />
      </Flex>
    </ErrorBoundary>
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
