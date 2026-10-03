const KEY="educonnect_v2";

const DB={
 users:[
  {role:"student",school:"EDU001",phone:"7777777777",pass:"1234",name:"Dipanshu Patidar",class:"XI-A"},
  {role:"teacher",school:"EDU001",phone:"8888888888",pass:"1234",name:"Neha Verma"},
  {role:"admin",school:"EDU001",phone:"9999999999",pass:"1234",name:"Aarav Sharma"}
 ],
 homework:[
  ["Physics","Laws of Motion","05 Oct","Pending"],
  ["Chemistry","Chemical Bonding","06 Oct","Pending"],
  ["Mathematics","Trigonometry","07 Oct","Done"]
 ],
 notices:[
  "Monthly test schedule released",
  "PTM will be conducted this Saturday",
  "School event registrations are open"
 ]
};

let user=null;
const app=document.getElementById("app");

function login(){
 const school=document.getElementById("school").value.trim().toUpperCase();
 const phone=document.getElementById("phone").value.trim();
 const pass=document.getElementById("pass").value;
 user=DB.users.find(u=>u.school===school&&u.phone===phone&&u.pass===pass);
 if(!user)return alert("Invalid login details");
 location.hash="home";
 render();
}

function logout(){
 user=null;
 location.hash="";
 render();
}

function go(p){
 location.hash=p;
 render();
}

function loginScreen(){
 app.innerHTML=`
 <div class="login-page">
  <div class="login-box">
   <div class="logo">E</div>
   <h1>EduConnect</h1>
   <p>Learn • Grow • Achieve</p>
   <input id="school" placeholder="School Code">
   <input id="phone" placeholder="Phone / Account">
   <input id="pass" type="password" placeholder="Password">
   <button class="btn primary" onclick="login()">Login</button>
   <small>Demo: EDU001 · 7777777777 · 1234</small>
  </div>
 </div>`;
}

function header(){
 return `
 <header class="mobile-head">
  <div class="brand-mini">
   <b>🎓</b><strong>EduConnect</strong>
  </div>
  <div class="head-icons">♡　🔔　👤</div>
 </header>`;
}

function bottom(){
 return `
 <nav class="bottom-nav">
  <button onclick="go('home')">⌂<span>Home</span></button>
  <button onclick="go('academics')">▦<span>Academics</span></button>
  <button onclick="go('events')">◉<span>Events</span></button>
  <button onclick="go('notices')">♢<span>Notices</span></button>
  <button onclick="go('profile')">•••<span>More</span></button>
 </nav>`;
}

function home(){
 app.innerHTML=`
 <div class="mobile-app">
  ${header()}

  <main class="mobile-content">

   <section class="welcome">
    <p>Good Morning, ${user.name.split(" ")[0]} 👋</p>
    <small>Saraswati Vidya Mandir Higher Secondary School</small>
   </section>

   <section class="hero-card">
    <div>
     <small>Keep Going</small>
     <b>Your Future Is Bright ✨</b>
     <span>Stay consistent and keep learning.</span>
    </div>
    <div class="hero-icon">🎓</div>
   </section>

   <section class="stat-grid">
    <div class="stat-card green">
     <small>Attendance</small>
     <b>92%</b>
     <span>↑ 2% from last week</span>
    </div>

    <div class="stat-card purple">
     <small>Total Marks</small>
     <b>438/500</b>
     <span>↑ 12% from last exam</span>
    </div>

    <div class="stat-card orange">
     <small>Pending Homework</small>
     <b>3</b>
     <span>View details</span>
    </div>

    <div class="stat-card red">
     <small>Upcoming Exams</small>
     <b>2</b>
     <span>View schedule</span>
    </div>
   </section>

   <div class="section-title">
    <b>Quick Actions</b>
    <span>View all</span>
   </div>

   <section class="quick-grid">
    <button onclick="go('homework')">📚<span>Homework</span></button>
    <button onclick="go('attendance')">✓<span>Attendance</span></button>
    <button onclick="go('results')">📊<span>Results</span></button>
    <button onclick="go('exams')">🗓️<span>Exams</span></button>
    <button onclick="go('fees')">💳<span>Fees</span></button>
    <button onclick="go('events')">🎉<span>Events</span></button>
    <button onclick="go('leave')">📝<span>Leave</span></button>
    <button onclick="go('study')">✨<span>Study AI</span></button>
   </section>

   <div class="section-title">
    <b>Recent Notices</b>
    <span onclick="go('notices')">View all</span>
   </div>

   <section class="notice-card">
    ${DB.notices.map((n,i)=>`
     <div>
      <b class="notice-icon">${i===0?"📢":i===1?"📅":"🎯"}</b>
      <span>${n}</span>
     </div>
    `).join("")}
   </section>

   <div class="section-title">
    <b>Upcoming Events</b>
    <span onclick="go('events')">View all</span>
   </div>

   <section class="event-card">
    <b>🔬 Science Exhibition</b>
    <small>18 Sep 2026 · School Campus</small>
   </section>

  </main>

  ${bottom()}
 </div>`;
}

