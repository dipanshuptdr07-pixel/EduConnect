const KEY = "educonnect_v3";

/* =========================
   EDUCONNECT DATABASE
========================= */

const DB = {
  users: [
    {
      id: "STU001",
      role: "student",
      school: "EDU001",
      phone: "7777777777",
      pass: "1234",
      name: "Dipanshu Patidar",
      class: "XI-A"
    },
    {
      id: "TCH001",
      role: "teacher",
      school: "EDU001",
      phone: "8888888888",
      pass: "1234",
      name: "Neha Verma"
    },
    {
      id: "ADM001",
      role: "admin",
      school: "EDU001",
      phone: "9999999999",
      pass: "1234",
      name: "Aarav Sharma"
    }
  ],

  schools: [
    {
      code: "EDU001",
      name: "Saraswati Vidya Mandir Higher Secondary School",
      city: "Indore"
    }
  ],

  homework: [
    {
      id: "HW001",
      subject: "Physics",
      title: "Laws of Motion",
      due: "05 Oct 2026",
      status: "Pending"
    },
    {
      id: "HW002",
      subject: "Chemistry",
      title: "Chemical Bonding",
      due: "06 Oct 2026",
      status: "Pending"
    },
    {
      id: "HW003",
      subject: "Mathematics",
      title: "Trigonometry",
      due: "07 Oct 2026",
      status: "Done"
    }
  ],

  notices: [
    {
      icon: "📢",
      title: "Monthly test schedule released",
      date: "02 Oct 2026"
    },
    {
      icon: "📅",
      title: "PTM will be conducted this Saturday",
      date: "01 Oct 2026"
    },
    {
      icon: "🎯",
      title: "School event registrations are open",
      date: "30 Sep 2026"
    }
  ],

  events: [
    {
      id: "EV001",
      title: "Science Exhibition",
      date: "18 Oct 2026",
      place: "School Campus",
      type: "Academic"
    },
    {
      id: "EV002",
      title: "Annual Sports Meet",
      date: "25 Oct 2026",
      place: "School Ground",
      type: "Sports"
    }
  ],

  exams: [
    {
      subject: "Physics",
      date: "12 Oct 2026",
      time: "09:00 AM"
    },
    {
      subject: "Chemistry",
      date: "15 Oct 2026",
      time: "09:00 AM"
    },
    {
      subject: "Mathematics",
      date: "18 Oct 2026",
      time: "09:00 AM"
    }
  ],

  results: [
    {
      subject: "Physics",
      marks: 91,
      total: 100,
      grade: "A1"
    },
    {
      subject: "Chemistry",
      marks: 87,
      total: 100,
      grade: "A"
    },
    {
      subject: "Mathematics",
      marks: 92,
      total: 100,
      grade: "A1"
    },
    {
      subject: "English",
      marks: 84,
      total: 100,
      grade: "A"
    },
    {
      subject: "Computer Science",
      marks: 84,
      total: 100,
      grade: "A"
    }
  ],

  attendance: {
    overall: 92,
    present: 46,
    absent: 3,
    leave: 1,

    subjects: [
      {
        name: "Physics",
        attended: 18,
        total: 20,
        percentage: 90
      },
      {
        name: "Chemistry",
        attended: 19,
        total: 20,
        percentage: 95
      },
      {
        name: "Mathematics",
        attended: 17,
        total: 19,
        percentage: 89
      }
    ]
  },

  fees: {
    total: 45000,
    paid: 30000,
    pending: 15000,
    nextDue: "10 Oct 2026"
  },

  leaveRequests: [],

  registrations: []
};


/* =========================
   APP STATE
========================= */

let user = null;

const app = document.getElementById("app");


/* =========================
   STORAGE
========================= */

function saveState() {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      user: user,
      leaveRequests: DB.leaveRequests,
      registrations: DB.registrations
    })
  );
}


function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));

    if (!saved) return;

    user = saved.user || null;

    if (Array.isArray(saved.leaveRequests)) {
      DB.leaveRequests = saved.leaveRequests;
    }

    if (Array.isArray(saved.registrations)) {
      DB.registrations = saved.registrations;
    }
  } catch (error) {
    console.log("EduConnect storage reset");
  }
}


/* =========================
   SCHOOL HELPER
========================= */

function getSchool() {
  return (
    DB.schools.find(s => s.code === user?.school) ||
    DB.schools[0]
  );
}


/* =========================
   LOGIN
========================= */

function login() {
  const school =
    document
      .getElementById("school")
      .value
      .trim()
      .toUpperCase();

  const phone =
    document
      .getElementById("phone")
      .value
      .trim();

  const pass =
    document
      .getElementById("pass")
      .value;

  const found = DB.users.find(
    u =>
      u.school === school &&
      u.phone === phone &&
      u.pass === pass
  );

  if (!found) {
    alert("Invalid login details");
    return;
  }

  user = found;

  saveState();

  location.hash = "home";

  render();
}


/* =========================
   LOGOUT
========================= */

function logout() {
  user = null;

  localStorage.removeItem(KEY);

  location.hash = "";

  render();
}


/* =========================
   NAVIGATION
========================= */

function go(pageName) {
  location.hash = pageName;
  render();
}


/* =========================
   LOGIN SCREEN
========================= */

