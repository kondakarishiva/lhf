import React from "react";
import { useParams } from "react-router-dom";
import { getCertificates, getCourse } from "../services/api";
import { getSession } from "../services/auth";
import { formatDate } from "../utils/helpers";

export default function Certificate() {
  const { courseId } = useParams();
  const session = getSession();
  const certs = getCertificates(session.id);
  const cert = certs[courseId];
  const course = getCourse(courseId);

  if (!cert)
    return (
      <div className="container">
        <div className="card">No certificate found for this course.</div>
      </div>
    );

  return (
    <div className="container">
      <div className="card certificate">
        <h2>Certificate of Completion</h2>
        <p className="small">This is to certify that</p>

        <h3 className="name">{cert.name}</h3>
        <p className="small">has successfully completed the course</p>

        <h3 className="course-title">{course.title}</h3>

        <p className="small">on {formatDate(cert.date)}</p>
        <p className="small">
          Certificate ID:{" "}
          <span className="cert-code">{cert.code || "CERT-" + cert.id}</span>
        </p>

        <div className="signature-section">
          <div>
            <p className="small">________________________</p>
            <p className="small">Instructor</p>
          </div>
          <div>
            <p className="small">________________________</p>
            <p className="small">Date</p>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button className="btn" onClick={() => window.print()}>
            Print / Save
          </button>
        </div>
      </div>
    </div>
  );
}
