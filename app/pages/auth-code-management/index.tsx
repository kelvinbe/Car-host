import React, {useEffect, useState} from "react";
import { Flex, Text } from "@chakra-ui/react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { insertTableActions } from "../../utils/tables/utils";
import {
  FlexColCenterStart,
  FlexRowCenterStart,
} from "../../utils/theme/FlexConfigs";
import { AuthCodeTableColumns, RequestedAuthCodeTableColumns } from "../../utils/tables/TableTypes";
import { AUTHCODE_DOMAIN, REQUESTED_AUTHCODE_DOMAIN } from "../../hooks/constants";
import { getAuthcode, selectAuthcode } from "../../redux/authcodeSlice";
import { useFetchData } from "../../hooks";
import useFetchRequestedAuthCode from "../../hooks/useFetchRequestedAuthCode";
import { getRequestedAuthCode, selectRequestedAuthCode } from "../../redux/requestedAuthCodeSlice";
import { useAppSelector } from "../../redux/store";
import { useDisclosure } from "@chakra-ui/react";
import Rounded from "../../components/molecules/Buttons/General/Rounded";
import CreateAuthCodeModal from "../../components/organism/Modals/CreateAuthCodeModal";

function AuthCodeManagement() {
  const [showRequestsTable, setShowRequestsTable] = useState<boolean>(false)
  const {fetchData} = useFetchData(AUTHCODE_DOMAIN, getAuthcode)
  const {fetchRequests} = useFetchRequestedAuthCode(REQUESTED_AUTHCODE_DOMAIN, getRequestedAuthCode)
  const authcodeData = useAppSelector(selectAuthcode)
  const requestsData = useAppSelector(selectRequestedAuthCode)
  const [createAuthCodeModal, setCreateAuthCodeModal] = useState<boolean>(false)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [authcodeId, setAuthcodeId] = useState<number>()
  const [userId, setUserId] = useState<number>()

  useEffect(() => {
    fetchData()
  },[])

  const toggleRequestsTable = () => {
    setShowRequestsTable(!showRequestsTable)
    fetchRequests()
  }

  const openCreateAuthCodeModal = (id:number, userId:number) => {
    setCreateAuthCodeModal(true)
    setAuthcodeId(id)
    setUserId(userId)
    onOpen()
  }
  const closeCreateAuthCodeModal = () => {
    setCreateAuthCodeModal(false)
    onClose()
  }
  return (
    <Flex
      {...FlexColCenterStart}
      w="full"
      h="full"
      data-testid="auth-code-management-table"
    >
      {createAuthCodeModal && authcodeId && userId && <CreateAuthCodeModal isOpen={isOpen} onClose={closeCreateAuthCodeModal} authcodeId={authcodeId} showRequestsTable={toggleRequestsTable} userId={userId}/>}
      <FilterableTable
        viewAddFieldButton={true}
        viewSearchField={true}
        viewSortablesField={false}
        buttonName={showRequestsTable ? 'View All Authcodes': 'View Requests'}
        openCreateModal={toggleRequestsTable}
        columns={!showRequestsTable? AuthCodeTableColumns : insertTableActions(RequestedAuthCodeTableColumns, (i, data) => {
          return (
            <Flex {...FlexRowCenterStart}>
              <Rounded variant="solid" setWidth={200} rounded="md" onClick = {() => openCreateAuthCodeModal(data.authcode_id, data.user_id)}>
                <Text cursor="pointer">Create</Text>
              </Rounded>
            </Flex>
          );
        })}
        data={showRequestsTable ? requestsData : authcodeData}
        dataFetchFunction={() => {}}
      />
    </Flex>
  );
}

export default AuthCodeManagement;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
