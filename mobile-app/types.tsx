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
  }
};

export type BottomTabParamList = {
  SearchScreen: undefined;
  Storybook: undefined;
  History: undefined;
  Upcoming: undefined;
  Profile: undefined;
  ManageRes: undefined;
  Issues: undefined;
  NotFound: undefined;
  BookingDetails: undefined;
};

export type SearchScreenParamList = {
  SearchScreenHome: undefined;
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

export type ProfileScreenParamList = {
  ProfileScreenHome: undefined;
  ProfileScreenEdit: undefined;
  PaymentDetailsScreen: undefined;
  ProfileSettingsScreen: undefined;
  AboutScreen: undefined;
  PrivacyPolicy: undefined;
  UserAgreement: undefined;
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
export interface IReservation {
  reservationId: string;
  hostId: string;
  startDateTime: string;
  endDateTime: string;
  vehicleId: string;
  vehicleModel: string;
  vehicleMake: string;
  vehiclePicUrl: string;
  locationAddress: string;
  marketName: string;
  total: string;
  status: string;
  paymentMethod?: IPaymentMethod<any>;
}

/**
 * @name IVehicle 
 * @description Vehicle data type
 */

export interface IVehicle {
  vehicleId: string,
  vehicleType: string,
  vehicleMake: string,
  vehicleModel: string,
  locationId: string,
  color: string,
  seats: number,
  transmission: string,
  year: number | string,
  status: "Available" | "Unavailable" | "Intent",
  hourlyRate: number,
  vehiclePictures: string[],
  location: string,
  coords: {
     latitude: number,
     longtitude: number
  } | null
  
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
  details: T
};

export interface IRawCard {
  cardNumber: string,
  expMonth: number,
  expYear: number,
  cvc: string,
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