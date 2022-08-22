export const environment = {
  apiUrl: process.env.REACT_APP_API_URL,
  websocketUrl: process.env.REACT_APP_WEBSOCKET_URL as string,
  login: {
    root: `${process.env.REACT_APP_API_URL}/login`,
    google: `${process.env.REACT_APP_API_URL}/login/google`,
    office365: `${process.env.REACT_APP_API_URL}/login/office365`,
    slack: `${process.env.REACT_APP_API_URL}/login/slack`,
  },
  bills: {
    root: `${process.env.REACT_APP_API_URL}/bills`,
  },
  rooms: {
    root: `${process.env.REACT_APP_API_URL}/rooms`,
  },
  games: {
    root: `${process.env.REACT_APP_API_URL}/games`,
  },
  categories: {
    root: `${process.env.REACT_APP_API_URL}/categories`,
  },
  payments: {
    root: `${process.env.REACT_APP_API_URL}/payments`,
  },
  users: {
    root: `${process.env.REACT_APP_API_URL}/users`,
    subscription: `${process.env.REACT_APP_API_URL}/users/subscription`,
  },
  plans: {
    root: `${process.env.REACT_APP_API_URL}/plans`,
    plans: `${process.env.REACT_APP_API_URL}/plans/plans`,
    userLicenseAssignments: `${process.env.REACT_APP_API_URL}/plans/user-license-assignments`,
    userLicenseAssignment: `${process.env.REACT_APP_API_URL}/plans/user-license-assignment`,
  },
  loginCookieKey: "loginCookie",
  paymentServiceProvider: {
    checkoutUrl: process.env.REACT_APP_PAYMENT_SERVICE_PROVIDER_CHECKOUT_URL as string,
    responseUrl: process.env.REACT_APP_PAYMENT_SERVICE_PROVIDER_RESPONSE_URL as string,
    confirmationUrl: process.env.REACT_APP_PAYMENT_SERVICE_PROVIDER_CONFIRMATION_URL as string,
    apiKey: process.env.REACT_APP_PAYMENT_SERVICE_PROVIDER_API_KEY as string,
    accountId: process.env.REACT_APP_PAYMENT_SERVICE_PROVIDER_ACCOUNT_ID as string,
    merchantId: process.env.REACT_APP_PAYMENT_SERVICE_PROVIDER_MERCHANT_ID as string,
  },
};
