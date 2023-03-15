import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Navigation types
export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ConfirmationSent: undefined;
  Verification: undefined;
  ChangePassword: undefined;
  SupportScreen: {
    context: "profile" | "booking" | "home" | "payment" | "settings" | "about" | "general" | "forgotPassword" | "verification" | "changePassword" | "confirmationSent" | undefined
  },
  Onboarding: undefined;
};
export type BottomTabParamList = {
  SearchScreen: undefined;
  Storybook: undefined;
  History: undefined;
  UpcomingReservationsHome: undefined;
  Upcoming: undefined;
  Profile: undefined;
  ManageRes: undefined;
  Issues: undefined;
  NotFound: undefined;
  BookingDetails: undefined;
  ReservationDetails:undefined;
  VehicleInspection:undefined;
};

export type SearchScreenParamList = {
  SearchScreenHome: undefined;
  OnboardingHome:undefined;
  AddCardScreen: undefined;
  MapScreen: undefined | {
    searchType?: "local" | "host",
    hostCode?: string
  };
  BookingConfirmationScreen: {
    reservationId: string
  };
}

export type ManageResParamList = {
  ManageResHome?: undefined;
  BookingDetails?: undefined;
}

export type UpcomingParamList = {
  UpcomingReservationsHome?: undefined;
  ReservationDetails?:{
    current:boolean;
  };
  VehicleInspection?:undefined;
}
export type ProfileScreenParamList = {
  ProfileScreenHome: undefined;
  ProfileScreenEdit: undefined;
  PaymentDetailsScreen: undefined;
  ProfileSettingsScreen: undefined;
  AboutScreen: undefined;
  PrivacyPolicy: undefined;
  UserAgreement: undefined;
  DriverLicenseScreen: undefined;
  SupportScreen: {
    context: "profile" | "booking" | "home" | "payment" | "settings" | "about" | "general" | "forgotPassword" | "verification" | "changePassword" | "confirmationSent" | undefined
  }
}

export type PaymentDetailsScreenParamList = {
  PaymentDetailsScreenHome: undefined;
  MPesaDetailsScreen: undefined;
  AddCardScreen: undefined;

}

export type BottomSheetParamList = {
  BookingDetails: undefined;
  ChoosePayment: undefined;
  PaymentAuthorization: undefined;
}


export type UserOnboardingParamList = {
  OnboardingHome: undefined;
  DriversLicense: undefined;
  Location: undefined;
  SelectPaymentMethod: {
    payment_method_added?: boolean
  };
  SelectedPaymentMethod: {
    payment_method?: "mpesa" | "card" | "cash"
  };
};



// General App Types
export interface IToast {
  id?: string | number,
  message: string,
  type: "success" | "error" | "warning" | "primary",
  duration?: number,
  title?: string
}




/**
 * App data types
 */

/**
 * @name IReservation
 * @description Reservation data type
 */
// export interface IReservation {
//   reservationId: string;
//   hostId: string;
//   startDateTime: string;
//   endDateTime: string;
//   vehicleId: string;
//   vehicleModel: string;
//   vehicleMake: string;
//   vehiclePicUrl: string;
//   locationAddress: string;
//   marketName: string;
//   total: string;
//   status: string;
//   paymentMethod?: IPaymentMethod<any>;
// }

export interface IReservation {
  reservation_id: string;
  customer: {
    userId?: string;
    fname?: string;
    lname?: string;
    profile_pic_url?: string;
  },
  vehicle: {
    vehicle_id?: number;
    hourly_rate?: number;
    vehicle_type?: string;
    color?: string;
    seats?: number;
    plate?: string;
    transmission?: "Manual" | "Automatic";
    year?: number;
    status?: "Available" | "Unavailable" | "Booked" | "Restricted";
    make: string;
    model: string;
    userId?: string;
    host: {
      userId?: string;
      fname?: string;
      lname?: string;
      profile_pic_url?: string;
      handle?: string;
      entityId?: string;
    },
    location: {
      location_id?: number;
      entity_id?: string;
      market: {
        market_id?: number;
        country?: string;
        name?: string;
        latitude?: string;
        longitude?: string;
        status?: "Active" | "Nonactive";
      },
      address?: string;
      picture_url?: string;
      longitude?: string;
      latitude?: string;
      status?: "Active" | "Nonactive" | "Suspended";
    },
    vehicle_pictures?: string[];
  }
  start_date_time?: string;
  end_date_time?: string;
  total_cost?: number;
  duration?: number;
  payment_id?: string;
  status?: "Complete" | "Active" | "Upcoming" | "Cancelled" | "Other";
  payment_method_details: any
}

