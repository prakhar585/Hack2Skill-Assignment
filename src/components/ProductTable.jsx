import React, { useState } from "react";
import { useCart } from "../cartContext";

// function to dynamically display the status of Item
const itemStatus = (status) => {
  let content;
  switch (status) {
    case "Active":
      content = (
        <span className="flex items-center justify-center py-1 px-1 desktop:px-2 desktop:py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {status}
        </span>
      );
      break;

    case "Discontinued":
      content = (
        <span className="flex items-center justify-center py-1 px-1 desktop:px-2 desktop:py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {status}
        </span>
      );
      break;

    case "Out of Stock":
      content = (
        <span className="flex items-center justify-center py-1 px-1 desktop:px-2 desktop:py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          {status}
        </span>
      );
      break;

    case "Inactive":
      content = (
        <span className="flex items-center justify-center py-1 px-1 desktop:px-2 desktop:py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          {status}
        </span>
      );
      break;

    default:
      content = (
        <span className="flex items-center justify-center py-1 desktop:px-2 desktop:py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {status}
        </span>
      );
  }

  return <div>{content}</div>;
};

const renderCellContent = (column, item, callHandleAddtoCart) => {
  switch (column.id) {
    case "id":
      return (
        <td className="px-1 py-3 text-xs  desktop:px-6 desktop:py-4 desktop:text-lg text-center text-gray-500">
          {item.id}.
        </td>
      );
    case "product":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-lg">
          <div className="flex items-center justify-center">
            <img
              className="tablet:w-8 tablet:h-8  desktop:w-20 desktop:h-20 rounded-full object-cover "
              src={item.image}
              alt={item.name}
            />
          </div>
        </td>
      );
    case "name":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-lg text-center text-gray-500">
          {item.name}
        </td>
      );
    case "category":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-lg text-center text-gray-500">
          {item.category}
        </td>
      );
    case "price":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-lg text-center font-semibold text-gray-900">
          ${item.price}
        </td>
      );
    case "stock":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-lg text-center  text-gray-500">
          {item.stock} units
        </td>
      );
    case "status":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-md">
          {itemStatus(item.status)}
        </td>
      );
    case "actions":
      return (
        <td className="px-1 py-3 desktop:px-6 desktop:py-4">
          <div className="flex items-center justify-center h-full">
            <button
            onClick={()=>callHandleAddtoCart(item)}
              className="
        bg-indigo-600 hover:bg-indigo-700 text-white 
        px-2 py-1 text-xs
        mobile:px-3 mobile:py-2 mobile:text-sm
        tablet:px-4 tablet:py-2 tablet:text-sm
        desktop:px-5 desktop:py-2 desktop:text-base
        rounded-md font-medium transition-colors
      "
            >
              Add to Cart
            </button>
          </div>
        </td>
      );
    default:
      return <td></td>;
  }
};

/////////////////////////////////////////////////////////////////////////

const ProductTable = ({ tableData }) => {
  const [columns, setColumns] = useState([
    { id: "id", title: "ID" },
    { id: "product", title: "Product" },
    { id: "name", title: "Name" },
    { id: "category", title: "Category" },
    { id: "price", title: "Price" },
    { id: "stock", title: "Stock" },
    { id: "status", title: "Status" },
    { id: "actions", title: "Actions" },
  ]);
  console.log(tableData);

  const { addToCart, removeFromCart, isInCart, getItemQuantity } = useCart();

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);



  const handleAddToCart = (item) => {
    console.log(`add to cart was called with Item ${item}`);
    addToCart(item);
  };

  const handleRemoveFromCart = (item) => {
    console.log(`remove item was clicked`);
    removeFromCart(item.id, item.price);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newColumns = [...columns];
    const draggedColumn = newColumns[draggedIndex];
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(dropIndex, 0, draggedColumn);

    setColumns(newColumns);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          Product Inventory
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className="px-1  desktop:px-6 desktop:py-3 text-center text-xs font-medium text-gray-500 uppercase hover:cursor-move"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <React.Fragment key={column.id}>
                    {renderCellContent(column, item, handleAddToCart)}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
