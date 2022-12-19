// Static props

export interface IStaticProps {
    dashboard?: boolean;
    authonly?: boolean;
    adminonly?: boolean;
}


/**
 * @section Request Objects
 */

export interface IRawCard {
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string,
    name: string,
    email: string,
}

export interface IPaymentIntentRequest {
    hourlyRate: number,
    hours: number,
    stripeCustomerId: string,
    stripePaymentMethodId: string,
    currency: string
}





/**
 * @section Types for data being piped into tables
 */

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
    // Not sure about these, need further clarification
    status: "active" | "Unavailable" | "Intent",
    hourlyRate: number,
    vehiclePictures: string[],
    location: string,
    coords: {
       latitude: number,
       longitude: number
    } | null
  }

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
    // paymentMethod?: IPaymentMethod<any>;
  }

  export interface IPayout {
    payoutId: string;
    amount: number;
    payDate: string;
    status: string
  }


export interface ILocation {
    locationId: string;
    vehicle: IVehicle;
    address: string;
    marketName: string;
    status: string;
}


export interface IUserProfile {
  fname: string;
  lname: string;
  email: string;
  handle: string;
  phone: string;
  profilePicUrl: string;
  marketId: string | number | null;
  userType: string;
  status: string;
  stripeCustomerId?: string;
}