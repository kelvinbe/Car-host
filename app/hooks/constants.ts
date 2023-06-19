// ---------------------------------- Endpoints ---------------------------------- //

const DOMAIN = `${process.env.NEXT_PUBLIC_API_DOMAIN as string}/api` 
export const RESERVATION_DOMAIN = `${DOMAIN}/reservations`
export const EVENT_DATA_DOMAIN = `${DOMAIN}/reservations/calendar`
export const RESOURCE_DATA_DOMAIN = `${DOMAIN}/reservations/calendar`
export const VEHICLES_DOMAIN = `${DOMAIN}/vehicles`
export const PAYOUT_DOMAIN = `${DOMAIN}/payouts`
export const LOCATIONS_DOMAIN = `${DOMAIN}/location`
export const AUTHCODE_DOMAIN = `${DOMAIN}/authcodes`
export const REQUESTED_AUTHCODE_DOMAIN = `${DOMAIN}/authcodes?status=INACTIVE`
export const USERS_DOMAIN = `${DOMAIN}/users`
export const STATIONS_DOMAIN = `${DOMAIN}/stations`


/**
 * @name STATIONS_API
 * @description - all station related endpoints are accessible through this api route
 */
export const STATIONS_API = `${DOMAIN}/location/stations`
export const STATION_API = `${DOMAIN}/location/station`

/**
 * @name SUBMARKETS_API
 * @description - all submarket related endpoints are accessible through this api route
 */
export const SUBMARKETS_API = `${DOMAIN}/location/submarkets`

/**
 * @name MARKETS_API
 * @description - all market related endpoints are accessible through this api route
 */
export const MARKETS_API = `${DOMAIN}/location/markets`

/**
 * @name PAYOUTMETHODS_API
 * @description - all payout methods related endpoints are accessible through this api route
 */
export const PAYOUTMETHODS_API = `${DOMAIN}/payouts`

/**
 * @name WITHDRAWALS_API
 * @description - all withdrawals related endpoints are accessible through this api route
 */
export const WITHDRAWALS_API = `${DOMAIN}/payouts/withdrawals`
/**
 * @name USERSETTINGS_API
 * @description - all user settings related endpoints are accessible through this api route
 */
export const USERSETTINGS_API = `${DOMAIN}/settings`
/**
 * @name EARNINGS_API
 * @description - all user earnings related endpoints are accessible through this api route
 */
export const EARNINGS_API = `${DOMAIN}/payments/report`

/**
 * The tracking service's endpoint
 */
export const TRACKING_SERVICE = process.env.NEXT_PUBLIC_TRACKING_SERVICE 




// ---------------------------------- Other Constants ---------------------------------- //

/**
 * @name http_methods
 * @description - makes ut
 */
export const http_methods = {
    post: "POST",
    get: "GET",
    put: "PUT",
    delete: "DELETE",
    patch: "PATCH",
}