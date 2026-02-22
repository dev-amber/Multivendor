import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [name, setName] = useState(seller && seller.name);
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);
  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          zipCode,
          address,
          description,
          phoneNumber,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated successfully");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
      });
  };
  return (
    <div className="w-full min-h-screen  flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center ">
          <div className="relative">
            <img
               src={avatar ? avatar : `${seller.avatar?.url}`}
              className="w-[200px] h-[200px] rounded-full cursor-pointer realtive "
              alt="image"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        {/* shop Info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex flex-col lg:w-[50%] mt-5 items-center">
            <div className="w-full pl-[3%] ">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              value={name}
              placeholder={`${seller.name}`}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col lg:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="w-[100%]  flex flex-col lg:w-[50%] mt-5 items-center">
            <div className="w-full pl-[3%] ">
              <label className="block pb-2">Shop address</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.address}`}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="w-[100%]  flex flex-col lg:w-[50%] mt-5 items-center">
            <div className="w-full pl-[3%] ">
              <label className="block pb-2">Shop phoneNumber</label>
            </div>
            <input
              type="number"
              placeholder={`${seller?.phoneNumber}`}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="w-[100%]  flex flex-col lg:w-[50%] mt-5 items-center">
            <div className="w-full pl-[3%] ">
              <label className="block pb-2">Shop ZipCode</label>
            </div>
            <input
              type="number"
              placeholder={`${seller?.zipCode}`}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="w-[100%]  flex flex-col lg:w-[50%] mt-5 items-center">
            <input
              type="submit"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value="Update Shop"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
