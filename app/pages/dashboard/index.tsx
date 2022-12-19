import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import BaseTable from '../../components/organism/Table/BaseTable/BaseTable';
import { app } from '../../firebase/firebaseApp';
import { PayoutsTableColumns, ReservationTableColumns } from '../../utils/tables/TableTypes';
import PreviewTableContainer from '../../components/organism/Table/TableContainer/TableContainer';

const data = [
  {
    "reservationId": "1",
    "hostId": "1",
    "startDateTime": "2022-12-19T00:00:00",
    "endDateTime": "2022-12-19T10:00:00",
    "vehicleId": "1",
    "vehicleModel": "X5",
    "vehicleMake": "BMW",
    "vehiclePicUrl": "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    "locationAddress": "1.3721, 103.8496",
    "marketName": "Singapore",
    "total": "100",
    "status": "active",
  },
  {
    "reservationId": "2",
    "hostId": "1",
    "startDateTime": "2022-12-19T00:00:00",
    "endDateTime": "2022-12-19T10:00:00",
    "vehicleId": "1",
    "vehicleModel": "X5",
    "vehicleMake": "BMW",
    "vehiclePicUrl": "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    "locationAddress": "1.3721, 103.8496",
    "marketName": "Singapore",
    "total": "100",
    "status": "active",
  },
  {
    "reservationId": "3",
    "hostId": "1",
    "startDateTime": "2022-12-19T00:00:00",
    "endDateTime": "2022-12-19T10:00:00",
    "vehicleId": "1",
    "vehicleModel": "X5",
    "vehicleMake": "BMW",
    "vehiclePicUrl": "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    "locationAddress": "1.3721, 103.8496",
    "marketName": "Singapore",
    "total": "100",
    "status": "active",
  },
  {
    "reservationId": "1",
    "hostId": "1",
    "startDateTime": "2022-12-19T00:00:00",
    "endDateTime": "2022-12-19T10:00:00",
    "vehicleId": "1",
    "vehicleModel": "X5",
    "vehicleMake": "BMW",
    "vehiclePicUrl": "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80",
    "locationAddress": "1.3721, 103.8496",
    "marketName": "Singapore",
    "total": "100",
    "status": "active",
  }
  
]

const mockPayouts = [
  {
    payoutId: "1",
    amount: 100,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
  {
    payoutId: "2",
    amount: 120,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
  {
    payoutId: "1",
    amount: 100,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
  {
    payoutId: "2",
    amount: 120,
    payDate: "2022-12-19T00:00:00",
    status: "active",
  },
]



export default function Dashboard() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <Grid w="full" gridTemplateColumns={"1fr 1fr"} gridTemplateRows={"1fr 1fr"} rowGap="30px" columnGap="30px" >
      <GridItem w="full"  h="full" >
        <PreviewTableContainer
          title='Upcoming Reservations'
          link='/reservations'
        >
          <BaseTable columns={ReservationTableColumns} data={data}    dataFetchFunction={(fetchStatus)=>{
            console.log(fetchStatus)
          }}   
          />
        </PreviewTableContainer>
      </GridItem>
      <GridItem w="full"   >
        <PreviewTableContainer
            title="Your Vehicles"
            link="/vehicle-management"
          >
            <>
              Component will go here
            </>
          </PreviewTableContainer>
      </GridItem>
      <GridItem w="full" >
        Vehicles and Reservations live view
      </GridItem>
      <GridItem w="full" >
        <PreviewTableContainer
          title="Last 10 Payouts"
          link="/reservations"
        >
          <BaseTable columns={PayoutsTableColumns} data={mockPayouts}   dataFetchFunction={(fetchStatus)=>{
            console.log(fetchStatus)
          }}   
          />
        </PreviewTableContainer>
      </GridItem>
      
    </Grid>
  )
}

export function getStaticProps (context: NextPageContext) {
  return {
    props: {
      adminOnly: false,
      dashboard: true,
      authOnly: true
    }
  }
}
