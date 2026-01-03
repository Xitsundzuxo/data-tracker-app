// ============================
// Data Tracker App - Full JS
// ============================

// Load remaining data on page load
document.addEventListener("DOMContentLoaded", () => {
  let totalData = localStorage.getItem("totalData");
  let usedSoFar = localStorage.getItem("usedSoFar");

  if (totalData && usedSoFar) {
    let remaining = totalData - usedSoFar;
    if (remaining < 0) remaining = 0;

    document.getElementById("result").innerText =
      `Remaining Data: ${remaining.toFixed(2)} GB`;
  }
});

// ============================
// Save Daily Usage ONLY
// ============================
function saveUsage() {
  let totalData = parseFloat(document.getElementById("totalData").value);
  let usedToday = parseFloat(document.getElementById("usedToday").value);

  if (!totalData || !usedToday) {
    alert("Please enter all values");
    return;
  }

  // Get previous usage
  let usedSoFar = localStorage.getItem("usedSoFar");
  usedSoFar = usedSoFar ? parseFloat(usedSoFar) : 0;

  usedSoFar += usedToday / 1024; // MB → GB
  localStorage.setItem("usedSoFar", usedSoFar.toFixed(2));
  localStorage.setItem("totalData", totalData);

  // Save history
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let today = new Date().toLocaleDateString();
  history.push({ date: today, usageMB: usedToday });
  localStorage.setItem("history", JSON.stringify(history));

  // Calculate remaining
  let remaining = totalData - usedSoFar;
  if (remaining < 0) remaining = 0;

  document.getElementById("result").innerText =
    `Remaining Data: ${remaining.toFixed(2)} GB`;

  // Alert when data finishes
  if (remaining <= 0) {
    alert("⚠️ You have used all your data!");
  }
}

// ============================
// Render History (NO saving here)
// ============================
function updateHistoryList() {
  let historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];

  if (history.length === 0) {
    historyList.innerHTML = "<li>No usage history yet</li>";
    return;
  }

  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date}: ${item.usageMB} MB`;
    historyList.appendChild(li);
  });
}

// ============================
// Toggle History View ONLY
// ============================
function toggleHistory() {
  let historyList = document.getElementById("historyList");

  if (historyList.style.display === "none" || historyList.style.display === "") {
    updateHistoryList(); // load history when opening
    historyList.style.display = "block";
  } else {
    historyList.style.display = "none";
  }
}

// ============================
// Reset Data Cycle
// ============================
function resetData() {
  if (confirm("Start a new data cycle? This will reset all data.")) {
    localStorage.removeItem("usedSoFar");
    localStorage.removeItem("history");

    document.getElementById("result").innerText =
      "New data cycle started. Enter today’s usage.";

    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    historyList.style.display = "none";
  }
}
