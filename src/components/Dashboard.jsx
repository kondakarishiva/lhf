import React from "react";
import { getProgress, getCourses, getCertificates } from "../services/api";
import { getSession } from "../services/auth";
import { formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";

export default function Dashboard(){
  const session = getSession();
  const progress = getProgress(session.id); // object of course progress
  const courses = getCourses();
  const certs = getCertificates(session.id);

  return (
    <div className="container">
      <div className="card">
        <h2 className="h1">Progress Dashboard</h2>
        <p className="small">Overview of your course progress and earned certificates.</p>
      </div>

      <div className="grid cols-3" style={{marginTop:18}}>
        {courses.map(c => {
          const p = progress[c.id] || { completedLessons: [], quizResults: [] };
          const latestQuiz = (p.quizResults || []).slice(-1)[0];
          return (
            <div className="card" key={c.id}>
              <h3>{c.title}</h3>
              <p className="small">Instructor: {c.instructor}</p>
              <p className="small">Lessons completed: {(p.completedLessons || []).length}/{(c.lessons || []).length}</p>
              <p className="small">Last quiz score: {latestQuiz ? `${latestQuiz.score}%` : "—"}</p>
              <div style={{marginTop:8}}>
                <Link to={`/courses/${c.id}`} className="link-btn">Open</Link>
                {certs[c.id] && <Link style={{marginLeft:10}} to={`/certificate/${c.id}`} className="link-btn">Certificate</Link>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
