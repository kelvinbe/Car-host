const RESERVE = "INSERT INTO users (id, createdAt, email, hash, salt) VALUES(?, ?, ?, ?, ?)";

const ADD_STRIPE_CUSTOMER_ID = "UPDATE users SET stripeCustomerId = ? WHERE id = ?";

const EDIT_PROFILE = "";

const SET_PAYMENT = "";

const REPORT_ISSUE = "";

const REGISTER = "";

const FORGOT_PASSWORD = "";

const SET_SETTINGS = "";

const ADD_CARD = "INSERT INTO Payment_Types (paymentTypeId, entityId, details, status ) VALUES(?, ?, ?, ?)";

const CREATE_PASSWORD = "";

const MODIFY_BOOKING = "";

const CANCEL_BOOKING = "";

export {
    RESERVE,
    EDIT_PROFILE,
    SET_PAYMENT,
    REPORT_ISSUE,
    REGISTER,
    FORGOT_PASSWORD,
    SET_SETTINGS,
    ADD_CARD,
    CREATE_PASSWORD,
    MODIFY_BOOKING,
    CANCEL_BOOKING,
    ADD_STRIPE_CUSTOMER_ID
};