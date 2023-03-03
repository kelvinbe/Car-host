const DEV_DOMAIN = `http://localhost:4000`
const PROD_DOMAIN = `http://localhost:3000`

const DOMAIN = process.env.NODE_ENV === "production" ? PROD_DOMAIN : DEV_DOMAIN
export const RESERVATION_DOMAIN = `${DOMAIN}/reservations`