function page(title,text){
 app.innerHTML=`
 <div class="mobile-app">
  ${header()}

  <main class="mobile-content inner-page">

   <button class="back" onclick="go('home')">‹ Back</button>

   <div class="page-card">
    <div class="page-icon">📚</div>
    <h1>${title}</h1>
    <p>${text}</p>
   </div>

  </main>

  ${bottom()}
 </div>`;
}

function attendancePage(){
 app.innerHTML=`
 <div class="mobile-app">
  ${header()}

  <main class="mobile-content inner-page">

   <button class="back" onclick="go('home')">‹ Back</button>

   <div class="page-heading">
    <small>ACADEMICS</small>
    <h1>Attendance</h1>
    <p>Your attendance overview and monthly record.</p>
   </div>

   <section class="attendance-main">
    <div class="attendance-ring">
     <div>
      <b>92%</b>
      <span>Overall</span>
     </div>
    </div>

    <div class="attendance-info">
     <b>Great consistency!</b>
     <p>Keep maintaining your attendance this month.</p>
    </div>
   </section>

   <section class="attendance-stats">
    <div>
     <span class="dot present"></span>
     <b>46</b>
     <small>Present</small>
    </div>

    <div>
     <span class="dot absent"></span>
     <b>3</b>
     <small>Absent</small>
    </div>

    <div>
     <span class="dot leave"></span>
     <b>1</b>
     <small>Leave</small>
    </div>
   </section>

   <div class="section-title">
    <b>October 2026</b>
    <span>Monthly View</span>
   </div>

   <section class="calendar-card">
    <div class="calendar-head">
     <span>Mon</span>
     <span>Tue</span>
     <span>Wed</span>
     <span>Thu</span>
     <span>Fri</span>
     <span>Sat</span>
     <span>Sun</span>
    </div>

    <div class="calendar-days">
     <span class="muted">28</span>
     <span class="muted">29</span>
     <span class="muted">30</span>
     <span>1</span>
     <span class="present-day">2</span>
     <span class="present-day">3</span>
     <span class="weekend">4</span>

     <span class="present-day">5</span>
     <span class="present-day">6</span>
     <span class="present-day">7</span>
     <span class="present-day">8</span>
     <span class="present-day">9</span>
     <span class="absent-day">10</span>
     <span class="weekend">11</span>

     <span class="present-day">12</span>
     <span class="present-day">13</span>
     <span class="leave-day">14</span>
     <span class="present-day">15</span>
     <span class="present-day">16</span>
     <span class="present-day">17</span>
     <span class="weekend">18</span>

     <span class="present-day">19</span>
     <span class="present-day">20</span>
     <span class="present-day">21</span>
     <span class="present-day">22</span>
     <span class="present-day">23</span>
     <span class="present-day">24</span>
     <span class="weekend">25</span>

     <span class="present-day">26</span>
     <span class="present-day">27</span>
     <span class="present-day">28</span>
     <span class="present-day">29</span>
     <span class="present-day">30</span>
     <span class="present-day">31</span>
    </div>

    <div class="calendar-legend">
     <span><i class="present"></i> Present</span>
     <span><i class="absent"></i> Absent</span>
     <span><i class="leave"></i> Leave</span>
    </div>
   </section>

   <div class="section-title">
    <b>Subject Attendance</b>
    <span>View all</span>
   </div>

   <section class="subject-attendance">

    <div class="subject-row">
     <div>
      <b>Physics</b>
      <small>18 / 20 classes</small>
     </div>
     <strong>90%</strong>
     <div class="progress"><span style="width:90%"></span></div>
    </div>

    <div class="subject-row">
     <div>
      <b>Chemistry</b>
      <small>19 / 20 classes</small>
     </div>
     <strong>95%</strong>
     <div class="progress"><span style="width:95%"></span></div>
    </div>

    <div class="subject-row">
     <div>
      <b>Mathematics</b>
      <small>17 / 19 classes</small>
     </div>
     <strong>89%</strong>
     <div class="progress"><span style="width:89%"></span></div>
    </div>

   </section>

  </main>

  ${bottom()}
 </div>`;
}
function render(){
 if(!user)return loginScreen();
 const p=location.hash.replace("#","")||"home";

 if(p==="home")home();
 else if(p==="homework")page("Homework","Assignments and submissions");
 else if(p==="attendance")attendancePage();
 else if(p==="results")page("Results","Marks, grades and academic performance");
 else if(p==="exams")page("Exams & Timetable","Upcoming examinations and weekly timetable");
 else if(p==="fees")page("Fees","Fee details and payment status");
 else if(p==="events")page("Events & PTM","School events and parent-teacher meetings");
 else if(p==="leave")page("Leave Request","Apply and track your leave");
 else if(p==="documents")page("Documents","School files, certificates and notices");
 else if(p==="study")page("Study AI","Ask questions and get study help");
 else if(p==="academics")page("Academics","Subjects, timetable and results");
 else if(p==="notices")page("Notices","Latest school announcements");
 else if(p==="profile")page("Profile",user.name+" · "+user.role);
 else home();
}

window.login=login;
window.logout=logout;
window.go=go;
window.onhashchange=render;
render();
