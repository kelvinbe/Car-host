/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Divider,
  Flex,
  IconButton,
  Progress,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { PayoutsTableColumns } from "../../utils/tables/TableTypes";
import {
  FlexColCenterStart,
  FlexColStartStart,
  FlexRowStartStart,
} from "../../utils/theme/FlexConfigs";
import { PAYOUT_DOMAIN } from "../../hooks/constants";
import { useFetchData } from "../../hooks";
import {
  getPayouts,
  initiatePayout,
  selectInitiatePayoutFeedback,
  selectPayouts,
} from "../../redux/payoutSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { insertTableActions } from "../../utils/tables/utils";
import { ViewIcon } from "@chakra-ui/icons";
import ViewPayoutModal from "../../components/organism/Modals/viewPayoutModal";
import { IPayout } from "../../globaltypes";
import { selectUser } from "../../redux/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import LogRocket from "logrocket";

function Payouts() {
  const user = useAppSelector(selectUser);
  const toast = useToast({
    position: "top",
  });
  const initiatePayoutFeedback = useAppSelector(selectInitiatePayoutFeedback);

  const dispatch = useAppDispatch();

  const payout = async (type: "mpesa" | "mtn") => {
    dispatch(initiatePayout(type))
      .unwrap()
      .then(() => {
        toast({
          title: "Success",
          description: "Payouts initiated successfully",
          colorScheme: "green",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "An error occured while initiating payouts",
          colorScheme: "red",
        });
        LogRocket.error(error)
      });
  };

  if (user?.is_admin)
    return (
      <Flex
        w="full"
        h="full"
        {...FlexColCenterStart}
        experimental_spaceY={"10px"}
      >
        <Text textAlign="left" fontWeight={"semibold"} fontSize="2xl" w="full">
          Payouts
        </Text>
        <Divider />

        <Flex w="full" h="full">
          <Flex
            {...FlexColStartStart}
            experimental_spaceY={"20px"}
            className="w-full"
          >
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Initiate Payouts
            </Text>
            <Text fontSize={"md"} fontWeight={"semibold"} color="gray.500">
              This will initialize monthly payouts for all eligible hosts
            </Text>
            {initiatePayoutFeedback?.loading && (
              <Progress isIndeterminate w="full" colorScheme="primary.1000" />
            )}
            <div className="grid w-full grid-cols-2 gap-x-2 gap-y-3">
              <div className="flex w-full flex-row items-center justify-between ring-1 rounded-md px-5 py-2">
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  M-PESA
                </Text>
                <Button
                  onClick={() => payout("mpesa")}
                  colorScheme="green"
                  size="sm"
                >
                  Initiate
                </Button>
              </div>
              <div className="flex w-full flex-row items-center justify-between ring-1 rounded-md px-5 py-2">
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  MTN
                </Text>
                <Button
                  onClick={() => payout("mtn")}
                  colorScheme="green"
                  size="sm"
                >
                  Initiate
                </Button>
              </div>
            </div>
          </Flex>
        </Flex>
      </Flex>
    );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fetchData } = useFetchData(PAYOUT_DOMAIN, getPayouts);
  const PayoutsData = useAppSelector(selectPayouts);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedPayout, setSelectedPayout] = useState<Partial<IPayout>>({
    id: 0,
    date: "",
    amount: 0,
    status: "pending",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const viewPayoutModal = (payoutId: number) => {
    const payoutToView = PayoutsData.find((payout) => payout.id === payoutId);
    payoutToView && setSelectedPayout(payoutToView);
    onOpen();
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Flex w="full" h="full" {...FlexColCenterStart} data-testid="payouts-table">
        <ViewPayoutModal
          isOpen={isOpen}
          onClose={onClose}
          payout={selectedPayout}
        />
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
                    viewPayoutModal(data.payout_id);
                  }}
                  data-cy="view-button"
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
    </ErrorBoundary>
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
