/**
 * @section - Entity Type Definitions
 * @description - These are the types that are used to define the data that is being piped directly into the database to prevent confusion
 *                with other types that may share the same name. Each of these interfaces is prefixed with "eI" to indicate that they are
 *                entity interfaces.
 */
export interface eIUser {
    uid?: string,
    company_id?: string,
    entity_id?: string;
    handle?: string;
    fname?: string;
    lname?: string;
    email?: string;
    phone?: string;
    profile_pic_url?: string;
    market_id?: string;
    user_type?: "host" | "customer";
    status?: "Active" | "NonActive" | "Banned" | "Suspended";
    customer_id?: string;
}


export interface eIVehicle {
    vehicle_id?: number;
    entity_id?: string;
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
    hourly_rate?: number;
}

export interface eIVehiclePicture {
    picture_id?: number;
    vehicle_id?: number;
    picture_url?: string;
    status?: "Active" | "Nonactive" | "Blocked";
}

export interface eITracking {
    tracking_id?: number;
    reservation_id?: string;
    longitude?: number;
    latitude?: number;
    date_time?: string;
}

export interface eIReservation {
    reservation_id?: string;
    type?: string,
    entity_id?: string;
    user_id?: string;
    location_id?: number;
    vehicle_id?: number;
    start_date_time?: string;
    end_date_time?: string;
    hourly_rate?: number;
    total_cost?: number;
    duration?: number;
    payment_id?: string;
    status?: "Complete" | "Active" | "Upcoming" | "Cancelled" | "Other" | "Blocked";
}

export interface eIPayout {
    payout_id?: number;
    entity_id?: string;
    date_time?: string;
    amount?: number;
    status?: "Complete" | "Denied" | "Incomplete" | "Success" | "Hold"
}


export interface eIPaymentType {
    payment_type_id?: number;
    entity_id?: string;
    payment_type?: "MC" | "Visa" | "Discover" | "AMEX" | "Paypal" | "Mpesa";
    details?: string;
    status?: "Active" | "Nonactive"
}

export interface eIPayment {
    payment_id?: number;
    payment_type?: "MC" | "Visa" | "Discover" | "AMEX" | "Paypal" | "Mpesa";
    accountNum?: string;
    authorization?: string;
    payment_token?: string;
    amount?: number;
    tax?: number;
    date_time?: string;
    status?: "Complete" | "Declined" | "Blocked" | "Error";
}

export interface eIMarket {
    market_id?: number;
    country?: string;
    name?: string;
    /**
     * The market's currency e.g. USD, KES, etc.
     */
    currency?: string;
    status?: "Active" | "Nonactive";
}

export interface eILocation {
    location_id?: number;
    entity_id?: string;
    market_id?: number;
    address?: string;
    building_name?: string;
    picture_url?: string;
    directions?: string;
    longitude?: string;
    latitude?: string;
    status?: "Active" | "Nonactive" | "Suspended";
}

export interface eIIntergration {
    integration_id?: number;
    entity_id?: string;
    details?: string;
    status?: "Active" | "Nonactive" | "Error";
}

export interface eIAvailabilityBlackout {
    avail_blackout_id?: number;
    entity_id?: string;
    vehicle_id?: number;
    block?: string;
    status?: "Active" | "Nonactive" | "Expired" | "Invalid"
}

export interface eIAuthCode {
    auth_code_id?: number;
    entity_id?: string;
    exp?: string;
    code?: string;
    vehicle_id?: number;
    status?: "Active" | "Expired" | "Revoked" | "Nonactive";
}

export interface eIProperty {
    id: string;
    name: string;
    type: string;
    units: number;
    rate: number;
    rate_type: string;
    conutry: string;
    address: string;
    is_managed: boolean;
    movein_lead_time: number;
    pictures: string[];
    description: string;
    size: number;
    rating: number;
    status: "BOOKED" | "PENDING" | "AVAILABLE";
}

export interface eIBooking {
    id: string;
    user_id: string;
    host_id: string;
    property_id: string;
    checkin_date: Date;
    checkout_date: Date;
    amount: number;
    tax: number;
    fees: number;
    adults: number;
    kids: number;
    pets: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}