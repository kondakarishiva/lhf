import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourse, saveProgress } from "../services/api";
import { getSession } from "../services/auth";

export default function Quiz(){
  const { courseId, quizId } = useParams();
  const course = getCourse(courseId);
  const quiz = course?.quizzes?.find(q => q.id === quizId);
  const session = getSession();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  if(!quiz) return <div className="container"><div className="card">Quiz not found</div></div>

  const handleSelect = (qId, idx) => {
    setAnswers(a=>({...a, [qId]: idx}));
  };

  const submit = (e) => {
    e.preventDefault();
    let correct = 0;
    quiz.questions.forEach(q => {
      if(answers[q.id] === q.answer) correct++;
    });
    const score = Math.round((correct / quiz.questions.length) * 100);

    // Save progress: for simplicity, store quizResults array
    const existing = JSON.parse(localStorage.getItem("ksma_progress") || "{}");
    const userProg = existing[session.id] || {};
    const courseProg = userProg[courseId] || { completedLessons: [], quizResults: [] };
    courseProg.quizResults = courseProg.quizResults || [];
    courseProg.quizResults.push({ quizId, score, date: Date.now() });
    userProg[courseId] = courseProg;
    existing[session.id] = userProg;
    localStorage.setItem("ksma_progress", JSON.stringify(existing));

    // If passing, add certificate
    if(score >= (quiz.passingScore || 50)){
      // minimal certificate creation
      const certs = JSON.parse(localStorage.getItem("ksma_certs") || "{}");
      if(!certs[session.id]) certs[session.id] = {};
      certs[session.id][courseId] = { name: session.name, course: course.title, date: Date.now() };
      localStorage.setItem("ksma_certs", JSON.stringify(certs));
    }

    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{quiz.title}</h2>
        <form onSubmit={submit}>
          {quiz.questions.map(q => (
            <div key={q.id} style={{marginBottom:12}}>
              <div style={{fontWeight:600}}>{q.text}</div>
              <div style={{marginTop:6}}>
                {q.options.map((opt, idx) => (
                  <div key={idx}>
                    <label>
                      <input type="radio" name={q.id} checked={answers[q.id]===idx} onChange={()=>handleSelect(q.id, idx)} /> {opt}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button className="btn" type="submit">Submit Quiz</button>
        </form>
      </div>
    </div>
  );
}
