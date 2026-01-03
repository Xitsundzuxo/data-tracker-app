// ============================
// Data Tracker App - Full JS
// ============================

// Show remaining data on page load and display history
document.addEventListener("DOMContentLoaded", () => {
  let totalData = localStorage.getItem("totalData");
  let usedSoFar = localStorage.getItem("usedSoFar");

  if (totalData && usedSoFar) {
    let remaining = totalData - usedSoFar;
    if (remaining < 0) remaining = 0;
    document.getElementById("result").innerText =
      `Remaining Data: ${remaining.toFixed(2)} GB`;
  }

  displayHistory(); // Prepare history (hidden by default)
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

  // Previous usage
  let usedSoFar = localStorage.getItem("usedSoFar");
  usedSoFar = usedSoFar ? parseFloat(usedSoFar) : 0;

  usedSoFar += usedToday / 1024; // Convert MB → GB
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

  // Alert if all data is used
  if (remaining <= 0) {
    alert("⚠️ You have used all your data!");
  }
}

// ============================
// Display History (click button to toggle)
// ============================
function displayHistory() {
  let historyList = document.getElementById("historyList");
  if (!historyList) return;

  // Toggle visibility
  historyList.style.display = historyList.style.display === "none" ? "block" : "none";

  let history = JSON.parse(localStorage.getItem("history")) || [];
  historyList.innerHTML = "";

  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date}: ${item.usageMB} MB`;
    historyList.appendChild(li);
  });
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

    let historyList = document.getElementById("historyList");
    if (historyList) historyList.innerHTML = "";
  }
}  }

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
  document.getElementById("result").innerText =
    `Remaining Data: ${remaining.toFixed(2)} GB`;

  // Display history
  displayHistory();
}

// Display history function
function displayHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let historyList = document.getElementById("historyList");
  historyList.innerHTML = ""; // Clear previous

  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date}: ${item.usageMB} MB`;
    historyList.appendChild(li);
  });
}

// Call on page load
document.addEventListener("DOMContentLoaded", () => {
  let totalData = localStorage.getItem("totalData");
  let usedSoFar = localStorage.getItem("usedSoFar");

  if (totalData && usedSoFar) {
    let remaining = totalData - usedSoFar;
    document.getElementById("result").innerText =
      `Remaining Data: ${remaining.toFixed(2)} GB`;
  }

  displayHistory();
});

// Reset data
function resetData() {
  if (confirm("Start a new data cycle? This will reset used data.")) {
    localStorage.removeItem("usedSoFar");
    localStorage.removeItem("history");
    document.getElementById("result").innerText =
      "New data cycle started. Enter today’s usage.";
    displayHistory();
  }
    }

// After calculating remaining
let remaining = totalData - usedSoFar;
document.getElementById("result").innerText =
  `Remaining Data: ${remaining.toFixed(2)} GB`;

// Check for low data
let threshold = totalData * 0.1; // 10% of total
if (remaining <= threshold) {
  alert("⚠️ Warning: Your data is below 10%!");
                }

// Low data warning
let thresholdMB = 50 / 1024; // 50MB → GB
if (remaining <= thresholdMB) {
  alert("⚠️ Warning: Your remaining data is below 50MB!");
    }
