import React from "react";
import BackButton from "./BackButton";

export default function BackButtonTitle(props) {
  return (
    <h1 className="text-center mb-5 text-primary">
      {props.params.href ? <BackButton params={props.params.href} state={props.params.state}  /> : ""}
      &nbsp; {props.params.text}
    </h1>
  );
}