function loginScreen() {
  app.innerHTML = `
    <div class="login-page">

      <div class="login-box">

        <div class="logo">E</div>

        <h1>EduConnect</h1>

        <p>
          Learn • Grow • Achieve
        </p>

        <input
          id="school"
          placeholder="School Code"
          autocomplete="off"
        >

        <input
          id="phone"
          placeholder="Phone / Account"
          inputmode="numeric"
          autocomplete="off"
        >

        <input
          id="pass"
          type="password"
          placeholder="Password"
          autocomplete="off"
        >

        <button
          class="btn primary"
          onclick="login()"
        >
          Login
        </button>

        <small>
          Demo: EDU001 · 7777777777 · 1234
        </small>

      </div>

    </div>
  `;
}


/* =========================
   HEADER
========================= */

function header() {
  return `
    <header class="mobile-head">

      <div class="brand-mini">
        <b>🎓</b>
        <strong>EduConnect</strong>
      </div>

      <div class="head-actions">

        <button
          class="head-action"
          onclick="go('notices')"
          aria-label="Notifications"
        >
          🔔
        </button>

        <button
          class="head-action"
          onclick="go('profile')"
          aria-label="Profile"
        >
          👤
        </button>

      </div>

    </header>
  `;
}


/* =========================
   BOTTOM NAVIGATION
========================= */

function bottom() {
  return `
    <nav class="bottom-nav">

      <button
        onclick="go('home')"
        class="${location.hash === '#home' || location.hash === '' ? 'active' : ''}"
      >
        <span class="nav-icon">⌂</span>
        <span>Home</span>
      </button>

      <button
        onclick="go('academics')"
        class="${location.hash === '#academics' ? 'active' : ''}"
      >
        <span class="nav-icon">▦</span>
        <span>Academics</span>
      </button>

      <button
        onclick="go('events')"
        class="${location.hash === '#events' ? 'active' : ''}"
      >
        <span class="nav-icon">◉</span>
        <span>Events</span>
      </button>

      <button
        onclick="go('notices')"
        class="${location.hash === '#notices' ? 'active' : ''}"
      >
        <span class="nav-icon">♢</span>
        <span>Notices</span>
      </button>

      <button
        onclick="go('profile')"
        class="${location.hash === '#profile' ? 'active' : ''}"
      >
        <span class="nav-icon">•••</span>
        <span>More</span>
      </button>

    </nav>
  `;
  }
/* =========================
   REUSABLE UI HELPERS
========================= */

function iconBox(icon, label, value = "") {
  return `
    <div class="mini-stat">
      <div class="mini-icon">${icon}</div>
      <div>
        <strong>${value}</strong>
        <span>${label}</span>
      </div>
    </div>
  `;
}


function pageTitle(title, subtitle = "") {
  return `
    <div class="page-heading">
      <div>
        <h2>${title}</h2>
        ${subtitle ? `<p>${subtitle}</p>` : ""}
      </div>
    </div>
  `;
}


function actionCard(icon, title, text, route) {
  return `
    <button class="action-card" onclick="go('${route}')">
      <span class="action-icon">${icon}</span>
      <span class="action-content">
        <strong>${title}</strong>
        <small>${text}</small>
      </span>
      <span class="action-arrow">›</span>
    </button>
  `;
}


/* =========================
   STUDENT HOME
========================= */

function studentHome() {

  const school = getSchool();

  const pendingHomework =
    DB.homework.filter(h => h.status !== "Done").length;

  const attendance = DB.attendance.overall;

  return `
    ${header()}

    <main class="mobile-main">

      <section class="welcome-section">

        <div>
          <span class="eyebrow">GOOD MORNING</span>

          <h1>
            Hey, ${user.name.split(" ")[0]} 👋
          </h1>

          <p>
            ${user.class || "Student"} · ${school.city}
          </p>
        </div>

        <div class="profile-circle">
          ${user.name.charAt(0)}
        </div>

      </section>


      <section class="hero-card">

        <div class="hero-content">

          <span class="hero-label">
            YOUR SCHOOL
          </span>

          <h2>
            ${school.name}
          </h2>

          <p>
            Stay consistent. Keep learning.
          </p>

        </div>

        <div class="hero-symbol">
          🎓
        </div>

      </section>


      <section class="stats-grid">

        ${iconBox(
          "✓",
          "Attendance",
          attendance + "%"
        )}

        ${iconBox(
          "📝",
          "Pending HW",
          pendingHomework
        )}

        ${iconBox(
          "📅",
          "Exams",
          DB.exams.length
        )}

        ${iconBox(
          "₹",
          "Fee Due",
          "₹" + DB.fees.pending.toLocaleString("en-IN")
        )}

      </section>


      <section class="section-block">

        <div class="section-header">
          <h3>Quick Access</h3>
          <span>Explore</span>
        </div>

        <div class="action-grid">

          <button
            class="quick-action"
            onclick="go('homework')"
          >
            <span>📚</span>
            <b>Homework</b>
          </button>

          <button
            class="quick-action"
            onclick="go('attendance')"
          >
            <span>📊</span>
            <b>Attendance</b>
          </button>

          <button
            class="quick-action"
            onclick="go('results')"
          >
            <span>🏆</span>
            <b>Results</b>
          </button>

          <button
            class="quick-action"
            onclick="go('exams')"
          >
            <span>🗓️</span>
            <b>Exams</b>
          </button>

          <button
            class="quick-action"
            onclick="go('fees')"
          >
            <span>💳</span>
            <b>Fees</b>
          </button>

          <button
            class="quick-action"
            onclick="go('study-ai')"
          >
            <span>✨</span>
            <b>Study AI</b>
          </button>

        </div>

      </section>


      <section class="section-block">

        <div class="section-header">

          <h3>Recent Homework</h3>

          <button onclick="go('homework')">
            View all
          </button>

        </div>

        <div class="stack-list">

          ${DB.homework.slice(0, 3).map(h => `
            <div class="list-card">

              <div class="list-icon">
                ${h.subject === "Physics"
                  ? "⚛️"
                  : h.subject === "Chemistry"
                  ? "🧪"
                  : "📐"}
              </div>

              <div class="list-info">

                <strong>${h.title}</strong>

                <small>
                  ${h.subject} · Due ${h.due}
                </small>

              </div>

              <span class="status ${
                h.status === "Done"
                  ? "success"
                  : "warning"
              }">
                ${h.status}
              </span>

            </div>
          `).join("")}

        </div>

      </section>


      <section class="section-block">

        <div class="section-header">

          <h3>Latest Notices</h3>

          <button onclick="go('notices')">
            View all
          </button>

        </div>

        <div class="stack-list">

          ${DB.notices.slice(0, 2).map(n => `
            <div class="notice-card">

              <div class="notice-icon">
                ${n.icon}
              </div>

              <div>

                <strong>
                  ${n.title}
                </strong>

                <small>
                  ${n.date}
                </small>

              </div>

            </div>
          `).join("")}

        </div>

      </section>


      <section class="ai-banner">

        <div>

          <span>✨ STUDY AI</span>

          <h3>
            Need help with a question?
          </h3>

          <p>
            Ask, understand and learn.
          </p>

        </div>

        <button onclick="go('study-ai')">
          Ask AI →
        </button>

      </section>

    </main>

    ${bottom()}
  `;
}


