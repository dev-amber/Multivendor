import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineDelete, } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import styles from "../../styles/style";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const [coupons,setCoupons]=useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}/coupon/get-coupon/${seller?._id}`,{
      withCredentials:true,
    }).then((res)=>{
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
    }).catch((error)=>{
     setIsLoading(false);
    })
    
  }, [ dispatch]);


  const handleDelete = async (id) => {
    axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
      toast.success("Coupon code deleted succesfully!")
    })
    window.location.reload();
  };
  // create coupon code form function
   const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
       toast.success("Coupon code created successfully!");
       setOpen(false);
       window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    
    {
      field: "Delete",
      headerName: "Delete",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = [];
  coupons &&
  coupons.forEach((item) => {
    rows.push({
      id: item._id,
      name: item.name,
      price: item.value  + "%",
      sold:10,
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mt-10 bg-white pt-1 mx-0">
          <div className="w-full flex justify-end ">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            className="px-5"
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062]  z-[2000] flex items-center justify-center">
              <div className=" w-[50%] lg:w[60%] h-[90vh] bg-white rounded-md shadow relative p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon Code
                </h5>
                {/* create coupon  code form */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  {/* discount percentage*/}
                  <div>
                    <label className="pb-2">
                      Discount Percentage<span className="text-red-500">*</span>
                    </label>
                    <input
                      cols="30"
                      rows="8"
                      required
                      type="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 pt-2 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your  coupon code value..."
                    />
                  </div>
                  <br />
                  {/* minAmount*/}
                  <div>
                    <label className="pb-2">
                      Min Amount<span className="text-red-500">*</span>
                    </label>
                    <input
                      cols="30"
                      rows="8"
                      type="number"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 pt-2 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your  coupon code min amount..."
                    />
                  </div>
                  <br />
                  {/* max Amount*/}
                  <div>
                    <label className="pb-2">
                      Max Amount<span className="text-red-500">*</span>
                    </label>
                    <input
                      cols="30"
                      rows="8"
                      type="number"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 pt-2 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your  coupon code max amount..."
                    />
                  </div>
                  <br />
                  {/*  selected products*/}
                  <div>
                    <label className="pb-2">
                      Selected Product<span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="choose a  selected products">
                        Choose a selected products
                      </option>
                      {/* static data used  and used for seller */}
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      cols="30"
                      rows="8"
                      required
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 pt-2 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;