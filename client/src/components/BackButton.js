import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton(props) {
    const navigate = useNavigate();

     const handleBackClick = () => {
       if(props.state)
       {
          navigate(props.params, {state: props.state});
       }
       else
       {
            navigate(props.params);
       }

     };

     return (
       <button className="btn btn-primary" onClick={handleBackClick}>
         <i className="bi bi-arrow-return-left"></i>
       </button>
     );
}
