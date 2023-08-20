//screen
const todoScreen = document.querySelector("#todoScreen");

// 시간
const todayDate = document.querySelector(".today-date");
const todayTime = document.querySelector(".today-time");

// 유저 로그인
const loginForm = document.querySelector("#loginForm");
const nameInput = document.querySelector(".nameInput");
const greetingFrom = document.querySelector("#greetingFrom");
const greeting = document.querySelector(".greeting");
const logoutBtn = document.querySelector(".greetingFrom-btn");
const loginBtn = document.querySelector(".loginForm-btn");
//위치
const userLocation = document.querySelector(".greeting-location");
const city = document.querySelector("#city");
const weather = document.querySelector("#weather");

//Todo
const todoForm = document.querySelector("#todoForm");
const todoFormInput = document.querySelector("#todoForm input");
const toDoList = document.querySelector(".toDoList");

// ===================================================

//날짜 불러오기
const current = new Date();
const year = current.getFullYear();
const month = current.getMonth() + 1;
const date = current.getDate();
const day = current.getDay();
const day_list = ["일", "월", "화", "수", "목", "금", "토"];

todayDate.innerText = `${year}년 ${month}월 ${date}일 (${day_list[day]})`;

//시간 불러오기
const timeUpdate = () => {
  const current = new Date();
  const hour = String(current.getHours()).padStart(2, "0");
  const min = String(current.getMinutes()).padStart(2, "0");
  todayTime.innerText = `${hour} : ${min}`;
};
timeUpdate();
setInterval(timeUpdate, 1000);

//로그인
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
  document.body.classList.add("flex");
  todoScreen.classList.remove("hidden");
  todoScreen.classList.add("flex");
  greeting.innerText = `Hello, ${username}`;
};

//위치 날씨 정보 불러오기
const API_KEY = "67f03e334725f705ab02488ce66beb31";
const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
    });
};

const onGeoError = () => {
  city.innerText = `위치정보를 찾을 수 없습니다.`;
};
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//로그아웃
const logout = () => {
  localStorage.removeItem("username");
  todoScreen.classList.add("hidden");
};

//유저네임 체크
const savedUsername = localStorage.getItem("username");

if (savedUsername === null) {
  loginForm.addEventListener("submit", login);
} else {
  greetingPaint(savedUsername);
}
greetingFrom.addEventListener("submit", logout);

//todo
let toDos = [];
const saveTodo = () => {
  localStorage.setItem("todos", JSON.stringify(toDos));
};

const deleteTodo = (event) => {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
};
const box = document.querySelectorAll("li div");

const checkBox = (event) => {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const div = li.querySelector("div");
  span.classList.toggle("check-select");
  div.classList.toggle("bgColor");
};

const paintTodo = (newTodo) => {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const box = document.createElement("div");
  box.addEventListener("click", checkBox);
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", deleteTodo);
  li.appendChild(box);
  li.appendChild(span);
  li.appendChild(deleteButton);
  toDoList.appendChild(li);
};
const todoHandle = (event) => {
  event.preventDefault();
  const newTodo = todoFormInput.value;
  todoFormInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();
};

const saveToDos = localStorage.getItem("todos");

if (saveToDos !== null) {
  const parsedToDos = JSON.parse(saveToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

todoForm.addEventListener("submit", todoHandle);
