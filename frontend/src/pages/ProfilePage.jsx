import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/style'
import ProfileSidebar from "../components/Profile/ProfileSidebar"
import ProfileContent from "../components/Profile/ProfileContent"

const ProfilePage = () => {
  const [active, setActive] = useState(1)

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}>
        {/* Sidebar */}
        <div className="w-[60px] lg:w-[335px] sticky lg:mt-0 mt-[18%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <ProfileContent active={active} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