/* =========================
   TEACHER HOME
========================= */

function teacherHome() {

  const school = getSchool();

  return `
    ${header()}

    <main class="mobile-main">

      <section class="welcome-section">

        <div>

          <span class="eyebrow">
            TEACHER DASHBOARD
          </span>

          <h1>
            Hello, ${user.name.split(" ")[0]} 👋
          </h1>

          <p>
            ${school.name}
          </p>

        </div>

        <div class="profile-circle">
          ${user.name.charAt(0)}
        </div>

      </section>


      <section class="hero-card teacher-hero">

        <div class="hero-content">

          <span class="hero-label">
            TODAY
          </span>

          <h2>
            Manage your classes
          </h2>

          <p>
            Attendance, homework and notices.
          </p>

        </div>

        <div class="hero-symbol">
          👨‍🏫
        </div>

      </section>


      <section class="stats-grid">

        ${iconBox("👥", "Students", "42")}

        ${iconBox("✓", "Attendance", "Today")}

        ${iconBox("📝", "Homework", "3")}

        ${iconBox("📢", "Notices", "2")}

      </section>


      <section class="section-block">

        <div class="section-header">
          <h3>Teacher Tools</h3>
        </div>

        <div class="action-stack">

          ${actionCard(
            "✓",
            "Mark Attendance",
            "Update today's attendance",
            "teacher-attendance"
          )}

          ${actionCard(
            "📝",
            "Manage Homework",
            "Create and update homework",
            "teacher-homework"
          )}

          ${actionCard(
            "📢",
            "School Notices",
            "Publish important notices",
            "notices"
          )}

          ${actionCard(
            "👥",
            "My Classes",
            "View class information",
            "teacher-classes"
          )}

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}


/* =========================
   ADMIN HOME
========================= */

function adminHome() {

  const school = getSchool();

  const students =
    DB.users.filter(
      u => u.school === user.school && u.role === "student"
    ).length;

  const teachers =
    DB.users.filter(
      u => u.school === user.school && u.role === "teacher"
    ).length;

  return `
    ${header()}

    <main class="mobile-main">

      <section class="welcome-section">

        <div>

          <span class="eyebrow">
            ADMIN CONSOLE
          </span>

          <h1>
            Welcome, ${user.name.split(" ")[0]} 👋
          </h1>

          <p>
            ${school.name}
          </p>

        </div>

        <div class="profile-circle">
          ${user.name.charAt(0)}
        </div>

      </section>


      <section class="hero-card admin-hero">

        <div class="hero-content">

          <span class="hero-label">
            SCHOOL CODE
          </span>

          <h2>
            ${school.code}
          </h2>

          <p>
            Manage your school's complete ecosystem.
          </p>

        </div>

        <div class="hero-symbol">
          🏫
        </div>

      </section>


      <section class="stats-grid">

        ${iconBox("🎓", "Students", students)}

        ${iconBox("👨‍🏫", "Teachers", teachers)}

        ${iconBox("📚", "Homework", DB.homework.length)}

        ${iconBox("📢", "Notices", DB.notices.length)}

      </section>


      <section class="section-block">

        <div class="section-header">
          <h3>Administration</h3>
        </div>

        <div class="action-stack">

          ${actionCard(
            "👥",
            "Students",
            "Manage student accounts",
            "admin-students"
          )}

          ${actionCard(
            "👨‍🏫",
            "Teachers",
            "Manage teacher accounts",
            "admin-teachers"
          )}

          ${actionCard(
            "🏫",
            "School Settings",
            "Manage school information",
            "admin-school"
          )}

          ${actionCard(
            "📊",
            "Reports",
            "View school statistics",
            "admin-reports"
          )}

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}


