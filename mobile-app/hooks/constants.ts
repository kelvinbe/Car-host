import Constants from "expo-constants";
const { manifest } = Constants;

// Api Endpoints

const _DOMAIN = (typeof manifest?.packagerOpts === `object`) && manifest.packagerOpts.dev
? manifest?.debuggerHost?.split(`:`)?.shift()
: `production domain `;
export const DOMAIN = `http:${_DOMAIN}:3003`
console.log(DOMAIN)

export const BACKEND_DOMAIN = `http:${_DOMAIN}:3000`

export const ADD_CARD_ENDPOINT = DOMAIN + "/api/card";

export const DELETE_CARD_ENDPOINT = DOMAIN + "/api/card/1";

export const CANCEL_BOOKING_ENDPOINT = DOMAIN + "/api/cancel";

export const CREATE_PASSWORD_ENDPOINT = DOMAIN + "/api/password";

export const EDIT_PROFILE_ENDPOINT = DOMAIN + "/api/profile";

export const EXTEND_RESERVATION_ENDPOINT = DOMAIN + "/api/extendReservation";

export const FETCH_DATA_ENDPOINT = DOMAIN + "/api/init";

export const FETCH_HISTORY_ENDPOINT = DOMAIN + "/api/history";

export const FORGOT_PASSWORD_ENDPOINT = DOMAIN + "/api/forgotPassword";

export const MODIFY_BOOKING_ENDPOINT = DOMAIN + "/api/modify";

export const REGISTER = DOMAIN + "/api/register";

export const REPORT_ISSUE_ENDPOINT = DOMAIN + "/api/issues";

export const FETCH_RESERVATIONS_ENDPOINT = DOMAIN + "/api/reservations";

export const FETCH_VEHICLES_ENDPOINT = DOMAIN + "/api/vehicles";

export const RESERVE_ENDPOINT = DOMAIN + "/api/reserve";

export const SEARCH_BY_HOST_ENDPOINT = DOMAIN + "/api/searchHost";

export const SEARCH_LOCALLY_ENDPOINT = DOMAIN + "/api/searchLocally";

export const SET_PAYMENT_ENDPOINT = DOMAIN + "/api/payment";

export const FETCH_PAYMENT_METHODS_ENDPOINT = DOMAIN + "/api/paymentMethods";

export const DELETE_PAYMENT_METHOD_ENDPOINT = DOMAIN + "/api/paymentMethods/1";

export const SET_SETTINGS_ENDPOINT = DOMAIN + "/api/settings";

export const VERIFY_AUTH_CODE_ENDPOINT = DOMAIN + "/api/authcode";

export const SEND_MAIL_ENDPOINT = DOMAIN + "/api/mail/send/message";

export const SEND_TEMPLETE_MAIL_ENDPOINT = DOMAIN + "/api/mail/send/template"; 

export const FETCH_UPCOMING_RESERVATIONS_ENDPOINT = DOMAIN + "/api/upcomingReservations"; 

export const FETCH_HOSTS_VEHICLE_ENDPOINT = DOMAIN + "/api/host"; 

export const SET_NOTIFICATION_ENDPOINT = DOMAIN + "/api/notifications"; 

export const SET_VEHICLE_INSPECTION_ENDPOINT = DOMAIN + "/api/vehicleInspection"; 

export const END_RESERVATION_ENDPOINT = DOMAIN + "/api/endReservation/2"; 

export const REQUEST_AUTH_CODE_ENDPOINT = DOMAIN + "/api/requestAuthCode";

export const FETCH_USER_AGREEMENT_ENDPOINT = DOMAIN + "/api/userAgreement";

export const FETCH_PRIVACY_POLICY_ENDPOINT = DOMAIN + "/api/privacy_policy";

export const FETCH_SUPPORT_ENDPOINT = DOMAIN + "/api/support";