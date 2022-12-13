import React from 'react'

interface IProps {
    error: any
}

function ErrorComponent(props: IProps) {

    const { error } = props
    
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full w-full">
        <p className="font-bold text-lg mb-2" >
            An error occured
        </p>
        <p className="text-sm text-gray-500" >
            {error.message}
        </p>
    </div>  
  )
}

export default ErrorComponent