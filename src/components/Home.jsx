import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { logout, getSession } from "../services/auth";
import { getProgress, getCourses } from "../services/api";

export default function Home() {
  const nav = useNavigate();
  const session = getSession();
  const courses = getCourses();
  const progress = getProgress(session.id);

  const onLogout = () => {
    logout();
    nav("/");
  };

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="logo">LEARNING HUB</div>
          <nav className="header-nav">
            <Link to="/home">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/dashboard">Dashboard</Link>
            {session?.role === "instructor" && <Link to="/instructor">Instructor</Link>}
          </nav>
        </div>
        <div className="header-right">
          <div className="small">Hi, {session?.name}</div>
          <button className="btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Learning Hub</h1>
          <p className="quote">"Grow just 1% every day — Your skills shape your future."</p>
          <p>All in one place to Learn, Practice, and Progress your skills.</p>
          <div className="hero-actions">
            <Link to="/courses" className="btn large">Start Learning</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Learning Illustration" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <section className="grid-2">
          {/* Left side */}
          <div>
          
            <div className="grid cols-3" style={{ marginTop: 18 }}>
              <div className="card mini">
                <h4> OUR JOY</h4>
                <p className="small">Engage with lessons and hands-on projects.</p>
              </div>
              <div className="card mini">
                <h4> ENJOY </h4>
                <p className="small"> Learn from your passionate and its will give happines and satification okey</p>
              </div>
              <div className="card mini">
                <h4> LEARN TO APPLY </h4>
                <p className="small"> in our life where we learn where is we apply thats very important what kind of we are doing okey</p>
              </div>
            </div>

            <div className="card" style={{ marginTop: 18 }}>
              {courses.length > 0 ? (
                courses.map(course => {
                  const cProgress = progress[course.id] || { completedLessons: [] };
                  const totalLessons = course.lessons?.length || 0;
                  const completed = cProgress.completedLessons.length;
                  const percent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

                  return (
                    <div className="progress-item" key={course.id}>
                      <p>{course.title}</p>
                      <div className="progress-bar"><span style={{ width: `${percent}%` }}></span></div>
                    </div>
                  );
                })
              ) : (
                <p className="small">No courses enrolled yet.</p>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="card follow-card">
            <div className="profile-section">
              <h4>Your Profile</h4>
              <p><strong>Name:</strong> {session?.name}</p>
              <p><strong>Email:</strong> {session?.email}</p>
            </div>

            <h4> welcome networking </h4>
            <p className="small">Follow us on social platforms:</p>
            <div className="social-links">
              <a href="https://www.youtube.com/@Ksmajunefirst" target="_blank" rel="noreferrer">YouTube</a>
              <a href="https://www.instagram.com/ks.ma.june.first/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="mailto:kondakarishivakrishna@gmail.com">Email</a>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}
