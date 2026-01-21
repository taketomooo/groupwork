let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

function addSchedule() {
  const date = dateInput().value;
  const start = startInput().value;
  const end = endInput().value;
  const title = titleInput().value;
  const memo = memoInput().value;

  if (!date || !title || !start || !end) {
    alert("未入力項目があります");
    return;
  }

  schedules.push({ date, start, end, title, memo });
  save();
  clearForm();
  display();
}

function deleteSchedule(index) {
  schedules.splice(index, 1);
  save();
  display();
}

function display() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  schedules.forEach((s, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${s.date}</strong><br>
      ${s.start} ～ ${s.end}<br>
      ${s.title}<br>
      ${s.memo}<br>
      <button class="delete" onclick="deleteSchedule(${i})">削除</button>
    `;
    list.appendChild(li);
  });
}

function save() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

function clearForm() {
  dateInput().value = "";
  startInput().value = "";
  endInput().value = "";
  titleInput().value = "";
  memoInput().value = "";
}

const dateInput = () => document.getElementById("date");
const startInput = () => document.getElementById("start");
const endInput = () => document.getElementById("end");
const titleInput = () => document.getElementById("title");
const memoInput = () => document.getElementById("memo");

display();
