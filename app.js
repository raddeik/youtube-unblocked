
// ELEMENTOS
const urlInput = document.getElementById("url");
const player = document.getElementById("player");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");

// HISTORIAL LOCAL
let history = JSON.parse(localStorage.getItem("history")) || [];

/* 🔍 EXTRAER ID DE YOUTUBE */
function getVideoId(url) {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);

    if (u.searchParams.get("v")) return u.searchParams.get("v");

  } catch (e) {}

  return null;
}

/* ▶ VER VIDEO */
function watchVideo() {
  const id = getVideoId(urlInput.value);

  if (!id) {
    alert("Invalid YouTube link");
    return;
  }

  const embed = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;

  player.src = embed;
  result.style.display = "block";

  saveHistory(urlInput.value, id);
  renderHistory();
}

/* 💾 GUARDAR HISTORIAL */
function saveHistory(url, id) {

  history.unshift({
    url,
    id,
    time: new Date().toLocaleString()
  });

  if (history.length > 20) history.pop();

  localStorage.setItem("history", JSON.stringify(history));
}

/* 📜 MOSTRAR HISTORIAL */
function renderHistory() {

  historyList.innerHTML = "";

  history.forEach(item => {

    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <b>${item.id}</b><br>
      <small>${item.time}</small>
    `;

    div.onclick = () => {
      player.src = `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1`;
      result.style.display = "block";
    };

    historyList.appendChild(div);
  });
}

/* 🗑 LIMPIAR HISTORIAL */
function clearHistory() {
  history = [];
  localStorage.removeItem("history");
  renderHistory();
}

/* INIT */
renderHistory();
