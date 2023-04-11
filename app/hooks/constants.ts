// ---------------------------------- Endpoints ---------------------------------- //
const DEV_DOMAIN = `http://localhost:4000/api`
const PROD_DOMAIN = `http://localhost:3000`

const DOMAIN = process.env.NODE_ENV === "production" ? PROD_DOMAIN : DEV_DOMAIN
export const RESERVATION_DOMAIN = `${DOMAIN}/reservations`
export const EVENT_DATA_DOMAIN = `${DOMAIN}/reservations/calendar`
export const RESOURCE_DATA_DOMAIN = `${DOMAIN}/reservations/calendar/resources`
export const VEHICLES_DOMAIN = `${DOMAIN}/vehicles`
export const PAYOUT_DOMAIN = `${DOMAIN}/payouts`
export const LOCATIONS_DOMAIN = `${DOMAIN}/locations`
export const AUTHCODE_DOMAIN = `${DOMAIN}/authcodes`
export const REQUESTED_AUTHCODE_DOMAIN = `${DOMAIN}/authcodes?status=INACTIVE`
export const USERS_DOMAIN = `${DOMAIN}/users`
export const STATIONS_DOMAIN = `${DOMAIN}/stations`


/**
 * @name STATIONS_API
 * @description - all station related endpoints are accessible through this api route
 */
export const STATIONS_API = `${DOMAIN}/location/station`

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
 * @name USERSETTINGS_API
 * @description - all user settings related endpoints are accessible through this api route
 */
export const USERSETTINGS_API = `${DOMAIN}/users/settings`




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