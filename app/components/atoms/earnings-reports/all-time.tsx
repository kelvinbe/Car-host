import React, { useEffect } from 'react'
import { Text, TextProps } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { fetchPayoutReport, selectPayoutReportFeedback } from '../../../redux/withdrawalSlice'
import TextLoading from '../Feedback/text-loading'
import TextError from '../Feedback/text-error'

interface Props extends TextProps {

}
function AllTimeEarnings(props: Props) {
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
        {
            `${data?.currency??""} `
        }
            {
                Intl.NumberFormat('en-US').format(data?.all_time ?? 0)
            }
        </Text>
    )
}



export default AllTimeEarnings 


