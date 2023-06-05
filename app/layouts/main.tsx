/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import LoadingComponent from '../components/molecules/feedback/LoadingComponent'

interface IProps {
  children: React.ReactNode
}

function MainLayout(props: IProps) {
  const { children } = props

  return (
    <div className="flex flex-row items-center justify-start w-screen flex-1 h-full">
        {
          children
        }
    </div>
  )
}

export default MainLayout