/* =========================
   HOME ROUTER
========================= */

function home() {

  if (!user) {
    return loginScreen();
  }

  if (user.role === "teacher") {
    return teacherHome();
  }

  if (user.role === "admin") {
    return adminHome();
  }

  return studentHome();
}
/* =========================
   HOMEWORK PAGE
========================= */

function homeworkPage() {

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Homework",
        "Assignments and submission status"
      )}

      <div class="filter-row">

        <button class="filter-btn active">
          All
        </button>

        <button class="filter-btn">
          Pending
        </button>

        <button class="filter-btn">
          Done
        </button>

      </div>


      <div class="stack-list homework-list">

        ${DB.homework.map(h => `

          <div class="homework-card">

            <div class="homework-top">

              <div class="subject-icon">
                ${
                  h.subject === "Physics"
                    ? "⚛️"
                    : h.subject === "Chemistry"
                    ? "🧪"
                    : "📐"
                }
              </div>

              <span class="status ${
                h.status === "Done"
                  ? "success"
                  : "warning"
              }">
                ${h.status}
              </span>

            </div>


            <div class="homework-body">

              <span class="subject-name">
                ${h.subject}
              </span>

              <h3>
                ${h.title}
              </h3>

              <p>
                Submission deadline: ${h.due}
              </p>

            </div>


            ${
              user.role === "student"
                ? `
                  <button
                    class="outline-btn"
                    onclick="toggleHomework('${h.id}')"
                  >
                    ${
                      h.status === "Done"
                        ? "Mark as Pending"
                        : "Mark as Done"
                    }
                  </button>
                `
                : ""
            }

          </div>

        `).join("")}

      </div>

    </main>

    ${bottom()}
  `;
}


/* =========================
   HOMEWORK TOGGLE
========================= */

function toggleHomework(id) {

  const item =
    DB.homework.find(h => h.id === id);

  if (!item) return;

  item.status =
    item.status === "Done"
      ? "Pending"
      : "Done";

  render();
}


/* =========================
   RESULTS PAGE
========================= */

function resultsPage() {

  const totalMarks =
    DB.results.reduce(
      (sum, r) => sum + r.marks,
      0
    );

  const totalPossible =
    DB.results.reduce(
      (sum, r) => sum + r.total,
      0
    );

  const percentage =
    Math.round(
      (totalMarks / totalPossible) * 100
    );


  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Results",
        "Your latest academic performance"
      )}


      <section class="result-summary">

        <div class="result-score">

          <span>OVERALL</span>

          <strong>
            ${percentage}%
          </strong>

          <small>
            ${totalMarks}/${totalPossible} marks
          </small>

        </div>


        <div class="result-grade">

          <span>GRADE</span>

          <strong>
            A
          </strong>

          <small>
            Excellent progress
          </small>

        </div>

      </section>


      <section class="section-block">

        <div class="section-header">

          <h3>
            Subject Performance
          </h3>

        </div>


        <div class="result-list">

          ${DB.results.map(r => {

            const pct =
              Math.round(
                (r.marks / r.total) * 100
              );

            return `

              <div class="result-card">

                <div class="result-card-top">

                  <div>

                    <strong>
                      ${r.subject}
                    </strong>

                    <small>
                      ${r.marks}/${r.total} marks
                    </small>

                  </div>

                  <span class="grade-pill">
                    ${r.grade}
                  </span>

                </div>


                <div class="progress-track">

                  <div
                    class="progress-fill"
                    style="width:${pct}%"
                  ></div>

                </div>


                <span class="percentage-label">
                  ${pct}%
                </span>

              </div>

            `;

          }).join("")}

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}


/* =========================
   EXAMS PAGE
========================= */

function examsPage() {

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Exam Schedule",
        "Upcoming examinations"
      )}


      <div class="exam-list">

        ${DB.exams.map((exam, index) => `

          <div class="exam-card">

            <div class="exam-date">

              <span>
                ${exam.date.split(" ")[0]}
              </span>

              <small>
                ${exam.date.split(" ")[1]}
              </small>

            </div>


            <div class="exam-info">

              <span>
                EXAM ${index + 1}
              </span>

              <h3>
                ${exam.subject}
              </h3>

              <p>
                🕘 ${exam.time}
              </p>

            </div>


            <span class="exam-arrow">
              ›
            </span>

          </div>

        `).join("")}

      </div>


      <div class="info-banner">

        <span>💡</span>

        <div>

          <strong>
            Preparation tip
          </strong>

          <p>
            Start revision at least 3 days before each exam.
          </p>

        </div>

      </div>

    </main>

    ${bottom()}
  `;
}

/* =========================
   FEES PAGE
========================= */

