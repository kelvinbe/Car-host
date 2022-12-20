import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import BaseTable from '../../components/organism/Table/BaseTable/BaseTable';
import { app } from '../../firebase/firebaseApp';
import { PayoutsTableColumns, ReservationTableColumns } from '../../utils/tables/TableTypes';
import PreviewTableContainer from '../../components/organism/Table/TableContainer/TableContainer';
import LiveMapComponent from '../../components/organism/Maps/LiveMapComponent/LiveMapComponent';
import { IVehicle } from '../../globaltypes';

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

const exampleVehicles: IVehicle[] = [
  {
    color: "red",
    coords: {
      latitude: 6.5244,
      longitude: 3.3792
    },
    hourlyRate: 1000,
    location: "Lagos",
    locationId: "1",
    seats: 4,
    status: "active",
    transmission: "automatic",
    vehicleId: "1",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleType: "car",
    year: 2019 ,
    vehiclePictures: [
      "https://images.unsplash.com/photo-1547143379-3374bbefa14a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=697&q=80"
    ]
  }, 
  {
    color: "red",
    coords: {
      latitude: 8.5244,
      longitude: 4.3792
    },
    hourlyRate: 1000,
    location: "Lagos",
    locationId: "1",
    seats: 4,
    status: "active",
    transmission: "automatic",
    vehicleId: "2",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleType: "car",
    vehiclePictures: [
      "https://images.unsplash.com/photo-1512668023544-749964af467a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    year: 2019
  }
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
        <LiveMapComponent
          marketId='someId'
          vehicles={exampleVehicles}
        />
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
      adminonly: false,
      dashboard: true,
      authonly: true
    }
  }
}
