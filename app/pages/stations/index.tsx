import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useToast } from "@chakra-ui/react";
import React, { useReducer, useState, useEffect } from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { insertTableActions } from "../../utils/tables/utils";
import {
  FlexColCenterStart,
  FlexRowCenterAround,
} from "../../utils/theme/FlexConfigs";
import { useDisclosure } from "@chakra-ui/react";
import { IStation } from "../../globaltypes";
import { fetchStations, selectStationsFeedback, updateStations, useDeleteStationMutation, useGetStationsQuery } from "../../redux/stationSlice";
import { StationTableColumns } from "../../utils/tables/TableTypes";
import StationActionModal from "../../components/organism/Modals/StationActionModal"
import ViewStationModal from "../../components/organism/Modals/ViewStationModal"
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectPaginationState } from "../../redux/authcodeSlice";
import EmulationDeck from "../../components/organism/emulation-deck";
import { selectUser } from "../../redux/userSlice";


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
  const toast = useToast({
    position: 'top'
  })
  const feedback = useAppSelector(selectStationsFeedback)
  // const { data, refetch } = useGetStationsQuery(null)
  const [selectedStation, setSelectedStation] = useState<Partial<IStation> | null>(null)
  const {onClose, isOpen, onOpen} = useDisclosure()
  const [state,dispatch] = useReducer(reducer, initialState)
  const reduxDispatch = useAppDispatch()
  const {current_page, current_size} = useAppSelector(selectPaginationState)
  const user = useAppSelector(selectUser)

  useEffect(()=>{
    reduxDispatch(fetchStations())
  }, [])
  
  const [deleteStation, { isLoading: deleteLoading }] = useDeleteStationMutation()
 
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
    const station = feedback?.data?.find(station => station.id === stationId)
    station && setSelectedStation(station)
    station && onOpen()
  }
  const showEditStationModal = (stationId:string) => {
    dispatch({
      type:'toggle_modal_state',
      key:"isEditModalOpen",
      value:true
    })
    const station = feedback?.data?.find(station => station.id === stationId)
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
        <EmulationDeck
          refetch={()=>{
            reduxDispatch(fetchStations())
          }}
        />
        {state.isCreateModalOpen && <StationActionModal isOpen={isOpen} onClose={closeCreateStationModal} />}
        {state.isViewModalOpen && <ViewStationModal isOpen={isOpen} onClose={closeViewStationModal} station={selectedStation}/>}
        {state.isEditModalOpen && <StationActionModal isOpen={isOpen} onClose={closeEditStationModal} station={selectedStation}/>}
        <FilterableTable
          viewAddFieldButton={!user?.is_admin}
          viewSearchField={true}
          viewSortablesField={false}
          buttonName="Create Station"
          openCreateModal={showCreateStationModal}
          columns={user?.is_admin ? StationTableColumns: insertTableActions(StationTableColumns, (i, data) => {
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
                  isLoading={deleteLoading}
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => {
                    deleteStation(data.id).then(()=>{
                      reduxDispatch(fetchStations())
                    }).catch(()=>{
                      toast({
                        title: "An error occured",
                        description: "Something went wrong"
                      })
                    })
                  }}
                  color="cancelled.1000"
                  data-cy="delete-button"
                />
              </Flex>
            );
          })}
          pagination={{
            position: ["bottomCenter"],
            onChange: (page, size) => {
              reduxDispatch(fetchStations({
                page,
                size: size
              }))
            },
            total: ((current_page ?? 0) * (current_size ?? 0)) + (
              feedback?.data?.length < (current_size ?? 0) ? 0 : 1
            ),
            showSizeChanger: true, 
          }}
          data={feedback?.data ?? []}
          primitiveTableProps={{
            loading: feedback?.loading,
          }}
          setSearch={(search)=>{
            reduxDispatch(fetchStations({
              search
            }))
          }}
        />
    </Flex>
  </ErrorBoundary>
  );
}

export default Stations;

export function getServerSideProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