function feesPage() {

  const f = DB.fees;

  const paidPercent =
    Math.round(
      (f.paid / f.total) * 100
    );


  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Fees",
        "School fee overview"
      )}


      <section class="fee-card">

        <div class="fee-header">

          <div>

            <span>
              TOTAL FEE
            </span>

            <h2>
              ₹${f.total.toLocaleString("en-IN")}
            </h2>

          </div>

          <div class="fee-symbol">
            ₹
          </div>

        </div>


        <div class="fee-progress">

          <div
            style="width:${paidPercent}%"
          ></div>

        </div>


        <div class="fee-meta">

          <span>
            Paid ₹${f.paid.toLocaleString("en-IN")}
          </span>

          <span>
            ${paidPercent}% paid
          </span>

        </div>

      </section>


      <section class="stats-grid fee-stats">

        ${iconBox(
          "✓",
          "Paid",
          "₹" + f.paid.toLocaleString("en-IN")
        )}

        ${iconBox(
          "!",
          "Pending",
          "₹" + f.pending.toLocaleString("en-IN")
        )}

      </section>


      <div class="due-card">

        <div class="due-icon">
          📅
        </div>

        <div>

          <span>
            NEXT DUE DATE
          </span>

          <strong>
            ${f.nextDue}
          </strong>

        </div>

      </div>


      <div class="info-banner">

        <span>🔒</span>

        <div>

          <strong>
            Secure payment
          </strong>

          <p>
            Online payment integration can be connected in the production version.
          </p>

        </div>

      </div>

    </main>

    ${bottom()}
  `;
}


/* =========================
   ACADEMICS PAGE
========================= */

function academicsPage() {

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Academics",
        "Everything related to your studies"
      )}


      <div class="action-stack">

        ${actionCard(
          "📚",
          "Homework",
          "View assignments and deadlines",
          "homework"
        )}

        ${actionCard(
          "📊",
          "Attendance",
          "Track your attendance",
          "attendance"
        )}

        ${actionCard(
          "🏆",
          "Results",
          "View marks and grades",
          "results"
        )}

        ${actionCard(
          "🗓️",
          "Exam Schedule",
          "Upcoming exams",
          "exams"
        )}

        ${actionCard(
          "✨",
          "Study AI",
          "Get help with your studies",
          "study-ai"
        )}

      </div>


      <div class="info-banner">

        <span>🎓</span>

        <div>

          <strong>
            Keep learning
          </strong>

          <p>
            Consistent daily study makes a big difference.
          </p>

        </div>

      </div>

    </main>

    ${bottom()}
  `;
}
/* =========================
   ATTENDANCE PAGE
========================= */

function attendancePage() {

  const a = DB.attendance;

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Attendance",
        "Your attendance overview"
      )}

      <section class="attendance-main">

        <div class="attendance-circle">
          <strong>${a.overall}%</strong>
          <span>Overall</span>
        </div>

        <div class="attendance-counts">

          <div>
            <strong>${a.present}</strong>
            <span>Present</span>
          </div>

          <div>
            <strong>${a.absent}</strong>
            <span>Absent</span>
          </div>

          <div>
            <strong>${a.leave}</strong>
            <span>Leave</span>
          </div>

        </div>

      </section>


      <section class="section-block">

        <div class="section-header">
          <h3>Subject Attendance</h3>
        </div>

        <div class="subject-attendance">

          ${a.subjects.map(s => `

            <div class="attendance-row">

              <div>
                <strong>${s.name}</strong>
                <small>
                  ${s.attended}/${s.total} classes
                </small>
              </div>

              <div class="attendance-value">
                ${s.percentage}%
              </div>

            </div>

          `).join("")}

        </div>

      </section>


      <div class="info-banner">

        <span>ℹ️</span>

        <div>
          <strong>Attendance reminder</strong>
          <p>
            Maintain regular attendance to stay on track.
          </p>
        </div>

      </div>

    </main>

    ${bottom()}
  `;
}
/* =========================
   EVENTS PAGE
========================= */

function eventsPage() {

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "School Events",
        "Upcoming activities and events"
      )}

      <div class="event-list">

        ${DB.events.map(event => `

          <div class="event-card">

            <div class="event-date">
              <strong>
                ${event.date.split(" ")[0]}
              </strong>
              <span>
                ${event.date.split(" ")[1]}
              </span>
            </div>

            <div class="event-info">

              <span class="event-type">
                ${event.type}
              </span>

              <h3>
                ${event.title}
              </h3>

              <p>
                📍 ${event.place}
              </p>

              <button
                class="outline-btn"
                onclick="registerEvent('${event.id}')"
              >
                ${
                  DB.registrations.includes(event.id)
                    ? "✓ Registered"
                    : "Register"
                }
              </button>

            </div>

          </div>

        `).join("")}

      </div>

    </main>

    ${bottom()}
  `;
}


/* =========================
   EVENT REGISTRATION
========================= */

function registerEvent(id) {

  if (DB.registrations.includes(id)) {

    DB.registrations =
      DB.registrations.filter(
        item => item !== id
      );

  } else {

    DB.registrations.push(id);

  }

  saveState();

  render();
}
/* =========================
   NOTICES PAGE
========================= */

