import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { deleteProduct } from "../../redux/actions/product";
import styles from "../../styles/style";
import { getAllOrderOfShop } from "../../redux/actions/order";

const AllOrders = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  // ✅ Fetch all products after seller data is available
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrderOfShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

   const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params) =>
          params.value === "Delivered" ? "greenColor" : "redColor",
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        sortable: false,
        renderCell: (params) => (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        ),
      },
    ];
  
    const row=[];
  
    orders &&
      orders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "US$ " + item.totalPrice,
          status: item.status,
        });
      });
  // ✅ Render
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mt-10 bg-white pt-1 mx-0">
          <div className="w-full">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;
