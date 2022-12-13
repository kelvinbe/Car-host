import React from 'react'

interface IProps {
  children: React.ReactNode
}

function MainLayout(props: IProps) {
  const { children } = props
  return (
    <div className="flex flex-row items-center justify-start w-screen flex-1 h-full">
        {children}
    </div>
  )
}

export default MainLayout