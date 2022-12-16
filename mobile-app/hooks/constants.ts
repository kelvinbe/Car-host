import Constants from "expo-constants";
const { manifest } = Constants;

// Api Endpoints

const _DOMAIN = (typeof manifest?.packagerOpts === `object`) && manifest.packagerOpts.dev
? manifest?.debuggerHost?.split(`:`)?.shift()?.concat(`:3003`)
: `production domain `;
export const DOMAIN = `http:${_DOMAIN}`


export const ADD_CARD_ENDPOINT = DOMAIN + "/api/card";

export const CANCEL_BOOKING_ENDPOINT = DOMAIN + "/api/cancel";

export const CREATE_PASSWORD_ENDPOINT = DOMAIN + "/api/password";

export const EDIT_PROFILE_ENDPOINT = DOMAIN + "/api/profile";

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

export const SET_SETTINGS_ENDPOINT = DOMAIN + "/api/settings";

export const VERIFY_AUTH_CODE_ENDPOINT = DOMAIN + "/api/authcode";

export const SEND_MAIL_ENDPOINT = DOMAIN + "/api/mail/send/message";

export const SEND_TEMPLETE_MAIL_ENDPOINT = DOMAIN + "/api/mail/send/template"; 
