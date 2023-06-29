import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton(props) {
    const navigate = useNavigate();

     const handleBackClick = () => {
       navigate(props.params.href, {state : props.params.state});
     };

     return (
       <button className="btn btn-primary" onClick={handleBackClick}>
         <i className="bi bi-arrow-return-left"></i>
       </button>
     );
}
