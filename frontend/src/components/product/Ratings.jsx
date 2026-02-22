import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color="#f6b100"
          className="cursor-pointer mr-2"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // 4 accept 3.2 reject
      stars.push(
        <BsStarHalf
          key={i}
          color="#fb6a00"
          size={17}
          className="cursor-pointer mr-2"
        />
      );
    } else {
      <AiOutlineStar
        key={i}
        color="#fb6a00"
        className="cursor-pointer mr-2"
        size={20}
      />;
    }
  }
  return <div className="flex ">{stars}</div>;
};

export default Ratings;
