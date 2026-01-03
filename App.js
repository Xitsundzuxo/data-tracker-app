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
