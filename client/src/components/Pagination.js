import React, { useState } from "react";

export default function Pagination(props) {
  const pageNumbers = Math.ceil(props.listLength / props.limit);
  const arrayFromPageNumbers = [...Array(pageNumbers).keys()];

  const handlePageClick = (e) => {
    props.pageChange(e.target.id);
  };

  const handlePreviousArrowClick = (e) => {
    if (props.currentPage > 1) {
      props.pageChange(props.currentPage - 1);
    }
  };

  const handleNextArrowClick = (e) => {
    if (props.currentPage < pageNumbers) {
      props.pageChange(props.currentPage + 1);
    }
  };

  return (
    <ul className="pagination pagination-float">
      <li onClick={handlePreviousArrowClick} className="page-item">
        <p className="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </p>
      </li>
      {arrayFromPageNumbers.map((i) => (
        <li
          onClick={handlePageClick}
          className={`page-item ${
            i + 1 === parseInt(props.currentPage) ? "active" : ""
          }`}
          id={i + 1}
          key={i + 1}
        >
          <p id={i + 1} className="page-link">
            {i + 1}
          </p>
        </li>
      ))}

      <li className="page-item" onClick={handleNextArrowClick}>
        <p className="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </p>
      </li>
    </ul>
  );
}
