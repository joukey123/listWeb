// 시간
const todayDate = document.querySelector(".today-date");
const todayTime = document.querySelector(".today-time");

// 유저 로그인
const loginForm = document.querySelector("#loginForm");
const nameInput = document.querySelector(".nameInput");
const greetingFrom = document.querySelector("#greetingFrom");
const greeting = document.querySelector(".greeting");
const logoutBtn = document.querySelector(".greetingFrom-btn");
const userLocation = document.querySelector(".greeting-location");

const current = new Date();
//날짜
const year = current.getFullYear();
const month = current.getMonth() + 1;
const date = current.getDate();
const day = current.getDay();
const day_list = ["일", "월", "화", "수", "목", "금", "토"];

todayDate.innerText = `${year}년 ${month}월 ${date}일 (${day_list[day]})`;

//시간
const hour = String(current.getHours()).padStart(2, "0");
const min = String(current.getMinutes()).padStart(2, "0");

todayTime.innerText = `${hour} : ${min}`;

const login = (event) => {
  event.preventDefault();
  const username = nameInput.value;
  localStorage.setItem("username", username);
  greetingPaint(username);
};

const greetingPaint = (username) => {
  loginForm.classList.add("hidden");
  greetingFrom.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  userLocation.classList.remove("hidden");
  greeting.innerText = `Hello, ${username}`;
};

const logout = () => {
  localStorage.removeItem("username");
};

const savedUsername = localStorage.getItem("username");

if (savedUsername === null) {
  loginForm.addEventListener("submit", login);
} else {
  greetingPaint(savedUsername);
}
greetingFrom.addEventListener("submit", logout);
