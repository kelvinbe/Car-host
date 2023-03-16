import { eIVehicle, eIReservation, eIPaymentType, eIMarket, eIIntergration } from './entities';
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
  export interface IVehicleDetails{
    vehicle_id?:number,       
    transmission: "Automatic" | "Semi-Automatic" | "Manual" | "CVT",
    year: number,
    status: "active" | "unavailable" | "available",
    make: string,
    model: string,
    plate:string,
    hourly_rate: number,
    vehicle_pictures?: []|string[]
 }
  export interface IReservation {
    id?:number;
    reservation_id: string;
    vehicle_id:string,
    plate:string,
    make:string,
    model:string,
    host_handle:string,
    market_name:string,
    address:string,
    building_name:string
    start_date_time: string;
    end_date_time: string;
    total_cost: number;
    status: string;
    // paymentMethod?: IPaymentMethod<any>;
  }

  export interface IPayout {
    payout_id: number;
    amount: number;
    payout_date: string;
    status: "paid"|"pending"
  }


  export interface IIntegrations {
      integrationName: string;
      status: string;
  }


export interface ILocation {
    location_id: number;
    vehicle: {
      vehicle_name:string
    };
    address: string;
    market_name: string;
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
export interface IAuthCode {
  date:string;
  code: string;
  status:string;
}


/**
 * @name GenerateDataTransferObject
 * @description - Generic data transfer object that is used to send data to the client. This is used to send data to the client in a consistent manner.
 */
export interface GenerateDataTransferObject<T> {
  type: "success" | "error";
  message: string;
  data: T;
}

/**
 * @section - Data transfer object definitions
 * @description - These are the types that are used to define the data that is sent as responses from the server. Each of these interfaces is prefixed with "dI" to indicate that they are
 *               data interfaces.
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
  },
  user_type: "host" | "customer",
  status?: "Active" | "NonActive" | "Banned" | "Suspended";
  market: {
    market_id?: number;
    country?: string;
    name?: string;
    latitude?: string;
    longitude?: string;
    status?: "Active" | "Nonactive";
  },
  customer_id?: string;
}

//extending but not all properties will be present
export interface dIVehicle extends eIVehicle {
  host: {
    userId?: string;
    fname?: string;
    lname?: string;
    profile_pic_url?: string;
    hourly_rate?: number;
  },
  location: {
    location_id?: number;
    entity_id?: string;
    market: eIMarket,
    address?: string;
    building_name?: string;
    picture_url?: string;
    directions?: string;
    longitude?: string;
    latitude?: string;
    status?: "Active" | "Nonactive" | "Suspended";
  },
  
  vehicle_pictures?: string[];
}

//extending but not all properties will be present
export interface dIReservation extends eIReservation {
  customer: {
    userId?: string;
    fname?: string;
    lname?: string;
    profile_pic_url?: string;
  },
  vehicle: dIVehicle;
  payment: eIPaymentType;
}




