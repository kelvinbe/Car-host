import { Heading, Button } from "@chakra-ui/react";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";

const ErrorFallback = ()=>{
    const { resetBoundary } = useErrorBoundary();
    return(
        <div>
            <Heading size={'md'}>Something went wrong</Heading>
            <Button onClick={resetBoundary}>Try again</Button>
        </div>
    )
}

export default ErrorFallback