function noticesPage() {

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Notices",
        "Latest school announcements"
      )}

      <div class="stack-list">

        ${DB.notices.map(notice => `

          <div class="notice-card large">

            <div class="notice-icon">
              ${notice.icon}
            </div>

            <div class="notice-content">

              <strong>
                ${notice.title}
              </strong>

              <small>
                ${notice.date}
              </small>

            </div>

          </div>

        `).join("")}

      </div>

      <div class="info-banner">

        <span>🔔</span>

        <div>
          <strong>Stay updated</strong>
          <p>
            Check EduConnect regularly for important school announcements.
          </p>
        </div>

      </div>

    </main>

    ${bottom()}
  `;
}
/* =========================
   LEAVE PAGE
========================= */

function leavePage() {

  const myLeaves = DB.leaveRequests.filter(
    l => l.userId === user.id
  );

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Leave Request",
        "Apply for school leave"
      )}

      <div class="form-card">

        <label>
          From Date
          <input id="leaveFrom" type="date">
        </label>

        <label>
          To Date
          <input id="leaveTo" type="date">
        </label>

        <label>
          Reason
          <textarea
            id="leaveReason"
            rows="4"
            placeholder="Enter reason for leave"
          ></textarea>
        </label>

        <button
          class="btn primary"
          onclick="submitLeave()"
        >
          Submit Request
        </button>

      </div>


      <section class="section-block">

        <div class="section-header">
          <h3>My Requests</h3>
        </div>

        <div class="stack-list">

          ${
            myLeaves.length
              ? myLeaves.map(l => `
                  <div class="leave-card">

                    <strong>
                      ${l.from} → ${l.to}
                    </strong>

                    <small>
                      ${l.reason}
                    </small>

                    <span class="status warning">
                      ${l.status}
                    </span>

                  </div>
                `).join("")
              : `
                <div class="empty-state">
                  No leave requests yet.
                </div>
              `
          }

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}


/* =========================
   SUBMIT LEAVE
========================= */

function submitLeave() {

  const from =
    document.getElementById("leaveFrom").value;

  const to =
    document.getElementById("leaveTo").value;

  const reason =
    document.getElementById("leaveReason").value.trim();

  if (!from || !to || !reason) {
    alert("Please fill all fields");
    return;
  }

  DB.leaveRequests.push({
    id: "LV" + Date.now(),
    userId: user.id,
    from: from,
    to: to,
    reason: reason,
    status: "Pending"
  });

  saveState();

  alert("Leave request submitted");

  render();
}
/* =========================
   STUDY AI PAGE
========================= */

function studyAIPage() {

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Study AI",
        "Your personal study helper"
      )}

      <div class="ai-chat" id="aiChat">

        <div class="ai-message">
          <strong>EduAI</strong>
          <p>
            Hi! Ask me a study question and I'll explain it simply.
          </p>
        </div>

      </div>


      <div class="ai-input-box">

        <input
          id="aiInput"
          placeholder="Ask a study question..."
          onkeydown="if(event.key==='Enter') askAI()"
        >

        <button onclick="askAI()">
          ➤
        </button>

      </div>


      <div class="ai-suggestions">

        <button onclick="quickAI('Explain Newton laws simply')">
          Newton's Laws
        </button>

        <button onclick="quickAI('Explain photosynthesis')">
          Photosynthesis
        </button>

        <button onclick="quickAI('Explain trigonometry basics')">
          Trigonometry
        </button>

      </div>

    </main>

    ${bottom()}
  `;
}


/* =========================
   SIMPLE STUDY AI
========================= */

function askAI() {

  const input =
    document.getElementById("aiInput");

  const question =
    input.value.trim();

  if (!question) return;

  addAIMessage("You", question);

  input.value = "";

  setTimeout(() => {

    const answer = getAIAnswer(question);

    addAIMessage("EduAI", answer);

  }, 300);
}


function quickAI(question) {

  const input =
    document.getElementById("aiInput");

  input.value = question;

  askAI();
}


function addAIMessage(sender, message) {

  const chat =
    document.getElementById("aiChat");

  if (!chat) return;

  const div =
    document.createElement("div");

  div.className =
    sender === "EduAI"
      ? "ai-message"
      : "user-message";

  div.innerHTML = `
    <strong>${sender}</strong>
    <p>${message}</p>
  `;

  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;
}


function getAIAnswer(question) {

  const q =
    question.toLowerCase();

  if (
    q.includes("newton") ||
    q.includes("motion")
  ) {
    return "Newton's laws explain how force affects motion. The three laws describe inertia, acceleration and action-reaction.";
  }

  if (
    q.includes("photosynthesis")
  ) {
    return "Photosynthesis is the process by which green plants use sunlight, water and carbon dioxide to make food and release oxygen.";
  }

  if (
    q.includes("trigonometry") ||
    q.includes("sin") ||
    q.includes("cos")
  ) {
    return "Trigonometry studies relationships between angles and sides of triangles. The basic ratios are sin, cos and tan.";
  }

  if (
    q.includes("hello") ||
    q.includes("hi")
  ) {
    return "Hello! 👋 Ask me any study-related question.";
  }

  return "I can currently help with common school concepts. Try asking about Physics, Chemistry, Mathematics or Biology.";
}
/* =========================
   PROFILE PAGE
========================= */

