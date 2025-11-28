import { initialCourses } from "../data";

const KEY_COURSES = "ksma_courses";
const KEY_PROGRESS = "ksma_progress";
const KEY_CERTS = "ksma_certs";

function init(){
  if(!localStorage.getItem(KEY_COURSES)){
    localStorage.setItem(KEY_COURSES, JSON.stringify(initialCourses));
  }
  if(!localStorage.getItem(KEY_PROGRESS)){
    localStorage.setItem(KEY_PROGRESS, JSON.stringify({})); // { userId: { courseId: { completedLessons:[], quizResults:[] } } }
  }
  if(!localStorage.getItem(KEY_CERTS)){
    localStorage.setItem(KEY_CERTS, JSON.stringify({})); // { userId: { courseId: certificateObj } }
  }
}
init();

export function getCourses(){
  return JSON.parse(localStorage.getItem(KEY_COURSES));
}

export function getCourse(id){
  const all = getCourses();
  return all.find(c=>c.id === id);
}

export function saveCourse(course){
  const all = getCourses();
  const idx = all.findIndex(c=>c.id === course.id);
  if(idx>=0) all[idx] = course;
  else all.push(course);
  localStorage.setItem(KEY_COURSES, JSON.stringify(all));
}

export function getProgress(userId){
  const raw = JSON.parse(localStorage.getItem(KEY_PROGRESS) || "{}");
  return raw[userId] || {};
}

export function saveProgress(userId, courseId, progress){
  const raw = JSON.parse(localStorage.getItem(KEY_PROGRESS) || "{}");
  if(!raw[userId]) raw[userId] = {};
  raw[userId][courseId] = progress;
  localStorage.setItem(KEY_PROGRESS, JSON.stringify(raw));
}

export function saveCertificate(userId, courseId, certData){
  const raw = JSON.parse(localStorage.getItem(KEY_CERTS) || "{}");
  if(!raw[userId]) raw[userId] = {};
  raw[userId][courseId] = certData;
  localStorage.setItem(KEY_CERTS, JSON.stringify(raw));
}

export function getCertificates(userId){
  const raw = JSON.parse(localStorage.getItem(KEY_CERTS) || "{}");
  return raw[userId] || {};
}
