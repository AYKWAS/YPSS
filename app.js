console.log("🚀 YPSS LOCAL AUTH SYSTEM LOADED");

const $ = id => document.getElementById(id);

/* ================= INIT STORAGE ================= */
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

/* ================= SIGNUP ================= */
function signup(email, password) {

  let users = JSON.parse(localStorage.getItem("users"));

  // check if user exists
  const exists = users.find(u => u.email === email);
  if (exists) {
    alert("User already exists");
    return;
  }

  const newUser = {
    id: Date.now(),
    email: email,
    password: password,
    role: "student"
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // set current user
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  console.log("✅ User created:", email);

  window.location.href = "dashboard.html";
}

/* ================= LOGIN ================= */
function login(email, password) {

  let users = JSON.parse(localStorage.getItem("users"));

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  // save session
  localStorage.setItem("currentUser", JSON.stringify(user));

  console.log("✅ LOGIN ROLE:", user.role);

  if (user.role === "admin") {
    window.location.href = "admin.html";
  } 
  else if (user.role === "lecturer") {
    window.location.href = "lecturer.html";
  } 
  else {
    window.location.href = "dashboard.html";
  }
}
async function enroll(course_id, user_id) {
  const { data, error } = await supabase
    .from("enrollments")
    .insert([{ course_id, user_id }]);

  if (error) console.log(error);
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/* ================= AUTH GUARD ================= */
function checkAuth() {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    console.log("❌ No user → redirect login");
    window.location.href = "login.html";
    return;
  }

  const role = user.role || "student";
  const path = window.location.pathname;

  if (path.includes("admin.html") && role !== "admin") {
    window.location.href = "dashboard.html";
  }

  if (path.includes("lecturer.html") && role !== "lecturer") {
    window.location.href = "dashboard.html";
  }

  if (path.includes("dashboard.html") && role === "admin") {
    window.location.href = "admin.html";
  }
}