
import React, { useState } from "react";
import { useCart } from "../cartContext";

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

const renderCellContent = (column, item, actions) => {
  const { callHandleAddtoCart, handleEdit, handleDelete, handleViewDetails } =
    actions;

  switch (column.id) {
    case "id":
      return (
        <td className="px-1 py-3 text-xs  desktop:px-6 desktop:py-4 desktop:text-md text-center text-gray-500">
          {item.id}.
        </td>
      );
    case "product":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-md">
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
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-md text-center font-semibold text-gray-500">
          {item.name}
        </td>
      );
    case "category":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-md text-center text-gray-500">
          {item.category}
        </td>
      );
    case "price":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-md text-center font-semibold text-gray-900">
          ${item.price}
        </td>
      );
    case "stock":
      return (
        <td className="px-1 py-3 text-xs desktop:px-6 desktop:py-4 desktop:text-md text-center  text-gray-500">
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
          <div className="flex items-center justify-center gap-1 desktop:gap-2">
            {/* Add to Cart Button */}
            <button
              onClick={() => callHandleAddtoCart(item)}
              className="
                bg-indigo-600 hover:bg-indigo-700 text-white 
                px-2 py-1 text-xs
                mobile:px-2 mobile:py-1 mobile:text-xs
                tablet:px-3 tablet:py-1 tablet:text-sm
                desktop:px-4 desktop:py-2 desktop:text-sm
                rounded-md font-medium transition-colors
              "
              title="Add to Cart"
            >
              Cart
            </button>

            {/* Edit Button */}
            <button
              onClick={() => handleEdit(item)}
              className="
                bg-yellow-600 hover:bg-yellow-700 text-white 
                px-2 py-1 text-xs
                mobile:px-2 mobile:py-1 mobile:text-xs
                tablet:px-3 tablet:py-1 tablet:text-sm
                desktop:px-4 desktop:py-2 desktop:text-sm
                rounded-md font-medium transition-colors
              "
              title="Edit Item"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item)}
              className="
                bg-red-600 hover:bg-red-700 text-white 
                px-2 py-1 text-xs
                mobile:px-2 mobile:py-1 mobile:text-xs
                tablet:px-3 tablet:py-1 tablet:text-sm
                desktop:px-4 desktop:py-2 desktop:text-sm
                rounded-md font-medium transition-colors
              "
              title="Delete Item"
            >
              Delete
            </button>

            {/* View Details Button */}
            <button
              onClick={() => handleViewDetails(item)}
              className="
                bg-blue-600 hover:bg-blue-700 text-white 
                px-2 py-1 text-xs
                mobile:px-2 mobile:py-1 mobile:text-xs
                tablet:px-3 tablet:py-1 tablet:text-sm
                desktop:px-4 desktop:py-2 desktop:text-sm
                rounded-md font-medium transition-colors
              "
              title="View Details"
            >
              View
            </button>
          </div>
        </td>
      );
    default:
      return <td></td>;
  }
};


const ProductTable = ({ tableData }) => {
  const [columns, setColumns] = useState([
    { id: "id", title: "ID", sortable: true },
    { id: "product", title: "Product", sortable: false },
    { id: "name", title: "Name", sortable: true },
    { id: "category", title: "Category", sortable: true },
    { id: "price", title: "Price", sortable: true },
    { id: "stock", title: "Stock", sortable: true },
    { id: "status", title: "Status", sortable: true },
    { id: "actions", title: "Actions", sortable: false },
  ]);
  console.log(tableData);

  const { addToCart, removeFromCart, isInCart, getItemQuantity } = useCart();

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [sortedData, setSortedData] = useState(tableData);

  const handleAddToCart = (item) => {
    console.log(`add to cart was called with Item ${item}`);
    window.alert("Item added to your Cart");
    addToCart(item);
  };

  // Sorting functionality
  const handleSort = (columnId) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column || !column.sortable) return;

    let direction = "asc";
    if (sortConfig.key === columnId && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedArray = [...tableData].sort((a, b) => {
      let aValue = a[columnId];
      let bValue = b[columnId];

      // Handle different data types
      if (columnId === "price" || columnId === "stock" || columnId === "id") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key: columnId, direction });
    setSortedData(sortedArray);
  };

  React.useEffect(() => {
    if (sortConfig.key) {
      handleSort(sortConfig.key);
    } else {
      setSortedData(tableData);
    }
  }, [tableData]);

  // Get sort icon
  const getSortIcon = (columnId) => {
    if (sortConfig.key !== columnId) {
      return (
        <span className="inline-block ml-1 text-gray-400">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 8l5-5 5 5H5zM5 12l5 5 5-5H5z" />
          </svg>
        </span>
      );
    }

    if (sortConfig.direction === "asc") {
      return (
        <span className="inline-block ml-1 text-gray-600">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
    }

    return (
      <span className="inline-block ml-1 text-gray-600">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const handleEdit = (item) => {
    console.log(`Edit item:`, item);

    window.alert(`Edit item: ${item.name}`);
  };

  const handleDelete = (item) => {
    console.log(`Delete item:`, item);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${item.name}?`
    );
    if (confirmDelete) {
      window.alert(`${item.name} has been deleted`);
    }
  };

  const handleViewDetails = (item) => {
    console.log(`View details for item:`, item);
    const details = `
      Item Details:
      ID: ${item.id}
      Name: ${item.name}
      Category: ${item.category}
      Price: $${item.price}
      Stock: ${item.stock} units
      Status: ${item.status}
    `;
    window.alert(details);
    // Example: setSelectedItem(item); or navigate to details page
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

  const actions = {
    callHandleAddtoCart: handleAddToCart,
    handleEdit,
    handleDelete,
    handleViewDetails,
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
                  onClick={() => column.sortable && handleSort(column.id)}
                  className={`px-1 desktop:px-6 desktop:py-3 desktop:text-md border-2 text-center text-xs font-medium text-gray-500 uppercase transition-colors ${
                    column.sortable
                      ? "hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                      : "hover:cursor-move"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {column.title}
                    {column.sortable && getSortIcon(column.id)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <React.Fragment key={column.id}>
                    {renderCellContent(column, item, actions)}
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