/**
 * @name IVehicle 
 * @description Vehicle data type
 */

export interface IVehicle {
  vehicle_id?: number;
  vehicle_type?: string;
  location_id?: number;
  color?: string;
  seats?: number;
  plate?: string;
  transmission?: "Manual" | "Automatic";
  year?: number;
  longitude?: number;
  latitude?: number;
  status?: "Available" | "Unavailable" | "Booked" | "Restricted";
  make: string;
  model: string;
  hourly_rate: number;
  host: {
    userId?: string;
    fname?: string;
    lname?: string;
    profile_pic_url?: string;
    handle?: string;
  },
  location: {
    location_id?: number;
    entity_id?: string;
    market: {
      market_id?: number;
      country?: string;
      name?: string;
      latitude?: string;
      longitude?: string;
      status?: "Active" | "Nonactive";
    },
    address?: string;
    building_name?: string;
    picture_url?: string;
    directions?: string;
    longitude?: string;
    latitude?: string;
    status?: "Active" | "Nonactive" | "Suspended";
  };
  vehicle_pictures?: string[];
  
}

/**
 * @name PaymentMethod 
 * @description Payment method data type
 */

export interface ICardPaymentMethod {
  last4: string,
  brand: string,
  expMonth: number,
  expYear: number,
  nameOnCard: string,
}

export interface IPaymentMethod<T> {
  paymentType: 'MC' | 'Visa' | 'AMEX' | 'Discover' | 'Paypal' | 'Mpesa',
  entityId?: string,
  details: T,
  paymentMethodId?: string
};

export interface IRawCard {
  cardNumber: string,
  expDate: string,
  cvv: string,
  name: string,
  email: string,
}

export interface IPaypalInfo {
  email: string,
}

export interface IMPesaInfo {
  phoneNumber: string,
}

//Raw payment details to be sent to the server
export interface IRawPaymentMethodDetails<T> {
  details: T | null
}

/**
 * @name APIDto 
 * @description API data transfer object
 * @description a generic type that can be used to define the shape of the data that is sent to the server
 */

export interface IAPIDto<T> {
  message: string,
  data: T,
  status: "success" | "error"
}

/**
 * @section data types for the objects being used around the app
 */
export interface dIUserProfile {
  uid?: string;
  fname: string;
  lname: string;
  email: string;
  handle: string;
  phone: string;
  profile_pic_url: string;
  settings?: {
    notificationsEnabled?: boolean;
  } | null,
  user_type: "host" | "customer",
  status?: "Active" | "NonActive" | "Banned" | "Suspended";
  market?: {
    market_id?: number;
    country?: string;
    name?: string;
    latitude?: string;
    longitude?: string;
    status?: "Active" | "Nonactive";
  } | null,
  customer_id?: string;
  DriverCredentials?: {
    drivers_licence_front?: string;
    drivers_licence_back?: string;
  }
}


/**
 * @name vehicleInspection 
 * @description Vehicle Inspection data type
 * added null type to pictures to allow for expo image picker default
 * 
 */
export interface vehicleInspection {
  vehicleId: number
  vehicleAvailability: boolean;
  vehicleAvailabiltyDetails?: string;
  vehicleAvailabilityPictures?: string | null;
  vehicleDamage: boolean;
  vehicleDamageDetails?: string;
  vehicleDamagePictures?: string | null;
  vehicleCleanliness: boolean;
  vehicleCleanlinessDetails?: string;
  vehicleCleanlinessPictures?: string | null;
  vehicleGas: number;
}

