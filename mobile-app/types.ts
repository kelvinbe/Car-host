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
  Sandbox: undefined; //  TODO: remove
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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
  SearchScreenHome?: {
    searchType?: 'local' | 'host';
    hostCode?: string;
  }
  OnboardingHome: undefined;
  AddCardScreen: undefined;
  MapScreen: undefined | {
    searchType?: "local" | "host",
    hostCode?: string
  };
  BookingConfirmationScreen: {
    reservationId: string;
  };
};

export type ManageResParamList = {
  ManageResHome?: undefined;
  BookingDetails?: undefined;
};

export type UpcomingParamList = {
  UpcomingReservationsHome?: undefined;
  ReservationDetails?: {
    current?: boolean;
    id: string;
  };
  VehicleInspection?: undefined;
};
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
  MobileMoneyDetailsScreen: undefined;
  AddCardScreen: undefined;
};

export type BottomSheetParamList = {
  BookingDetails: undefined;
  ChoosePayment: undefined;
  PaymentAuthorization: undefined;
};

export type UserOnboardingParamList = {
  OnboardingHome: undefined;
  DriversLicense: undefined;
  Location: undefined;
  SelectPaymentMethod: {
    payment_method_added?: boolean;
  };
  SelectedPaymentMethod: {
    payment_method?: 'mpesa' | 'card' | 'cash';
  };
};

// General App Types
export interface IToast {
  id?: string | number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'primary';
  duration?: number;
  title?: string;
}

/**
 * App data types
 */

export interface IMarket {
  id: string;
  country: string;
  name: string;
  status: string;
  currency: string;
}

export interface ISubMarket {
  id: string;
  market_id: string;
  name: string;
  status: string;
}

export interface IUserSettings  {
  id: string
  notifications_enabled: boolean
  user_id: string
}

export interface IUserProfile {
  id: string;
  email: string;
  lname: string | null;
  fname: string | null;
  handle: string;
  phone: string | null;
  profile_pic_url: string | null;
  market_id: string | null;
  sub_market_id: string | null;
  user_type: string;
  status: string;
  connected_account_id: string | null;
  customer_id: string | null;
  description: string | null;
  uid: string;
  is_admin: boolean;
  market: IMarket | null;
  sub_market: ISubMarket | null;
  payment_types: IPaymentType[];
  DriverCredentials: Partial<DriverCredentials> | null;
  user_settings: IUserSettings | null;
}

export interface IPaymentType {
  id: string;
  user_id: string;
  status: string;
  details: { [key: string]: any };
  phone_number: number | null;
  stripe_payment_method_id: string | null;
  type: string;
  is_primary: boolean;
}

export interface IPayment {
  id: string;
  payment_type: string | null;
  account_number: string | null;
  authorization: string | null;
  paymentToken: string | null;
  amount: number;
  tax: number | null;
  date_time: Date;
  status: string;
  stripe_payment_id: string | null;
  user_id: string;
  receipt_number: string | null;
  payment_type_fk: IPaymentType | null;
  is_primary: boolean;
}

export interface DriverCredentials {
  id: string;
  user_id: string;
  drivers_licence_front: string | null;
  drivers_licence_back: string | null;
  drivers_licence: string | null;
  is_verified: boolean;
  status: string;
  driver_licence_expiry: Date | null;
}

export interface InspectionQuestion {
  question: string,
  description: string,
  option: null | 'yes' | 'no' ,
  images: null | string[],
  index: number,
}

export interface Inspection {
  id: string;
  created_at: Date;
  updated_at: Date;
  reservation_id: string;
  questions: InspectionQuestion[] | null;
  fuel: number | null;
}

export interface IStation {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  sub_market_id: string;
  user_id: string;
  status: string;
  latitude: number | null;
  longitude: number | null;
  sub_market: ISubMarket | null;
}



/**
 * @name IReservation
 * @description Reservation data type
 */



export interface IReservation {
  id: string;
  user_id: string;
  vehicle_id: string;
  start_date_time: string;
  end_date_time: string;
  created_at: string;
  updated_at: string;
  status: string;
  type: string;
  payment_id: string | null;
  vehicle: IVehicle;
  user: IUserProfile;
  payment: IPayment | null;
  inspection: Inspection | null;
  inspection_id: string
}

/**
 * @name IVehicle
 * @description Vehicle data type
 */

export interface IVehicle {
  id: string;
  user_id: string;
  station_id: string;
  color: string | null;
  seats: number | null;
  plate: string | null;
  transmission: string | null;
  year: number | null;
  make: string | null;
  model: string | null;
  hourly_rate: number | null;
  tracking_device_id: string | null;
  status: string;
  host: IUserProfile | null;
  station: IStation;
  location: any; // will be phased out
  VehiclePictures?: string[];
}

/**
 * @name PaymentMethod
 * @description Payment method data type
 */

export interface ICardPaymentMethod {
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  nameOnCard: string;
}

export interface IPaymentMethod<T> {
  paymentType: 'MC' | 'Visa' | 'AMEX' | 'Discover' | 'Paypal' | 'Mpesa';
  entityId?: string;
  details: T;
  paymentMethodId?: string;
}

export interface IRawCard {
  cardNumber: string;
  expDate: string;
  cvv: string;
  name: string;
  email: string;
}

export interface IPaypalInfo {
  email: string;
}

export interface IMPesaInfo {
  phoneNumber: string;
}

//Raw payment details to be sent to the server
export interface IRawPaymentMethodDetails<T> {
  details: T | null;
}

/**
 * @name APIDto
 * @description API data transfer object
 * @description a generic type that can be used to define the shape of the data that is sent to the server
 */

export interface IAPIDto<T> {
  message: string;
  data: T;
  status: 'success' | 'error';
}

/**
 * @section data types for the objects being used around the app
 */
// ------------------------------------------------------------------------------------------------------------------------

export interface dIUserSettings {
  id: string;
  notifications_enabled?: boolean;
  user_id: string;
}

export interface dIUserProfile {
  uid?: string;
  fname: string;
  lname: string;
  email: string;
  handle: string;
  phone: string;
  profile_pic_url: string;
  user_settings?: dIUserSettings;
  user_type: 'HOST' | 'CUSTOMER';
  status?: 'ACTIVE' | 'NONACTIVE' | 'BANNED' | 'SUSPENDED';
  market?: {
    market_id?: number;
    country?: string;
    name?: string;
    latitude?: string;
    longitude?: string;
    status?: 'Active' | 'Nonactive';
  } | null;
  customer_id?: string;
  DriverCredentials?: {
    drivers_licence_front?: string;
    drivers_licence_back?: string;
  };
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