function profilePage() {

  const school = getSchool();

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "My Profile",
        "Account information"
      )}

      <section class="profile-card">

        <div class="big-profile">
          ${user.name.charAt(0)}
        </div>

        <h2>
          ${user.name}
        </h2>

        <span class="role-badge">
          ${user.role.toUpperCase()}
        </span>

        <p>
          ${school.name}
        </p>

      </section>


      <div class="profile-info">

        <div>
          <span>School Code</span>
          <strong>${user.school}</strong>
        </div>

        <div>
          <span>Account</span>
          <strong>${user.phone}</strong>
        </div>

        ${
          user.class
            ? `
              <div>
                <span>Class</span>
                <strong>${user.class}</strong>
              </div>
            `
            : ""
        }

      </div>


      <button
        class="logout-btn"
        onclick="logout()"
      >
        Log Out
      </button>

    </main>

    ${bottom()}
  `;
}

/* =========================
   TEACHER ATTENDANCE
========================= */

function teacherAttendancePage() {

  const students = DB.users.filter(
    u => u.role === "student" &&
         u.school === user.school
  );

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Mark Attendance",
        "Today's class attendance"
      )}

      <div class="date-card">
        📅 ${new Date().toLocaleDateString("en-IN")}
      </div>

      <div class="student-attendance-list">

        ${
          students.length
            ? students.map(s => `
                <label class="student-attendance">

                  <div>
                    <strong>${s.name}</strong>
                    <small>${s.class || "Student"}</small>
                  </div>

                  <input
                    type="checkbox"
                    checked
                    onchange="updateStudentAttendance('${s.id}', this.checked)"
                  >

                </label>
              `).join("")
            : `
              <div class="empty-state">
                No students found.
              </div>
            `
        }

      </div>

      <button
        class="btn primary"
        onclick="saveTeacherAttendance()"
      >
        Save Attendance
      </button>

    </main>

    ${bottom()}
  `;
}


/* =========================
   ATTENDANCE ACTIONS
========================= */

const todayAttendance = {};

function updateStudentAttendance(id, present) {

  todayAttendance[id] = present;

}


function saveTeacherAttendance() {

  alert("Attendance saved successfully");

}
/* =========================
   TEACHER HOMEWORK
========================= */

function teacherHomeworkPage() {

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Manage Homework",
        "Create a new assignment"
      )}

      <div class="form-card">

        <label>
          Subject
          <input
            id="hwSubject"
            placeholder="e.g. Physics"
          >
        </label>

        <label>
          Homework Title
          <input
            id="hwTitle"
            placeholder="e.g. Laws of Motion"
          >
        </label>

        <label>
          Due Date
          <input
            id="hwDue"
            type="date"
          >
        </label>

        <button
          class="btn primary"
          onclick="addHomework()"
        >
          Add Homework
        </button>

      </div>


      <section class="section-block">

        <div class="section-header">
          <h3>Current Homework</h3>
        </div>

        <div class="stack-list">

          ${DB.homework.map(h => `
            <div class="list-card">

              <div class="list-icon">
                📝
              </div>

              <div class="list-info">
                <strong>${h.title}</strong>
                <small>
                  ${h.subject} · ${h.due}
                </small>
              </div>

              <span class="status warning">
                ${h.status}
              </span>

            </div>
          `).join("")}

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}


/* =========================
   ADD HOMEWORK
========================= */

function addHomework() {

  const subject =
    document.getElementById("hwSubject").value.trim();

  const title =
    document.getElementById("hwTitle").value.trim();

  const due =
    document.getElementById("hwDue").value;

  if (!subject || !title || !due) {
    alert("Please fill all fields");
    return;
  }

  DB.homework.unshift({
    id: "HW" + Date.now(),
    subject: subject,
    title: title,
    due: due,
    status: "Pending"
  });

  alert("Homework added successfully");

  render();
}
/* =========================
   TEACHER CLASSES
========================= */

function teacherClassesPage() {

  const students = DB.users.filter(
    u =>
      u.role === "student" &&
      u.school === user.school
  );

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "My Classes",
        "Students in your school"
      )}

      <div class="class-summary">

        <div>
          <strong>XI-A</strong>
          <span>Class</span>
        </div>

        <div>
          <strong>${students.length}</strong>
          <span>Students</span>
        </div>

      </div>


      <section class="section-block">

        <div class="section-header">
          <h3>Student List</h3>
        </div>

        <div class="student-list">

          ${
            students.length
              ? students.map((student, index) => `
                  <div class="student-card">

                    <div class="student-avatar">
                      ${student.name.charAt(0)}
                    </div>

                    <div>
                      <strong>
                        ${student.name}
                      </strong>

                      <small>
                        ${student.class || "XI-A"}
                      </small>
                    </div>

                    <span>
                      #${index + 1}
                    </span>

                  </div>
                `).join("")
              : `
                <div class="empty-state">
                  No students found.
                </div>
              `
          }

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}
/* =========================
   ADMIN STUDENTS
========================= */

function adminStudentsPage() {

  const students = DB.users.filter(
    u =>
      u.role === "student" &&
      u.school === user.school
  );

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Students",
        "Manage student accounts"
      )}

      <div class="class-summary">

        <div>
          <strong>${students.length}</strong>
          <span>Total Students</span>
        </div>

        <div>
          <strong>${user.school}</strong>
          <span>School Code</span>
        </div>

      </div>


      <section class="section-block">

        <div class="section-header">
          <h3>Student Accounts</h3>
        </div>

        <div class="student-list">

          ${
            students.length
              ? students.map(student => `
                  <div class="student-card">

                    <div class="student-avatar">
                      ${student.name.charAt(0)}
                    </div>

                    <div>
                      <strong>
                        ${student.name}
                      </strong>

                      <small>
                        ${student.class || "Student"}
                        · ${student.phone}
                      </small>
                    </div>

                  </div>
                `).join("")
              : `
                <div class="empty-state">
                  No students found.
                </div>
              `
          }

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}
/* =========================
   ADMIN TEACHERS
========================= */

