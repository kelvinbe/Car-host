import { Flex, IconButton, useDisclosure} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { PayoutsTableColumns } from "../../utils/tables/TableTypes";
import { FlexColCenterStart, FlexRowStartStart } from "../../utils/theme/FlexConfigs";
import { PAYOUT_DOMAIN } from "../../hooks/constants";
import { useFetchData } from "../../hooks";
import { getPayouts,selectPayouts } from "../../redux/payoutSlice";
import { useAppSelector } from "../../redux/store";
import { insertTableActions } from "../../utils/tables/utils";
import { ViewIcon } from "@chakra-ui/icons";
import ViewPayoutModal from "../../components/organism/Modals/viewPayoutModal";
import { IPayout } from "../../globaltypes";


function Payouts() {
  const {fetchData} = useFetchData(PAYOUT_DOMAIN,getPayouts)
  const PayoutsData = useAppSelector(selectPayouts)
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [selectedPayout, setSelectedPayout] = useState<IPayout>({ id: 0, date: "", amount: 0, status: "pending" })

  useEffect(() => {
    fetchData()
  },[])

  const viewPayoutModal = (payoutId:number) => {
    let payoutToView = PayoutsData.find(payout => payout.id === payoutId)
    payoutToView && setSelectedPayout(payoutToView)
    onOpen()
  }
  return (
    <Flex w="full" h="full" {...FlexColCenterStart} data-testid="payouts-table">
      <ViewPayoutModal isOpen={isOpen} onClose={onClose} payout={selectedPayout}/>
      <FilterableTable
        viewAddFieldButton={false}
        viewSearchField={false}
        viewSortablesField={true}
        sortables={[
          {
            columnName: "Amount",
            columnKey: "amount",
          },
        ]}
        columns={insertTableActions(PayoutsTableColumns, (i, data) => {
          return (
            <Flex {...FlexRowStartStart}>
              <IconButton
                aria-label="View"
                icon={<ViewIcon />}
                size="sm"
                onClick={() => {
                  viewPayoutModal(data.payout_id)
                }}
              />
            </Flex>
          );
        })}
        data={PayoutsData}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </Flex>
  );
}

export default Payouts;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}
