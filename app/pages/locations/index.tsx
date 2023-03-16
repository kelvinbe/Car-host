import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { LocationTableColumns } from "../../utils/tables/TableTypes";
import { insertTableActions } from "../../utils/tables/utils";
import {
  FlexColCenterStart,
  FlexRowCenterAround,
} from "../../utils/theme/FlexConfigs";
import { useFetchData } from "../../hooks";
import { LOCATIONS_DOMAIN } from "../../hooks/constants";
import { getLocations } from "../../redux/locationsSlice";
import { selectLocations } from "../../redux/locationsSlice";
import { useAppSelector } from "../../redux/store";
import { useDisclosure } from "@chakra-ui/react";
import CreateLocationModal from "../../components/organism/Modals/CreateLocationModal";
import useDeleteData from "../../hooks/useDeleteData";
import ViewLocationModal from "../../components/organism/Modals/ViewLocationModal";
import EditLocationModal from "../../components/organism/Modals/EditLocationModal";
import { ILocation } from "../../globaltypes";

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

function Locations() {
  const {fetchData} = useFetchData(LOCATIONS_DOMAIN,getLocations)
  const LocationsData = useAppSelector(selectLocations)
  const [selectedLocation, setSelectedLocation] = useState<ILocation>({
    location_id: 0,
    vehicle: {
      vehicle_name:""
    },
    address: "",
    market_name: "",
    status: ""
  })
  const {onClose, isOpen, onOpen} = useDisclosure()
  const [state,dispatch] = useReducer(reducer, initialState)
  const {deleteData} = useDeleteData(LOCATIONS_DOMAIN)

  useEffect(() => {
    fetchData()
  }, [])

  const showCreateLocationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isCreateModalOpen",
      value:true
    })
    onOpen()
  }
  const showViewLocationModal = (locationId:number) => {
    dispatch({
      type:'toggle_modal_state',
      key:"isViewModalOpen",
      value:true
    })
    let location = LocationsData.find(location => location.location_id === locationId)
    location && setSelectedLocation(location)
    onOpen()
  }
  const showEditLocationModal = (locationId:number) => {
    dispatch({
      type:'toggle_modal_state',
      key:"isEditModalOpen",
      value:true
    })
    let location = LocationsData.find(location => location.location_id === locationId)
    location && setSelectedLocation(location)
    onOpen()
  }
  const closeCreateLocationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isCreateModalOpen",
      value:false
    })
    onClose()
  }
  const closeViewLocationModal = () => {
    dispatch({
      type:'toggle_modal_state',
      key:"isViewModalOpen",
      value:false
    })
    onClose()
  }
  const closeEditLocationModal = () => {
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
      data-testid="locations-table"
    >
      {state.isCreateModalOpen && <CreateLocationModal isOpen={isOpen} onClose={closeCreateLocationModal}/>}
      {state.isViewModalOpen && <ViewLocationModal isOpen={isOpen} onClose={closeViewLocationModal} location={selectedLocation}/>}
      {state.isEditModalOpen && location &&<EditLocationModal isOpen={isOpen} onClose={closeEditLocationModal} location={selectedLocation}/>}
      <FilterableTable
        viewAddFieldButton={true}
        viewSearchField={true}
        viewSortablesField={true}
        buttonName="Create Location"
        openCreateModal={showCreateLocationModal}
        sortables={[
          {
            columnKey: "locationId",
            columnName: "Location Id",
          },
        ]}
        columns={insertTableActions(LocationTableColumns, (i, data) => {
          return (
            <Flex {...FlexRowCenterAround}>
              <IconButton
                aria-label="View"
                icon={<ViewIcon />}
                size="sm"
                onClick={() => {
                  showViewLocationModal(data.location_id)
                }}
              />
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                size="sm"
                onClick={() => {
                  showEditLocationModal(data.location_id)
                }}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => {
                  deleteData(data.location_id)
                }}
                color="cancelled.1000"
              />
            </Flex>
          );
        })}
        data={LocationsData}
        dataFetchFunction={() => {}}
      />
    </Flex>
  );
}

export default Locations;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
