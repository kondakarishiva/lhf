// auth.js
const KEY_USERS = "ksma_users";
const KEY_SESSION = "ksma_session";

function loadUsers(){
  const raw = localStorage.getItem(KEY_USERS);
  if(!raw){
    // create default users
    const users = [
      { id: "u1", name: "Student One", email: "student@ksma.com", password: "1234", role: "student" },
      { id: "u2", name: "Instructor", email: "instructor@ksma.com", password: "1234", role: "instructor" }
    ];
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
    return users;
  }
  return JSON.parse(raw);
}

export function register({name,email,password,role="student"}){
  const users = loadUsers();
  if(users.find(u=>u.email===email)) throw new Error("Email exists");
  const user = {id: `u${Date.now()}`, name, email, password, role};
  users.push(user);
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
  // auto-login
  localStorage.setItem(KEY_SESSION, JSON.stringify({ id:user.id, name:user.name, email:user.email, role:user.role }));
  return user;
}

export function login({email,password}){
  const users = loadUsers();
  const u = users.find(x=>x.email===email && x.password===password);
  if(!u) throw new Error("Invalid credentials");
  localStorage.setItem(KEY_SESSION, JSON.stringify({ id:u.id, name:u.name, email:u.email, role:u.role }));
  return { id:u.id, name:u.name, email:u.email, role:u.role };
}

export function logout(){
  localStorage.removeItem(KEY_SESSION);
}

export function getSession(){
  const raw = localStorage.getItem(KEY_SESSION);
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn(){
  return !!getSession();
}

export function getRole(){
  const s = getSession();
  return s ? s.role : null;
}

export function getUserName(){
  const s = getSession();
  return s ? s.name : null;
}
