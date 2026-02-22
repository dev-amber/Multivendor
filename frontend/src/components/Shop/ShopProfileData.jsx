import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard"
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/style";
import {useDispatch, useSelector} from "react-redux"
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import Ratings from "../product/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const{products}=useSelector((state)=> state.products);
    const { events } = useSelector((state) => state.event);
    const { seller } = useSelector((state) => state.seller);
  const {id}=useParams();
  const dispatch=useDispatch();


  useEffect(()=>{
    dispatch(getAllProductsShop(id))
     dispatch(getAllEventsShop(seller._id));
  }, [dispatch])

  const allReviews= products && products.map((product) => product.reviews).flat();
 


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between ">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
          <h5
            className={`font-[600]  text-[20px]  ${
              active === 1 ? "text-red-500" : "text-[#333]"
            } cursor-pointer pr-[20px] `}
          >
            Shop Products
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(2)}>
          <h5
            className={`font-[600]  text-[20px]  ${
              active === 2 ? "text-red-500" : "text-[#333]"
            } cursor-pointer pr-[20px] `}>
             Running Events
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(3)}>
          <h5
            className={`font-[600]  text-[20px]  ${
              active === 3 ? "text-red-500" : "text-[#333]"
            } cursor-pointer pr-[20px] `}
          >
            Shop Reviews
          </h5>
        </div>
        </div>

        <div className="">
         {
          isOwner  && (
            <div>
              <Link to="/dashboard" >
              <div className={`${styles.button} rounded-[4px] h-[42px]`}>
                <span className="text-white">
                  Go Dashbaord
                </span>
              </div>
              </Link>
              </div>
          )
         }
        </div>
      </div>

      <br/>
     {
      active === 1 && (
         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] border-0 mb-12">
        {
          products && products.map((i,index) => (
         <ProductCard key={index} data={i} isShop={true}/>
          ))
        }

      </div>
      )
     }

     {
      active === 2 && (
         <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] border-0 mb-12">
        {
          events && events.map((i,index) => (
         <ProductCard key={index} data={i} isShop={true} isEvent={true}/>
          ))
        }

      </div>
          </div>
      )
     }
     {
      active === 3 && (
        <div className="w-full">
         
          {
           allReviews && allReviews.map((item, index) =>  (
            <div className="w-full my-4 flex">
              <img src={`${backend_url}/${item.user.avatar}`} className="w-[50px] h-[50px] rounded-full" alt="image"/>
             
              <div className="pl-2">
                <div className="flex w-full items-center">
                  <h1 className="font-[600] pr-2"> {item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  
                
                <p className="font-[400] text-[#000000a7]">{item?.comment}</p> {/*bcz sometime we not add comment so write  ?*/}
                <p className="text-[12px] text-[#000000a7]">{'2days ago'}</p>
              
                </div>
              </div>
           ))
        }
          </div>
      )
     }
    </div>
  );
};

export default ShopProfileData;
