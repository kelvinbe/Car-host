export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ConfirmationSent: undefined;
};

export type BottomTabParamList = {
  SearchScreen: undefined;
  Storybook: undefined;
  History: undefined;
  Upcoming: undefined;
  Profile: undefined;
  ManageRes: undefined;
  Issues: undefined;
  NotFound: undefined;
};

export type SearchScreenParamList = {
  SearchScreenHome: undefined;
  MapScreen: undefined | {
    searchType?: "local" | "host",
    hostCode?: string
  };
  BookingConfirmationScreen: undefined;
}

export type ManageResParamList = {
  ManageResHome?: undefined;
  BookingDetails?: undefined;
}

export type ProfileScreenParamList = {
  ProfileScreenHome: undefined;
  ProfileScreenEdit: undefined;
  PaymentDetailsScreen: undefined;
  ProfileSettingsScreen: undefined;
}

export type PaymentDetailsScreenParamList = {
  PaymentDetailsScreenHome: undefined;
  MPesaDetailsScreen: undefined;
}

export type BottomSheetParamList = {
  BookingDetails: undefined;
  ChoosePayment: undefined;
  PaymentAuthorization: undefined;
}