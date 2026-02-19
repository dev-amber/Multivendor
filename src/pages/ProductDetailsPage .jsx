import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/product/ProductDetails";
import SuggestedProduct from "../components/product/SuggestedProduct";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.event);

  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get("isEvent");

  useEffect(() => {
    if (isEvent) {
      const event = allEvents?.find((item) => item._id === id);
      setData(event || null);
    } else {
      const product = allProducts?.find((item) => item._id === id);
      setData(product || null);
    }
  }, [id, isEvent, allProducts, allEvents]);

  return (
    <>
      <Header />
      {data && <ProductDetails data={data} />}
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
