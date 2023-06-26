import React from 'react'
import { PagePhaseProps } from '../types'
import { isEmpty, isUndefined } from 'lodash'
import { Alert, AlertIcon } from '@chakra-ui/react'

interface Props extends PagePhaseProps {
    children: any
}

function PhaseReleaseHandler(props: Props) {
    const { phase, children} = props
    

    if (isUndefined(phase)) {
        return children
    }

    if (!isUndefined(phase)){
        if(!process.env.NEXT_PUBLIC_APP_ENV){
            return children
        }
        if (process.env.NEXT_PUBLIC_APP_ENV === "development"){
            return children
        }
        if (process.env.NEXT_PUBLIC_APP_ENV === "staging"){
            return children
        }
        if (process.env.NEXT_PUBLIC_APP_ENV === "testing"){
            return children
        }
        if (process.env.NEXT_PUBLIC_APP_ENV === "production"){
            return (
                <Alert status='info' className="w-screen h-screen items-center justify-center flex flex-row">
                    <AlertIcon/>
                    <h4 className="text-center font-bold text-2xl">
                        Coming Soon!!
                    </h4>
                </Alert>
            )
        }
        return null
    }

    return null
}

export default PhaseReleaseHandler