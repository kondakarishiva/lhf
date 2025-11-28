import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className="container">
      <div className="card center" style={{flexDirection:"column"}}>
        <h2>Page not found</h2>
        <p className="small">We couldn't find that page.</p>
        <Link to="/home" className="btn">Return Home</Link>
      </div>
    </div>
  );
}
