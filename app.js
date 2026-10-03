const DB_KEY="educonnect_v1";

const DATA={
  users:[
    {role:"student",school:"EDU001",phone:"7777777777",pass:"1234",name:"Dipanshu Patidar",class:"XI-A"},
    {role:"teacher",school:"EDU001",phone:"8888888888",pass:"1234",name:"Neha Verma",subject:"Physics"},
    {role:"admin",school:"EDU001",phone:"9999999999",pass:"1234",name:"Aarav Sharma"}
  ],
  homework:[
    {subject:"Physics",title:"Laws of Motion",due:"05 Oct",status:"Pending"},
    {subject:"Chemistry",title:"Chemical Bonding",due:"06 Oct",status:"Pending"},
    {subject:"Mathematics",title:"Trigonometry",due:"07 Oct",status:"Done"}
  ],
  attendance:"92%",
  results:[
    ["Physics","86%"],["Chemistry","89%"],["Mathematics","91%"],["English","88%"]
  ],
  notices:[
    "Monthly test schedule released",
    "PTM will be conducted this Saturday",
    "School event registrations are open"
  ]
};

let db=JSON.parse(localStorage.getItem(DB_KEY)||"null")||DATA;
let user=null;

const app=document.getElementById("app");

function save(){localStorage.setItem(DB_KEY,JSON.stringify(db))}

function login(){
  const s=document.getElementById("school").value.trim().toUpperCase();
  const p=document.getElementById("phone").value.trim();
  const pw=document.getElementById("pass").value;
  const u=db.users.find(x=>x.school===s&&x.phone===p&&x.pass===pw);
  if(!u)return alert("Invalid School Code, Phone or Password");
  user=u;
  location.hash="dashboard";
  render();
}

function logout(){
  user=null;
  location.hash="";
  render();
}

function go(page){
  location.hash=page;
  render();
}

function loginPage(){
  app.innerHTML=`
  <div class="login-page">
    <div class="login-box">
      <div class="logo">E</div>
      <h1>EduConnect</h1>
      <p>Smart School Management</p>
      <input id="school" placeholder="School Code">
      <input id="phone" placeholder="Phone Number" inputmode="numeric">
      <input id="pass" type="password" placeholder="Password">
      <button class="btn primary" onclick="login()">Sign In</button>
      <small>Demo: EDU001 · 7777777777 · 1234</small>
    </div>
  </div>`;
}

const pages={
  dashboard:["Dashboard","Welcome back"],
  homework:["Homework","Assignments & submissions"],
  attendance:["Attendance","Your attendance overview"],
  results:["Results","Academic performance"],
  exams:["Exams & Timetable","Upcoming examinations"],
  fees:["Fees","Fee information"],
  events:["Events & PTM","School activities"],
  leave:["Leave Request","Apply and track leave"],
  feedback:["Feedback","Share your feedback"],
  documents:["Documents","Important school files"],
  study:["Study AI","Your smart study assistant"],
  profile:["Profile","Account information"],
  management:["School Management","Manage your school"]
};

function cards(){
  return Object.keys(pages)
    .filter(x=>x!=="dashboard"&&x!=="management")
    .map(x=>`<button class="nav-item" onclick="go('${x}')">${pages[x][0]}</button>`).join("");
}

function shell(content,title,sub){
  app.innerHTML=`
  <div class="app-shell">
    <aside>
      <div class="brand"><b>E</b><span>EduConnect</span></div>
      <button class="nav-item active" onclick="go('dashboard')">Dashboard</button>
      ${cards()}
      ${user.role==="admin"?`<button class="nav-item" onclick="go('management')">School Management</button>`:""}
      <button class="nav-item logout" onclick="logout()">Logout</button>
    </aside>
    <main>
      <header>
        <div><h2>${title}</h2><p>${sub}</p></div>
        <div class="user-chip">${user.name}</div>
      </header>
      <section class="content">${content}</section>
    </main>
  </div>`;
}

function dashboard(){
  const extra=user.role==="student"
    ?`<div class="grid">
       <div class="card"><span>Attendance</span><strong>${db.attendance}</strong></div>
       <div class="card"><span>Homework</span><strong>${db.homework.length}</strong></div>
       <div class="card"><span>Results</span><strong>Excellent</strong></div>
     </div>`
    :user.role==="teacher"
    ?`<div class="grid">
       <div class="card"><span>Classes</span><strong>XI-A, XI-B</strong></div>
       <div class="card"><span>Homework</span><strong>${db.homework.length}</strong></div>
       <div class="card"><span>Subject</span><strong>${user.subject}</strong></div>
     </div>`
    :`<div class="grid">
       <div class="card"><span>Students</span><strong>248</strong></div>
       <div class="card"><span>Teachers</span><strong>24</strong></div>
       <div class="card"><span>Classes</span><strong>18</strong></div>
     </div>`;

  shell(`
    ${extra}
    <div class="card">
      <h3>Latest Notices</h3>
      ${db.notices.map(n=>`<div class="list">${n}</div>`).join("")}
    </div>
  `,"Dashboard","Everything your school needs in one place");
}

function homework(){
  shell(`
  <div class="card">
    <h3>Homework</h3>
    ${db.homework.map(h=>`
      <div class="list">
        <b>${h.subject}</b> — ${h.title}
        <span>${h.due} · ${h.status}</span>
      </div>`).join("")}
  </div>`,"Homework","Assignments & submissions");
}

function attendance(){
  shell(`
  <div class="card center">
    <span>Overall Attendance</span>
    <strong class="big">${db.attendance}</strong>
    <p>Keep attending classes regularly.</p>
  </div>`,"Attendance","Your attendance overview");
}

function results(){
  shell(`
  <div class="card">
    <h3>Subject Results</h3>
    ${db.results.map(r=>`<div class="list"><b>${r[0]}</b><span>${r[1]}</span></div>`).join("")}
  </div>`,"Results","Academic performance");
}

function generic(page){
  shell(`
  <div class="card">
    <h3>${pages[page][0]}</h3>
    <p>${pages[page][1]}</p>
    <button class="btn primary">Coming Ready</button>
  </div>` ,pages[page][0],pages[page][1]);
}

function study(){
  shell(`
  <div class="card">
    <h3>Study AI</h3>
    <p>Ask questions, explain concepts and get study help.</p>
    <input id="question" placeholder="Ask your study question...">
    <button class="btn primary" onclick="alert('AI assistant will answer here.')">Ask AI</button>
  </div>`,"Study AI","Your smart study assistant");
}

function management(){
  shell(`
  <div class="grid">
    <div class="card"><h3>Students</h3><strong>248</strong></div>
    <div class="card"><h3>Teachers</h3><strong>24</strong></div>
    <div class="card"><h3>Classes</h3><strong>18</strong></div>
    <div class="card"><h3>School Data</h3><p>Manage your school's academic information.</p></div>
  </div>`,"School Management","Admin control centre");
}

function render(){
  if(!user)return loginPage();
  const p=location.hash.replace("#","")||"dashboard";
  if(p==="dashboard")dashboard();
  else if(p==="homework")homework();
  else if(p==="attendance")attendance();
  else if(p==="results")results();
  else if(p==="study")study();
  else if(p==="management"&&user.role==="admin")management();
  else generic(pages[p]?p:"dashboard");
}

window.login=login;
window.logout=logout;
window.go=go;
window.onhashchange=render;

render();
