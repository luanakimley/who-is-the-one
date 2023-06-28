import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import Swal from "sweetalert2";

export default function DeleteButton({ text, route }) {

  const deleteObject = () => {

  console.log(route)
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0275d8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${SERVER_HOST}${route}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: text,
              icon: "success",
              confirmButtonColor: "#0275d8",
            });
          })
          .catch((error) => {
            console.error("Error deleting object:", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the object.",
              icon: "error",
              confirmButtonColor: "#0275d8",
            });
          });
      }
    });
  };

  return (
    <button onClick={deleteObject} className="btn position-absolute top-0 end-0">
      <span className="bi bi-x"></span>
    </button>
  );
}
