import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Stats from "./Stats";
import generateMediumDataset from "../data/dataGenerator";
import ProductTable from "./ProductTable";
import PaginationMenu from "./PaginationMenu";

const ProductDashboard = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(() => generateMediumDataset(250));
  const [dataShown, setDataShown] = useState([]);
  // a function to slice the data and send it to display
useEffect(() => {
  const sliceData = (products) => {
    const initialIndex = (currentPage - 1) * 10;
    const lastIdx = initialIndex + 10;
    const requiredArr = products.slice(initialIndex, lastIdx);
    setDataShown(requiredArr);
  };

  sliceData(products);
}, [currentPage, products]);

  
  //import dev Data

  // Sidebar Handlers from header to sidebar
  const handleSideBar = () => {
    console.log(`handle sidebar clicked`);
    setShowSideBar((prev) => !prev);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  // pagination menu functions
  const toggleNextPage=()=>{
    setCurrentPage(curr=> curr+1);
  }

  const togglePrevpage=()=>{
    if(currentPage !== 1){
      setCurrentPage(curr=> curr-1);
    }
  }

  return (
    <div className="p-2">
      <Header openSideBar={handleSideBar} />
      <SideBar showSideBar={showSideBar} onClose={closeSideBar} />
      <Stats />
      <ProductTable tableData={dataShown} />
      <PaginationMenu currentPage={currentPage} handlePreviousPage={togglePrevpage} handleNextPage={toggleNextPage}/>
    </div>
  );
};

export default ProductDashboard;
