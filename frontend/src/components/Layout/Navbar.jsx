import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/style";

const Navbar = ({ active }) => {
  return (
    <div className={`block lg:flex ${styles.normalFlex} bg-[#000]`}>
      {navItems &&
        navItems.map((item, index) => (
          <div key={index} className="flex">
            <Link
              to={item.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : "text-white"
              } pb-[30px] lg:pb-0 font-[500] px-6 cursor-pointer`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
