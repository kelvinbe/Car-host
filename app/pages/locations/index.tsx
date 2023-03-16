import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { insertTableActions } from "../../utils/tables/utils";
import {
  FlexColCenterStart,
  FlexRowCenterAround,
} from "../../utils/theme/FlexConfigs";
import { useFetchData } from "../../hooks";
import { STATIONS_DOMAIN } from "../../hooks/constants";
import { useAppSelector } from "../../redux/store";
import { useDisclosure } from "@chakra-ui/react";
import useDeleteData from "../../hooks/useDeleteData";
import { IStation } from "../../globaltypes";
import { getStations } from "../../redux/stationSlice";
import { selectStations } from "../../redux/stationSlice";
import { StationTableColumns } from "../../utils/tables/TableTypes";
import CreateStationModal from "../../components/organism/Modals/CreateStationModal"
import EditStationModal from "../../components/organism/Modals/EditStationModal"
import ViewStationModal from "../../components/organism/Modals/ViewStationModal"


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
  const {fetchData} = useFetchData(STATIONS_DOMAIN, getStations)
  const StationsData = useAppSelector(selectStations)
  const [selectedStation, setSelectedStation] = useState<IStation>({
    station_id:0,
    station_name:'',
    status:'active',
    description:"",
    sub_market_name:"",
    station_images:[]
  })
  const {onClose, isOpen, onOpen} = useDisclosure()
  const [state,dispatch] = useReducer(reducer, initialState)
  const {deleteData} = useDeleteData(STATIONS_DOMAIN)

  useEffect(() => {
    fetchData()
  }, [])

  const showCreateStationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isCreateModalOpen",
      value:true
    })
    onOpen()
  }
  const showViewStationModal = (stationId:number) => {
    dispatch({
      type:'toggle_modal_state',
      key:"isViewModalOpen",
      value:true
    })
    let station = StationsData.find(station => station.station_id === stationId)
    station && setSelectedStation(station)
    onOpen()
  }
  const showEditStationModal = (stationId:number) => {
    dispatch({
      type:'toggle_modal_state',
      key:"isEditModalOpen",
      value:true
    })
    let station = StationsData.find(station => station.station_id === stationId)
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
    <Flex
      {...FlexColCenterStart}
      w="full"
      h="full"
      data-testid="stations-table"
    >
      {state.isCreateModalOpen && <CreateStationModal isOpen={isOpen} onClose={closeCreateStationModal}/>}
      {state.isViewModalOpen && <ViewStationModal isOpen={isOpen} onClose={closeViewStationModal} station={selectedStation}/>}
      {state.isEditModalOpen && <EditStationModal isOpen={isOpen} onClose={closeEditStationModal} station={selectedStation}/>}
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
                  showViewStationModal(data.station_id)
                }}
              />
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                size="sm"
                onClick={() => {
                  showEditStationModal(data.station_id)
                }}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => {
                  deleteData(data.station_id)
                }}
                color="cancelled.1000"
              />
            </Flex>
          );
        })}
        data={StationsData}
        dataFetchFunction={() => {}}
      />
    </Flex>
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
