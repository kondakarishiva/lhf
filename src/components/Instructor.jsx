import React, { useState } from "react";
import { getCourses, saveCourse } from "../services/api";

export default function Instructor(){
  const [courses, setCourses] = useState(getCourses());
  const [form, setForm] = useState({ title:"", summary:"" });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const addCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: `c${Date.now()}`,
      title: form.title,
      summary: form.summary,
      instructor: "You",
      lessons: [],
      quizzes: [],
      certificate: { enabled: true, templateText: "Certificate of Completion: {name} completed {course}" }
    };
    saveCourse(newCourse);
    setCourses(getCourses());
    setForm({title:"", summary:""});
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="h1">Instructor Panel</h2>
        <p className="small">Create courses and upload materials.</p>
      </div>

      <div style={{marginTop:12}} className="card">
        <h3>Create New Course</h3>
        <form onSubmit={addCourse}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Course title" required />
          <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Short summary" style={{width:"100%", marginTop:8}} />
          <div style={{marginTop:8}}>
            <button className="btn" type="submit">Create Course</button>
          </div>
        </form>
      </div>

      <div className="grid cols-3" style={{marginTop:18}}>
        {courses.map(c => (
          <div className="card" key={c.id}>
            <h4>{c.title}</h4>
            <p className="small">{c.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
