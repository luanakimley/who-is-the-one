import React from "react";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function CategoryBox(props) {
      const category = props.category;

      const navigate = useNavigate();

      const editFavourite = (e) => {
        const category = JSON.parse(e.target.id);

        const formData = new FormData();
        formData.append("isFavourite", category.is_favourite === 0 ? 1 : 0);
        formData.append("categoryId", category.category_id);

        axios.put(`${SERVER_HOST}/edit_category_favourite`, formData, {
          headers: { "Content-Type": "application/json" },
        });
      };

       const navigateToAddCandidatesForCategory = (e) => {
         const category = {
           id: e.target.id,
           name: e.target.innerHTML,
         };
         navigate("/add_candidates", { state: category });
       };

     return (
       <div className="card p-3">
         <div className="card-body text-center">
           <div>
             <h3
               id={category.category_id}
               onClick={navigateToAddCandidatesForCategory}
             >
               {category.category_name}
             </h3>
           </div>
           <div
             onClick={editFavourite}
             className="position-absolute top-0 start-0 m-2"
           >
             <i
               id={JSON.stringify(category)}
               className={`bi ${
                 category.is_favourite === parseInt(1)
                   ? "bi-star-fill"
                   : "bi-star"
               } fs-5 text-warning`}
             ></i>
           </div>
           <DeleteButton
           params= {{text: "Category", route: `/remove_category/${category.category_id}`}}
           listLength={props.listLength}
           limit={props.limit}
           setCurrentPage={props.setCurrentPage}
           />
         </div>
       </div>
     );
}