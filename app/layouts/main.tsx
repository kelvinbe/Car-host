/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import LoadingComponent from '../components/molecules/feedback/LoadingComponent'

interface IProps {
  children: React.ReactNode
}

function MainLayout(props: IProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const { events } = useRouter()
  const { children } = props

  useEffect(()=>{
    events.on('routeChangeStart', ()=>setLoading(true))
    events.on('routeChangeComplete', ()=>setLoading(false))
    events.on('routeChangeError', ()=>setLoading(false))

    return ()=>{
      setLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-row items-center justify-start w-screen flex-1 h-full">
        {loading ? <LoadingComponent/> :children}
    </div>
  )
}

export default MainLayout