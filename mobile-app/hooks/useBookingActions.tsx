import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { selectBookingData, setAuthCode, setBillingInfo, setEndDateTime, setHostId, setStartDateTime, setStatus, setVehicle, clearBookingState } from '../store/slices/bookingSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
import { IPaymentMethod } from '../types'



function useBookingActions() {

  
    

    const reduxDispatch = useAppDispatch()
    // Selectors
    const bookingDetails = useAppSelector(selectBookingData)

    
    
  
    //Actions
    const _setStatus = (status: any) => reduxDispatch(setStatus({status}))
    const _setAuthCode = (authCode: any) => reduxDispatch(setAuthCode({authCode}))
    const _setStartDateTime = (startDateTime: any) => reduxDispatch(setStartDateTime({startDateTime}))
    const _setEndDateTime = (endDateTime: any) => reduxDispatch(setEndDateTime({endDateTime}))
    const _setHostId = (hostId: any) => reduxDispatch(setHostId({hostId}))
    const _setVehicle = (vehicle: any) => reduxDispatch(setVehicle({vehicle}))
    const _setBillingInfo = (billingInfo: IPaymentMethod<any>) => reduxDispatch(setBillingInfo({billingInfo}))
    const _clearBookingState = () => reduxDispatch(clearBookingState())



  return {
    setStatus: _setStatus,
    setAuthCode: _setAuthCode,
    setStartDateTime: _setStartDateTime,
    setEndDateTime: _setEndDateTime,
    setHostId: _setHostId,
    setVehicle: _setVehicle,
    setBillingInfo: _setBillingInfo,
    bookingDetails,
    clearBookingState: _clearBookingState
  }
}

export default useBookingActions