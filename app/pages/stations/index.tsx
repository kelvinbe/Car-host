import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { insertTableActions } from "../../utils/tables/utils";
import {
  FlexColCenterStart,
  FlexRowCenterAround,
} from "../../utils/theme/FlexConfigs";
import { useDisclosure } from "@chakra-ui/react";
import { IStation } from "../../globaltypes";
import { useDeleteStationMutation, useGetStationsQuery } from "../../redux/stationSlice";
import { StationTableColumns } from "../../utils/tables/TableTypes";
import StationActionModal from "../../components/organism/Modals/StationActionModal"
import ViewStationModal from "../../components/organism/Modals/ViewStationModal"
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";


type IReducerState = {
  isCreateModalOpen:boolean,
  isViewModalOpen:boolean,
  isEditModalOpen:boolean
}

const initialState = {
  isCreateModalOpen:false,
  isViewModalOpen:false,
  isEditModalOpen:false
}

const reducer = (state:IReducerState, action:{type:string, key:string, value:boolean}) => {
  switch (action.type) {
    case "toggle_modal_state":
      return {
        ...state,
        [action.key]:action.value
      }
  
    default:
      return state;
  }
}

function Stations() {
  const { data } = useGetStationsQuery(null)
  console.log("Station data", data)
  const [selectedStation, setSelectedStation] = useState<Partial<IStation> | null>(null)
  const {onClose, isOpen, onOpen} = useDisclosure()
  const [state,dispatch] = useReducer(reducer, initialState)
  
  const [deleteStation] = useDeleteStationMutation()
 
  const showCreateStationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isCreateModalOpen",
      value:true
    })
    onOpen()
  }
  const showViewStationModal = (stationId:string) => {
    dispatch({
      type:'toggle_modal_state',
      key:"isViewModalOpen",
      value:true
    })
    const station = data?.find(station => station.id === stationId)
    station && setSelectedStation(station)
    station && onOpen()
  }
  const showEditStationModal = (stationId:string) => {
    dispatch({
      type:'toggle_modal_state',
      key:"isEditModalOpen",
      value:true
    })
    const station = data?.find(station => station.id === stationId)
    station && setSelectedStation(station)
    onOpen()
  }
  const closeCreateStationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isCreateModalOpen",
      value:false
    })
    onClose()
  }
  const closeViewStationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isViewModalOpen",
      value:false
    })
    onClose()
  }
  const closeEditStationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isEditModalOpen",
      value:false
    })
    onClose()
  }
  return (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Flex
      {...FlexColCenterStart}
      w="full"
      h="full"
      data-testid="stations-table"
    >
        {state.isCreateModalOpen && <StationActionModal isOpen={isOpen} onClose={closeCreateStationModal} />}
        {state.isViewModalOpen && <ViewStationModal isOpen={isOpen} onClose={closeViewStationModal} station={selectedStation}/>}
        {state.isEditModalOpen && <StationActionModal isOpen={isOpen} onClose={closeEditStationModal} station={selectedStation}/>}
        <FilterableTable
          viewAddFieldButton={true}
          viewSearchField={true}
          viewSortablesField={true}
          buttonName="Create Station"
          openCreateModal={showCreateStationModal}
          sortables={[
            {
              columnKey: "station_name",
              columnName: "Station Name",
            },
          ]}
          columns={insertTableActions(StationTableColumns, (i, data) => {
            return (
              <Flex {...FlexRowCenterAround}>
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon />}
                  size="sm"
                  onClick={() => {
                    showViewStationModal(data.id)
                  }}
                  data-cy="view-button"
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => {
                    showEditStationModal(data.id)
                  }}
                  data-cy="edit-button"
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => {
                    deleteStation(data.id)
                  }}
                  color="cancelled.1000"
                  data-cy="delete-button"
                />
              </Flex>
            );
          })}
          pagination={{
            position: ["bottomCenter"],
          }}
          data={data ?? []}
        />
    </Flex>
  </ErrorBoundary>
  );
}

export default Stations;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
