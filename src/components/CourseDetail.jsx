import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCourse, saveProgress, getProgress } from "../services/api";
import { getSession } from "../services/auth";

export default function CourseDetail(){
  const { id } = useParams();
  const course = getCourse(id);
  const session = getSession();
  const progress = getProgress(session.id)[id] || { completedLessons: [], quizResults: [] };

  if(!course) return <div className="container"><div className="card">Course not found</div></div>

  const startQuiz = () => {
    if(course.quizzes && course.quizzes.length){
      const quiz = course.quizzes[0];
      return `/quiz/${course.id}/${quiz.id}`;
    }
    return null;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{course.title}</h2>
        <p className="small">{course.summary}</p>
        <div style={{marginTop:12}}>
          {course.lessons.length ? (
            <>
              <h4>Lessons</h4>
              <ol>
                {course.lessons.map(l => (
                  <li key={l.id}>
                    <strong>{l.title}</strong> — <span className="small">{l.content}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : <div className="small">No lessons yet.</div>}
        </div>

        <div style={{marginTop:12}}>
          {course.quizzes.length ? (
            <Link to={startQuiz()} className="btn">Take Quiz</Link>
          ) : <div className="small">No quiz for this course yet.</div>}
        </div>

      </div>
    </div>
  );
}
