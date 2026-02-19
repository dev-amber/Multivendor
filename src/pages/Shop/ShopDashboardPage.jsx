import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashbaordSideBar from "../../components/Shop/Layout/DashboardSideBar"
import DashboardHero from "../../components/Shop/DashboardHero"

const ShopDashboardPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex items-start justify-between w-full'>
            <div className=' w-[80px] lg:w-[330px]'>
                <DashbaordSideBar active={1}/>
                </div>
                <DashboardHero/>
        </div>
    </div>
  )
}

export default ShopDashboardPage