import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashbaordSideBar from "../../components/Shop/Layout/DashboardSideBar"
import DashboardMessages from "../../components/Shop/DashboardMessages"
const ShopInboxPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex items-start justify-between w-full'>
            <div className=' w-[80px] lg:w-[330px]'>
                <DashbaordSideBar active={8}/>
                </div>
                <DashboardMessages/>
        </div>
    </div>
  )
}

export default ShopInboxPage