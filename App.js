// ============================
// Data Tracker App - Full JS
// ============================

// Show remaining data on page load
document.addEventListener("DOMContentLoaded", () => {
  let totalData = localStorage.getItem("totalData");
  let usedSoFar = localStorage.getItem("usedSoFar");

  if (totalData && usedSoFar) {
    let remaining = totalData - usedSoFar;
    if (remaining < 0) remaining = 0;
    document.getElementById("result").innerText =
      `Remaining Data: ${remaining.toFixed(2)} GB`;
  }

  // Ensure history is prepared
  updateHistoryList();
});

// ============================
// Save Daily Usage
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

  // Store daily usage history
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let today = new Date().toLocaleDateString();
  history.push({ date: today, usageMB: usedToday });
  localStorage.setItem("history", JSON.stringify(history));

  // Display remaining data
  let remaining = totalData - usedSoFar;
  if (remaining < 0) remaining = 0;
  document.getElementById("result").innerText =
    `Remaining Data: ${remaining.toFixed(2)} GB`;

  // Alert when remaining reaches 0
  if (remaining <= 0) {
    alert("⚠️ You have used all your data!");
  }

  // Update history (hidden by default)
  updateHistoryList();
}

// ============================
// Update History List (toggle visibility handled in HTML)
// ============================
function updateHistoryList() {
  let historyList = document.getElementById("historyList");
  if (!historyList) return;

  // Clear list first
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date}: ${item.usageMB} MB`;
    historyList.appendChild(li);
  });
}

// ============================
// Toggle History Visibility
// ============================
function toggleHistory() {
  let historyList = document.getElementById("historyList");
  if (!historyList) return;

  if (historyList.style.display === "none" || historyList.style.display === "") {
    historyList.style.display = "block";
  } else {
    historyList.style.display = "none";
  }
}

// ============================
// Reset Data Cycle
// ============================
function resetData() {
  if (confirm("Start a new data cycle? This will reset all used data and history.")) {
    localStorage.removeItem("usedSoFar");
    localStorage.removeItem("history");
    document.getElementById("result").innerText =
      "New data cycle started. Enter today’s usage.";

    // Clear
