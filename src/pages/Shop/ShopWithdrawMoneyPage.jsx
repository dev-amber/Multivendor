import React from "react";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashbaordSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className=" w-[80px] lg:w-[330px]">
          <DashbaordSideBar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
