import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native'
import axios from 'axios'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseApp'
import { selectBookingData, setAuthCode, setBillingInfo, setEndDateTime, setHostId, setStartDateTime, setStatus, setVehicle, clearBookingState } from '../store/slices/bookingSlice'
import { selectStripeCustomerId } from '../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
import { IPaymentMethod } from '../types'
import { calcDuration } from '../utils/utils'
import { BACKEND_DOMAIN } from './constants'
import useToast from './useToast'



function useBookingActions() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [paymentOption, setPaymentOption] = useState<any>(null)
    const toast = useToast()

    const reduxDispatch = useAppDispatch()
    // Selectors
    const bookingDetails = useAppSelector(selectBookingData)
    const customerId = useAppSelector(selectStripeCustomerId)

    //Actions
    const _setStatus = (status: any) => reduxDispatch(setStatus({status}))
    const _setAuthCode = (authCode: any) => reduxDispatch(setAuthCode({authCode}))
    const _setStartDateTime = (startDateTime: any) => reduxDispatch(setStartDateTime({startDateTime}))
    const _setEndDateTime = (endDateTime: any) => reduxDispatch(setEndDateTime({endDateTime}))
    const _setHostId = (hostId: any) => reduxDispatch(setHostId({hostId}))
    const _setVehicle = (vehicle: any) => reduxDispatch(setVehicle({vehicle}))
    const _setBillingInfo = (billingInfo: IPaymentMethod<any>) => reduxDispatch(setBillingInfo({billingInfo}))
    const _clearBookingState = () => reduxDispatch(clearBookingState())


    /**
     * @name payForReservation
     * @description This function is used to pay for the reservation
     * @param {string} paymentMethodId - The payment method id
     */

    const payForReservation = async (paymentMethodId: string) => {
      setLoading(true)
      auth?.currentUser?.getIdToken().then((token)=>{
        /**Stripe payment sheet */
        axios.post(`${BACKEND_DOMAIN}/api/stripe/actions/createPaymentIntent`, {
            hourlyRate: bookingDetails?.vehicle?.hourly_rate,
            hours: calcDuration(bookingDetails?.startDateTime, bookingDetails?.endDateTime),
            stripePaymentMethodId: bookingDetails?.billingInfo?.entityId,
            stripeCustomerId: customerId
        }, {
            headers: {
                token: `Bearer ${token}`
            }
        }).then(({data: {data}})=>{
            initPaymentSheet({
                paymentIntentClientSecret: data.client_secret,
                merchantDisplayName: "divvly",
                customerId: customerId,
                customerEphemeralKeySecret: data.ephemeralKey
            }).then(()=>{
                presentPaymentSheet().then((rs)=>{
                    setLoading(false)
                    setPaymentOption(rs)
                }).catch((e)=>{
                  setLoading(false)
                  setError(e)
                  toast({
                    message: "An error Occured",
                    type: "error",
                    duration: 3000,
                    title: "Error"
                  })
                    console.log(e)
                })
            }).catch((e)=>{
                setLoading(false)
                setError(e)
                console.log(e)
                toast({
                    message: "An error Occured",
                    type: "error",
                    duration: 3000,
                    title: "Error"
                })
            })
        }).catch((e)=>{
            setLoading(false)
            setError(e)
            console.log(e)
            toast({
                message: "An error Occured",
                title: "Error",
                type: "error",
                duration: 4000
            })
        })
      }).catch((e)=>{
          setLoading(false)
          setError(e)
          console.log(e)
          toast({
            message: "An error Occured",
            title: "Error",
            type: "error",
            duration: 4000
        })
      })
    }

  return {
    setStatus: _setStatus,
    setAuthCode: _setAuthCode,
    setStartDateTime: _setStartDateTime,
    setEndDateTime: _setEndDateTime,
    setHostId: _setHostId,
    setVehicle: _setVehicle,
    setBillingInfo: _setBillingInfo,
    bookingDetails,
    clearBookingState: _clearBookingState,
    payForReservation,
    payForReservationError: error,
    payForReservationLoading: loading,
    paymentOption
  }
}

export default useBookingActions