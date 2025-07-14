import React from 'react'
import { totalProducts } from '../data/mockData'
const PaginationMenu = ({currentPage, handlePreviousPage, handleNextPage}) => {
  const totalPages = Math.round(totalProducts/10);

  return (
    <div className='flex items-center justify-center py-3 bg-indigo-50'>
      <button className=' bg-indigo-600 text-white px-3 py-1 rounded-md desktop:text-md' onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
      <button className='px-3 mx-1 bg-white rounded-md py-1 desktop:text-md'>Page {currentPage} of {totalPages}</button>
    
      <button className='px-2 bg-indigo-600 text-white px-3 py-1 rounded-md desktop:text-md' onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default PaginationMenu
