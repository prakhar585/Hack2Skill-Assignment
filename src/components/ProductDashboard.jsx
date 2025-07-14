import React, { useEffect, useRef, useState, useMemo } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Stats from "./Stats";
import generateMediumDataset from "../data/dataGenerator";
import ProductTable from "./ProductTable";
import PaginationMenu from "./PaginationMenu";
import { CartProvider } from "../cartContext";

const ProductDashboard = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(() => generateMediumDataset(250));
  const [dataShown, setDataShown] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //stats
  const totalProducts = products.length;
  const totalRevenue = useMemo(() => {
    let revenue = 0;
    products.map((item) => item.price + revenue);

    return revenue;
  }, [products]);

  // const lowStockItem = useMemo(()=>{
    
  //   products.map((item)=>{
  //     if(item.)
  //   })
  // })

 

  // a function to slice the data and send it to display
  const sliceData = (products) => {
    const initialIndex = (currentPage - 1) * 10;
    const lastIdx = initialIndex + 10;
    return products.slice(initialIndex, lastIdx);
  };

  const getFilteredProducts = () => {
    if (!searchTerm) return products;
    return products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    const filteredData = getFilteredProducts();
    const slicedData = sliceData(filteredData);
    setDataShown(slicedData);
  }, [currentPage, products, searchTerm]);

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
  const toggleNextPage = () => {
    setCurrentPage((curr) => curr + 1);
  };

  const togglePrevpage = () => {
    if (currentPage !== 1) {
      setCurrentPage((curr) => curr - 1);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  let timerRef = useRef(null);
  const handleSearch = (e) => {
    const value = e.target.value;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchTerm(value);
      console.log();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <CartProvider>
      <div className="p-2">
        <Header openSideBar={handleSideBar} handleSearchChange={handleSearch} />
        <SideBar showSideBar={showSideBar} onClose={closeSideBar} />
        <Stats />
        <ProductTable tableData={dataShown} />
        <PaginationMenu
          currentPage={currentPage}
          handlePreviousPage={togglePrevpage}
          handleNextPage={toggleNextPage}
        />
      </div>
    </CartProvider>
  );
};

export default ProductDashboard;
