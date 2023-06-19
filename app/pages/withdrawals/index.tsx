import React, { useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { insertTableActions } from "../../utils/tables/utils";
import { WithdrawalsTableColumns, AdminWithdrawalsTableColumns } from "../../utils/tables/TableTypes";
import { Flex, IconButton, useDisclosure, Text, Heading, Button} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { FlexRowStartStart } from "../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  selectWithdrawals,
  fetchWithdrawals,
  selectWithdrawalsPagination,
} from "../../redux/withdrawalSlice";
import dayjs from "dayjs";
import EditWithdrawalModal from "../../components/organism/Modals/EditWithdrawal";
import { IWithdrawals } from "../../globaltypes";
import Withdrawal from "../../components/molecules/Withdrawal/Withdrawal";
import useUsers from "../../hooks/useUsers";
import { selectUser } from "../../redux/userSlice";

const Withdrawals = () => {
  const dispatch = useAppDispatch();
  const { withdrawals, loading } = useAppSelector(selectWithdrawals);
  const { current_page, current_size } = useAppSelector(selectWithdrawalsPagination)
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [search, setSearch] = useState<string>('');
  const [withdrawalData, setwithdrawalData] = useState<Partial<IWithdrawals>>({})
  const user = useAppSelector(selectUser)
  useEffect(() => {
    dispatch(fetchWithdrawals());
  }, []);

  const openEditWithdrawalModal = (id: string)=>{
    const selectedWithdrawal = withdrawals?.find((withdrawal)=> withdrawal.id === id)
    selectedWithdrawal && setwithdrawalData(selectedWithdrawal)
    onOpen()
  }

  
  
  if(user?.is_admin)
    return(
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <Flex w="full" h="full" direction={'column'}>
          <EditWithdrawalModal isOpen={isOpen} onClose={onClose} withdrawalData={withdrawalData}/>
          <Heading size={'md'} color={'#E63B2E'}>Transactions</Heading>
          <FilterableTable 
            viewSearchField={true}
            viewSortablesField={true}
            sortables={[
              {
                columnName: 'Date',
                columnKey:'created_at'
              },
              {
                columnName: 'Amount',
                columnKey:'amount'
              }
            ]}
            pagination={{
                position: ["bottomCenter"],
            }}
            data={withdrawals ?? []}
            setSearch={(search)=>{
              dispatch(fetchWithdrawals({
                search
              }))
            }}
            onSort={(sort)=>{
              const order = sort?.order === 'ascend'? 'asc': 'desc'
              const columnKey = sort?.columnKey as keyof IWithdrawals 

              dispatch(fetchWithdrawals({
                sort_by: columnKey,
                sort: order
              }))
            }}
            columns={insertTableActions(AdminWithdrawalsTableColumns, (i, data) => {
                return (
                  <Flex {...FlexRowStartStart}>
                    <IconButton
                      aria-label="Edit"
                      icon={<MdEdit/>}
                      size="sm"
                      disabled={data.status === 'PENDING'? false: true}
                      onClick={()=>openEditWithdrawalModal(data.id)}
                      data-cy="edit-button"
                    />
                  </Flex>
                );
              })}
              refetch={()=>{
                dispatch(fetchWithdrawals())
              }}
              primitiveTableProps={{
                loading
              }}
          />
          </Flex>
      </ErrorBoundary>
    );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Flex  w="full" h="full" direction={'column'}>
      <EditWithdrawalModal isOpen={isOpen} onClose={onClose}  withdrawalData={withdrawalData} />
      <Heading size={'md'} color={'#E63B2E'}>Transactions</Heading>
      <Withdrawal />
      <FilterableTable
        viewSearchField={true}
        viewSortablesField={true}
        sortables={[
          {
            columnName: "Date",
            columnKey: "createdAt",
          },
        ]}
        data={withdrawals ?? []}
        pagination={{
          position: ["bottomCenter"],
          onChange: (page, pageSize) => {
            dispatch(fetchWithdrawals({ page, size: pageSize }))
          },
          total: ((current_page ?? 0) * (current_size ?? 0)) + (
            withdrawals?.length < (current_size ?? 0) ? 0 : 1
          ),
          showSizeChanger: true, 
        }}
        setSearch={setSearch}
        columns={insertTableActions(WithdrawalsTableColumns, (i, data) => {
          return (
            <Flex {...FlexRowStartStart}>
              <IconButton
                aria-label="Edit"
                icon={<MdEdit/>}
                size="sm"
                disabled={data.status === 'PENDING'? false: true}
                onClick={()=>openEditWithdrawalModal(data.id)}
                data-cy="edit-button"
              />
            </Flex>
          );
        })}
        primitiveTableProps={{
          loading
        }}
        refetch={()=>{
          dispatch(fetchWithdrawals())
        }}
      />
</Flex>
    </ErrorBoundary>
  );
};

export default Withdrawals;

export function getServerSideProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
