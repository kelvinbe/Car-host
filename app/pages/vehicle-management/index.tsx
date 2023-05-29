/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import React from "react";
import { IVehicle } from "../../globaltypes";
import { VehicleManagementTableColumns } from "../../utils/tables/TableTypes";
import { FlexColCenterStart } from "../../utils/theme/FlexConfigs";
import { useAppSelector } from "../../redux/store";
import { selectVehicles } from "../../redux/vehiclesSlice";
import { insertTableActions } from "../../utils/tables/utils";
import { FlexRowCenterBetween } from "../../utils/theme/FlexConfigs";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import ViewVehicleModal from "../../components/organism/Modals/ViewVehicleModal";
import { useDisclosure } from "@chakra-ui/react";
import CreateVehicleModal from "../../components/organism/Modals/CreateVehicleModal";
import useVehicles from "../../hooks/useVehicles";
import EditVehicleModal from "../../components/organism/Modals/EditVehicleModal";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";

function VehicleManagement() {
  const [vehiclesData, setVehicleData] = useState<Partial<IVehicle>[]>([])
  const [vehicleId, setVehicleId] = useState<string>()
  const [isCreateModalOpen ,setIsCreateModalOpen] = useState<boolean>(false)
  const [isViewModalOpen ,setIsViewModalOpen] = useState<boolean>(false)
  const [isEditModalOpen ,setIsEditModalOpen] = useState<boolean>(false)
  const {isOpen, onClose, onOpen} = useDisclosure()
  const {fetchVehicles,deleteVehicle} = useVehicles()
  const vehicles = useAppSelector(selectVehicles)

  useEffect(() => {
    fetchVehicles()
  },[])
  useEffect(() => {
    setVehicleData(() => vehicles.map(vehicle => ({
      ...vehicle,
      vehicle_id: vehicle.id,
      make:vehicle.make,
      model:vehicle.model,
      year:vehicle.year,
      transmission:vehicle.transmission,
      hourly_rate:vehicle.hourly_rate,
      status:vehicle.status,
      plate:vehicle.plate
    })))
  },[vehicles])

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
        {isViewModalOpen && <ViewVehicleModal isOpen={isOpen} onClose={closeViewModal} vehicleId={vehicleId} vehicles={vehicles} />}
        {isCreateModalOpen && <CreateVehicleModal isOpen ={isOpen} onClose={closeCreateModal}/>}
        {isEditModalOpen && <EditVehicleModal isOpen={isOpen} onClose={closeEditModal} vehicle_id={vehicleId} vehicles={vehicles} />}
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
                  onClick={() => viewVehicle(data.vehicle_id)}
                  marginRight='4'
                  data-cy={'view-button'}
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => {
                    openEditModal(data.vehicle_id)
                  }}
                  marginRight='4'
                  data-cy={'edit-button'}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => {
                    deleteVehicle(data.vehicle_id)
                  }}
                  color="cancelled.1000"
                  data-cy={'delete-button'}
                />
              </Flex>
            );
          })}
          pagination={{
            position: ["bottomCenter"],
          }}
          data={vehiclesData}
        />     
    </Flex>
  </ErrorBoundary>
  );
}

export default VehicleManagement;

export function getStaticProps() {
  return {
    props: {
      authonly: true,
      dashboard: true,
      adminonly: false,
    },
  };
}
