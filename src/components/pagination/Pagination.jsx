import React from "react";
import Style from './pagination.module.css';

const Pagination = ({page, last_page, handlePrevPage, handleNextPage}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4">
      {
        page <= 1 ? <button className={Style.button} disabled>PREV</button> : <button className={Style.button} onClick={handlePrevPage}>PREV</button>
      }
      <p className={Style.page}>{page} to {last_page}</p>
      {
        page >= last_page ? <button className={Style.button}  disabled>NEXT</button> : <button className={Style.button} onClick={handleNextPage}>NEXT</button>
      }
      
    </div>
  );
};

export default Pagination;
