const schedules = [];

const dateInput = document.getElementById("date");
const titleInput = document.getElementById("title");
const list = document.getElementById("list");

function add() {
  const date = dateInput.value;
  const title = titleInput.value;

  if (!date || !title) {
    alert("日付と内容を入力してください");
    return;
  }

  schedules.push({
    date: date,
    title: title,
    status: "未完了"
  });

  dateInput.value = "";
  titleInput.value = "";
  render();
}

function render() {
  list.innerHTML = "";
  const today = new Date();
  today.setHours(0,0,0,0);

  schedules.sort((a,b) => new Date(a.date) - new Date(b.date));

  schedules.forEach((schedule, index) => {
    const target = new Date(schedule.date);
    target.setHours(0,0,0,0);

    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000*60*60*24));

    let notice = "";
    let rowClass = "";

    if (diff === 0) {
      notice = "本日の予定";
      rowClass = "today";
    } else if (diff < 0) {
      notice = "期限超過";
      rowClass = "over";
    }

    if (schedule.status === "完了") {
      rowClass = "completed";
    }

    const weekday = target.toLocaleDateString("ja-JP", { weekday: "short" });

    const tr = document.createElement("tr");
    tr.className = rowClass;

    tr.innerHTML = `
      <td>${schedule.date}</td>
      <td>${weekday}</td>
      <td>${schedule.title}</td>
      <td>${schedule.status}</td>
      <td>${diff}</td>
      <td>${notice}</td>
      <td>
        <button class="complete-btn" onclick="complete(${index})">完了</button>
        <button class="delete-btn" onclick="del(${index})">削除</button>
      </td>
    `;

    list.appendChild(tr);
  });
}

function complete(index) {
  schedules[index].status = "完了";
  render();
}

function del(index) {
  if (confirm("本当に削除しますか？")) {
    schedules.splice(index,1);
    render();
  }
}
