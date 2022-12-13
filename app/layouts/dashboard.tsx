import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { app } from '../firebase/firebaseApp'
import useDashboardRoutes from '../hooks/useDashboardRoutes'
import { dashboardRoutes } from '../utils/routes'

interface IProps {
  children: React.ReactNode
}

const twStyles = {
  dashboardButton: "flex flex-row items-center justify-start w-full h-12 px-4 text-gray-500 hover:bg-slate-100 hover:text-slate-500 capitalize cursor-pointer ", 
  dashboardButtonsContainer: "flex flex-col items-start justify-start w-full h-full",
  logoutButton: "flex flex-row items-center justify-start w-full h-12 px-4  bg-blue-100 rounded-md hover:bg-blue-200 hover:text-slate-500 capitalize cursor-pointer ",
}

function Dashboardlayout(props: IProps) {
  const { children } = props 
  const  {push} = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
    const admin = localStorage.getItem("admin")
    if(admin){
      setIsAdmin(true)
    }
  }, [])

 const dashboardNavigation = useDashboardRoutes()

  const logout = () =>{
    getAuth(app).signOut().then(()=>{
      localStorage.removeItem("admin")
      push("/")
      //handle signout
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
    <div className="grid grid-cols-6 w-screen h-screen ">
        <div className="grid col-span-1 ">
            <div className="flex flex-col bg-slate-200 items-center justify-start flex-1">
                <h2 className="text-center font-bold text-lg">
                    Dashboard
                </h2>
                <div className={twStyles.dashboardButtonsContainer} >
                  {
                    dashboardRoutes?.filter(({admin}) => (admin && isAdmin) || !admin ).map(({name, onClick}, i)=>(
                      <button onClick={dashboardNavigation?.[onClick]} key={i} className={twStyles.dashboardButton} >
                        {name}
                      </button>
                    ))
                  }
                    <div className='mt-5 w-full flex items-center justify-center ' >
                      <button onClick={logout} className={twStyles.logoutButton} >
                        Logout
                      </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid bg-slate-50 col-span-5">
          <div className="flex flex-col items-center justify-center flex-1">
            {children}
          </div>
        </div>
    </div>
  )
}

export default Dashboardlayout