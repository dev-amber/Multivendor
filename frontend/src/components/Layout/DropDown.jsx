import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/style'

const DropDown = ({categoriesData, setDropDown}) => {
    const navigate=useNavigate()

    const submitHandle=(i)=>{
        navigate(`/products?category=${i.title}`)  // title jo bhi da ga shoes clothes wagra
        setDropDown(false)
        window.location.reload()   // its simple refesh the web page
    } 
  return (
    <div className='pb-4 w-[260px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm'>
       {
        categoriesData && categoriesData.map((i,index) =>(
           <div key={index} className={`${styles.noramlFlex}`} onClick={()=>submitHandle(i)}>
            <img src={i.image_Url} style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none"
            }}/>
            <h2 className='m-3 cursor-pointer select-none'>{i.title}</h2>
            </div>
        ))
       }
    </div>
  )
}

export default DropDown