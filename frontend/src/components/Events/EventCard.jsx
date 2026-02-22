import React from "react";
import styles from "../../styles/style";
import CountDown from "./CountDown";
import { backend_url } from "../../server";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch=useDispatch();

  const addToCartHandler=(data)=>{
     const isItemExists = cart && cart.find((i) => i._id === data?._id);
        if (isItemExists) {
          toast.error("Item already in cart");
        } else {
          if (data.stock < 1) {
            toast.error("Product stock limited");
          } else {
            const cartData = { ...data, qty: 1 };
            dispatch(addToCart(cartData));
            toast.success("Item added to cart successfully");
          }
        }
  }
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      {/* left side - Image */}
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt="iPhone"
          className="w-full h-auto object-contain"
        />
      </div>
      {/* right side - Content */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center p-4">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p className="text-justify mb-4">{data?.description}</p>

        {/* price */}
        <div className="flex py-2 justify-between items-center mb-4">
          <div className="flex items-center">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="p-3 font-[400] text-[17px] text-[#44845e]">
            {data?.sold_out} sold
          </span>
        </div>
        {/* dynamic comp*/}

        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
            </Link>
            <div className={`${styles.button}  text-[#fff] ml-5`} onClick={()=>addToCartHandler(data)}>Add to Cart</div>
          
        </div>
      </div>
    </div>
  );
};

export default EventCard;
