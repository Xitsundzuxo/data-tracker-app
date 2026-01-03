function saveUsage() {
  let totalData = parseFloat(document.getElementById("totalData").value);
  let usedToday = parseFloat(document.getElementById("usedToday").value);

  if (!totalData || !usedToday) {
    alert("Please enter all values");
    return;
  }

  let usedSoFar = localStorage.getItem("usedSoFar");
  usedSoFar = usedSoFar ? parseFloat(usedSoFar) : 0;

  usedSoFar += usedToday / 1024; // MB to GB
  localStorage.setItem("usedSoFar", usedSoFar.toFixed(2));
  localStorage.setItem("totalData", totalData);

  let remaining = totalData - usedSoFar;
  document.getElementById("result").innerText =
    `Remaining Data: ${remaining.toFixed(2)} GB`;
                       }

function resetData() {
  if (confirm("Start a new data cycle? This will reset used data.")) {
    localStorage.removeItem("usedSoFar");
    document.getElementById("result").innerText =
      "New data cycle started. Enter today’s usage.";
  }
}

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
