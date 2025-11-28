import React from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../services/api";

export default function Courses(){
  const courses = getCourses();

  return (
    <div className="container">
      <div className="card">
        <h2 className="h1">Courses</h2>
        <p className="small">Explore available courses.</p>
      </div>

      <div className="grid cols-3" style={{marginTop:18}}>
        {courses.map(c => (
          <div className="card" key={c.id}>
            <h3>{c.title}</h3>
            <p className="small">{c.summary}</p>
            <div style={{marginTop:12}}>
              <Link to={`/courses/${c.id}`} className="link-btn">Open Course</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
