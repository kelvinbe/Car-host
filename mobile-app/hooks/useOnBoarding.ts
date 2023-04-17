import { isEmpty, isNull } from 'lodash';
import { useEffect, useState } from 'react';
import {
  resetOnboarding,
  selectOnBoardingCompleted,
  selectOnBoardingDriversLicense,
  selectOnBoardingFetchState,
  selectOnBoardingLocation,
  selectOnBoardingPaymentMethod,
  setOnBoarding,
  setOnBoardingDriversLicenseBack,
  setOnBoardingDriversLicenseFront,
  setOnBoardingLocation,
  setOnBoardingPaymentMethod,
  useAddOnboardingPaymentMethodMutation,
  useGetOnboardingQuery,
  useUpdateDriverCredentialsMutation,
  useUpdateOnboardinProfileMutation,
} from '../store/slices/onBoardingSlice';
import { selectStripeCustomerId } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

function useOnBoarding() {
  
  const [
    updateDriverCredentials,
    { isLoading: isUpdatingLicense, isError: updateLicenseError },
  ] = useUpdateDriverCredentialsMutation();

  const [
    updateProfile,
    { isLoading: isUpdatingProfile, isError: updateProfileError },
  ] = useUpdateOnboardinProfileMutation();

  const [
    addPaymentMethod,
    { isLoading: isAddingPaymentMethod, isError: addPaymentMethodError },
  ] = useAddOnboardingPaymentMethodMutation();

  

  const dispatch = useAppDispatch();
  const completed = useAppSelector(selectOnBoardingCompleted);
  const driversLicense = useAppSelector(selectOnBoardingDriversLicense);
  const paymentMethod = useAppSelector(selectOnBoardingPaymentMethod);
  const location = useAppSelector(selectOnBoardingLocation);
  const customer_id = useAppSelector(selectStripeCustomerId);
  const fetchState = useAppSelector(selectOnBoardingFetchState)


  /**
   * @name resetOnBoarding
   * @description resets the onboarding state
   */
  function _resetOnBoarding() {
    dispatch(resetOnboarding());
  }

  /**
   * @name setLicence
   * @description sets the drivers license
   */
  function _setLicence(license: string, side: 'front' | 'back') {
    if (side === 'front') {
      dispatch(
        setOnBoardingDriversLicenseFront(license)
      );
    }else if(side === 'back'){
      dispatch(
        setOnBoardingDriversLicenseBack(license)
      );
    }
  }

  /**
   * @name setPaymentMethod
   * @description sets the payment method
   */
  function _setPaymentMethod(paymentMethod: { type: string; card?: any }) {
    dispatch(setOnBoardingPaymentMethod(paymentMethod));
  }
  /**
   * @name setLocation
   * @description sets the location
   */
  function _setLocation(location: any) {
    dispatch(setOnBoardingLocation(location));
  }

  /**
   * @name setCompleted
   * @description sets the completed object
   */
  function _setCompleted(completed: any) {
    /**
     * based on which is completed send to the server
     */
    switch (completed) {
      case completed.drivers_license:
        updateDriverCredentials({ drivers_license: driversLicense });
        break;
      case completed.payment:
        addPaymentMethod({
          ...(paymentMethod?.card ?? {}),
          type: paymentMethod?.type ?? 'card',
          customer_id: customer_id,
        });
        break;
      case completed.location:
        updateProfile({
          market_id: location.market_id,
          sub_market_id: location.sub_market_id,
        });
        break;
      default:
        break;
    }
    dispatch(setOnBoarding(completed));
  }

  return {
    completed,
    driversLicense,
    paymentMethod,
    resetOnBoarding: _resetOnBoarding,
    setLicence: _setLicence,
    setPaymentMethod: _setPaymentMethod,
    setCompleted: _setCompleted,
    setLocation: _setLocation,
    isUpdatingLicense,
    updateLicenseError,
    loading: fetchState.loading,
    error: fetchState.error,
  };
}

export default useOnBoarding;