function adminTeachersPage() {

  const teachers = DB.users.filter(
    u =>
      u.role === "teacher" &&
      u.school === user.school
  );

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "Teachers",
        "Manage teacher accounts"
      )}

      <div class="class-summary">

        <div>
          <strong>${teachers.length}</strong>
          <span>Total Teachers</span>
        </div>

        <div>
          <strong>${user.school}</strong>
          <span>School Code</span>
        </div>

      </div>


      <section class="section-block">

        <div class="section-header">
          <h3>Teacher Accounts</h3>
        </div>

        <div class="student-list">

          ${
            teachers.length
              ? teachers.map(teacher => `
                  <div class="student-card">

                    <div class="student-avatar">
                      ${teacher.name.charAt(0)}
                    </div>

                    <div>
                      <strong>
                        ${teacher.name}
                      </strong>

                      <small>
                        Teacher · ${teacher.phone}
                      </small>
                    </div>

                  </div>
                `).join("")
              : `
                <div class="empty-state">
                  No teachers found.
                </div>
              `
          }

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}
/* =========================
   ADMIN SCHOOL SETTINGS
========================= */

function adminSchoolPage() {

  const school = getSchool();

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "School Settings",
        "School information"
      )}

      <section class="profile-card">

        <div class="big-profile">
          🏫
        </div>

        <h2>
          ${school.name}
        </h2>

        <span class="role-badge">
          ${school.code}
        </span>

        <p>
          ${school.city}
        </p>

      </section>


      <div class="profile-info">

        <div>
          <span>School Code</span>
          <strong>${school.code}</strong>
        </div>

        <div>
          <span>Location</span>
          <strong>${school.city}</strong>
        </div>

        <div>
          <span>Platform</span>
          <strong>EduConnect</strong>
        </div>

      </div>


      <div class="info-banner">

        <span>🔐</span>

        <div>
          <strong>School data isolation</strong>

          <p>
            Each school uses its own School Code. In the production backend, all school data will remain separated by school ID.
          </p>
        </div>

      </div>

    </main>

    ${bottom()}
  `;
}
/* =========================
   ADMIN REPORTS
========================= */

function adminReportsPage() {

  const students = DB.users.filter(
    u => u.role === "student" && u.school === user.school
  ).length;

  const teachers = DB.users.filter(
    u => u.role === "teacher" && u.school === user.school
  ).length;

  const pendingHW = DB.homework.filter(
    h => h.status !== "Done"
  ).length;

  return `
    ${header()}

    <main class="mobile-main">

      ${pageTitle(
        "School Reports",
        "Quick school overview"
      )}

      <section class="stats-grid">

        ${iconBox("🎓", "Students", students)}

        ${iconBox("👨‍🏫", "Teachers", teachers)}

        ${iconBox("📝", "Pending HW", pendingHW)}

        ${iconBox("📢", "Notices", DB.notices.length)}

      </section>


      <section class="section-block">

        <div class="section-header">
          <h3>Attendance</h3>
        </div>

        <div class="report-card">

          <strong>
            ${DB.attendance.overall}%
          </strong>

          <span>
            Overall student attendance
          </span>

        </div>

      </section>


      <section class="section-block">

        <div class="section-header">
          <h3>Fees</h3>
        </div>

        <div class="report-card">

          <strong>
            ₹${DB.fees.paid.toLocaleString("en-IN")}
          </strong>

          <span>
            Collected · ₹${DB.fees.pending.toLocaleString("en-IN")} pending
          </span>

        </div>

      </section>

    </main>

    ${bottom()}
  `;
}
/* =========================
   MAIN RENDER
========================= */

function render() {

  loadState();

  if (!user) {
    loginScreen();
    return;
  }

  const route =
    location.hash.replace("#", "") || "home";

  let content = "";


  switch (route) {

    case "home":
      content = home();
      break;

    case "academics":
      content = academicsPage();
      break;

    case "homework":
      content = homeworkPage();
      break;

    case "attendance":
      content =
        user.role === "teacher"
          ? teacherAttendancePage()
          : attendancePage();
      break;

    case "results":
      content = resultsPage();
      break;

    case "exams":
      content = examsPage();
      break;

    case "fees":
      content = feesPage();
      break;

    case "events":
      content = eventsPage();
      break;

    case "notices":
      content = noticesPage();
      break;

    case "leave":
      content = leavePage();
      break;

    case "study-ai":
      content = studyAIPage();
      break;

    case "profile":
      content = profilePage();
      break;


    /* ===== TEACHER ===== */

    case "teacher-attendance":
      content = teacherAttendancePage();
      break;

    case "teacher-homework":
      content = teacherHomeworkPage();
      break;

    case "teacher-classes":
      content = teacherClassesPage();
      break;


    /* ===== ADMIN ===== */

    case "admin-students":
      content = adminStudentsPage();
      break;

    case "admin-teachers":
      content = adminTeachersPage();
      break;

    case "admin-school":
      content = adminSchoolPage();
      break;

    case "admin-reports":
      content = adminReportsPage();
      break;


    default:
      content = home();

  }


  app.innerHTML = content;
}


/* =========================
   HASH CHANGE
========================= */

window.addEventListener(
  "hashchange",
  render
);


/* =========================
   INITIAL START
========================= */

loadState();

render();

