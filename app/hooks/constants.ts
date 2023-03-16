const DEV_DOMAIN = `http://localhost:4000`
const PROD_DOMAIN = `http://localhost:3000`

const DOMAIN = process.env.NODE_ENV === "production" ? PROD_DOMAIN : DEV_DOMAIN
export const RESERVATION_DOMAIN = `${DOMAIN}/reservations`
export const EVENT_DATA_DOMAIN = `${DOMAIN}/event-data`
export const RESOURCE_DATA_DOMAIN = `${DOMAIN}/resource-data`
export const VEHICLES_DOMAIN = `${DOMAIN}/vehicles`
export const PAYOUT_DOMAIN = `${DOMAIN}/payouts`
export const LOCATIONS_DOMAIN = `${DOMAIN}/locations`

