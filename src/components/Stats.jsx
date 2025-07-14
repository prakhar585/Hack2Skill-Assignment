import React from "react";
import { totalProducts, totalRevenue, lowItems } from "../data/mockData";
import { categorySize } from "../data/dataGenerator";
const Stats = () => {
  const totalNumberOfProduct = totalProducts;
  const totalRevenueOfProducs = new Intl.NumberFormat().format(totalRevenue);
  const totalLowItem = lowItems;
  const totalCategories = categorySize;

  return (
    <div className="px-2 flex flex-col items-center  text-center tablet:grid tablet:grid-cols-2 grid: desktop:flex desktop:flex-row desktop:justify-between ">
      <div className="w-full py-2 my-1 mx-3 shadow-md bg-blue-200 text-blue-900 font-semibold text-xs rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-110 hover:bg-indigo-500 hover:text-white">
        Total Products: {totalNumberOfProduct}{" "}
      </div>
      <div className="w-full py-2 my-1 mx-3 shadow-md bg-blue-200 text-blue-900 font-semibold text-xs rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-110 hover:bg-indigo-500 hover:text-white">
        Total revenue: {totalRevenueOfProducs}{" "}
      </div>
      <div className="w-full py-2 my-1 mx-3 shadow-md bg-blue-200 text-blue-900 font-semibold text-xs rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-110 hover:bg-indigo-500 hover:text-white">
        Low Stock Items: {totalLowItem}{" "}
      </div>
      <div className="w-full py-2 my-1 mx-3 shadow-md bg-blue-200 text-blue-900 font-semibold text-xs rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-110 hover:bg-indigo-500 hover:text-white">
        Categories Count: {totalCategories}{" "}
      </div>
      <div></div>
    </div>
  );
};

export default Stats;
