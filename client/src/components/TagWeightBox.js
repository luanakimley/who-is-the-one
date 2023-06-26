import React from "react";

export function TagWeightBox() {
  return (
    <div className="col">
    <div className="p-4 mb-2 bg-white text-primary rounded">

      <div className="card">
      <div className="card-body">
      <h2>Tag desc</h2>
      <label>0%</label>
      <input className="p-3" readOnly type="range" value={60}></input>
      <label>100%</label>

      <i className="fa-2x bi bi-trash position-absolute top-0 end-0"></i>

    </div>
    </div>
    </div>
    </div>
  );
}
