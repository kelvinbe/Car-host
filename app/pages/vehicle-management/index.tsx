/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import React from "react";
import { VehicleManagementTableColumns } from "../../utils/tables/TableTypes";
import { FlexColCenterStart } from "../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchVehicles, selectFetchVehiclesFeedback, selectUpdateVehicleFeedback, selectVehicles, selectVehiclesPaginationState, updateVehicle } from "../../redux/vehiclesSlice";
import { insertTableActions } from "../../utils/tables/utils";
import { FlexRowCenterBetween } from "../../utils/theme/FlexConfigs";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import ViewVehicleModal from "../../components/organism/Modals/ViewVehicleModal";
import { useDisclosure } from "@chakra-ui/react";
import CreateVehicleModal from "../../components/organism/Modals/CreateVehicleModal";
import EditVehicleModal from "../../components/organism/Modals/EditVehicleModal";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";

function VehicleManagement() {
  const [vehicleId, setVehicleId] = useState<string>()
  const [isCreateModalOpen ,setIsCreateModalOpen] = useState<boolean>(false)
  const [isViewModalOpen ,setIsViewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen ,setIsEditModalOpen] = useState<boolean>(false)
  const {isOpen, onClose, onOpen} = useDisclosure()
  const { data: vehicles, loading } = useAppSelector(selectFetchVehiclesFeedback)
  const { current_page, current_size } = useAppSelector(selectVehiclesPaginationState)
  const updateFeedback = useAppSelector(selectUpdateVehicleFeedback)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchVehicles())
  },[])


  const viewVehicle = (id: string) => {
    setVehicleId(id)
    setIsViewModalOpen(true)
    onOpen()
  }
  const openCreateModal = () => {
    setIsCreateModalOpen(true)
    onOpen()
  }
  const closeViewModal = () => {
    setIsViewModalOpen(false)
    setVehicleId(undefined)
    onClose()
  }
  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    onClose()
  }
  const openEditModal = (id: string) => {
    setVehicleId(id)
    setIsEditModalOpen(true)
    onOpen()
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setVehicleId(undefined)
    onClose()
  }
  return (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Flex
      {...FlexColCenterStart}
      w="full"
      data-testid="vehicle-management-table"
    >
        {isViewModalOpen && <ViewVehicleModal isOpen={isViewModalOpen} onClose={closeViewModal} vehicleId={vehicleId} vehicles={vehicles} />}
        {isCreateModalOpen && <CreateVehicleModal isOpen ={isCreateModalOpen} onClose={closeCreateModal}/>}
        {isEditModalOpen && <EditVehicleModal isOpen={isEditModalOpen} onClose={closeEditModal} vehicle_id={vehicleId} vehicles={vehicles} />}
        <FilterableTable
          viewAddFieldButton={true}
          viewSearchField={true}
          viewSortablesField={true}
          openCreateModal= {openCreateModal}
          buttonName="Add new vehicle"
          sortables={[
            {
              columnKey: "rate",
              columnName: "Rate",
            },
          ]}
          columns={insertTableActions(VehicleManagementTableColumns, (i, data) => {
            return (
              <Flex {...FlexRowCenterBetween}>
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon />}
                  size="sm"
                  onClick={() => viewVehicle(data.id)}
                  marginRight='4'
                  data-cy={'view-button'}
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => {
                    openEditModal(data.id)
                  }}
                  marginRight='4'
                  data-cy={'edit-button'}
                />
                <IconButton
                  isLoading={updateFeedback?.loading && updateFeedback?.id === data.id}
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => {
                    dispatch(updateVehicle({
                      id: data.id,
                      status: "INACTIVE"
                    }))
                  }}
                  color="cancelled.1000"
                  data-cy={'delete-button'}
                />
              </Flex>
            );
          })}
          pagination={{
            position: ["bottomCenter"],
            onChange: (page, pageSize) => {
              dispatch(fetchVehicles({ page, size: pageSize }))
            },
            total: ((current_page ?? 0) * (current_size ?? 0)) + (
              vehicles?.length < (current_size ?? 0) ? 0 : 1
            ),
            showSizeChanger: true, 
          }}
          data={vehicles ?? []}
          primitiveTableProps={{
            loading
          }}
        />     
    </Flex>
  </ErrorBoundary>
  );
}

export default VehicleManagement;

export function getServerSideProps() {
  return {
    props: {
      authonly: true,
      dashboard: true,
      adminonly: false,
    },
  };
}
