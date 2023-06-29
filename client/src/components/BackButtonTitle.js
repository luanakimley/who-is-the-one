import React from "react";
import BackButton from "./BackButton";

export default function BackButtonTitle(props) {
  return (
    <h1 className="text-center mb-5 text-primary text-white">
      {props.params.href ? <BackButton params={props.params.href} /> : ""}
      &nbsp; {props.params.text}
    </h1>
  );
}
