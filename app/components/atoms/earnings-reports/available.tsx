import React, { useEffect } from 'react'
import { Text, TextProps } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { fetchPayoutReport, selectPayoutReportFeedback } from '../../../redux/withdrawalSlice'
import TextLoading from '../Feedback/text-loading'
import TextError from '../Feedback/text-error'
import { RepeatIcon } from '@chakra-ui/icons'

interface Props extends TextProps {

}
function AvailableEarnings(props: Props) {
    const { ...text_props } = props
    const {data, loading, error}= useAppSelector(selectPayoutReportFeedback)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchPayoutReport())
    }, [])

    if(loading) return <TextLoading/> 
    if(error) return <TextError/>
    return (
        <Text
            {...text_props}
        >   
        <span>
            {
                `${data?.currency??""} `
            }
        </span>
        <span>
            {
                Intl.NumberFormat('en-US').format(data?.available ?? 0)
            }
        </span>
        </Text>
    )
}

export default AvailableEarnings


