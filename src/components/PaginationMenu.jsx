import React from 'react'

const PaginationMenu = ({currentPage, handlePreviousPage, handleNextPage}) => {
  return (
    <div className='flex items-center justify-center py-3 bg-blue-100'>
      <button className=' bg-blue-900 text-white px-3 py-1 rounded-md' onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
      <button className='px-3 mx-1 bg-white rounded-md py-1'>{currentPage}</button>
    
      <button className='px-2 bg-blue-900 text-white px-3 py-1 rounded-md' onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default PaginationMenu
