
let multipliers = JSON.parse(localStorage.getItem('multipliers')) || [];

function logMultiplier() {
  const input = document.getElementById("multiplierInput");
  const value = parseFloat(input.value);

  if (!value || value <= 0) {
    alert("Enter a valid multiplier!");
    return;
  }

  multipliers.push(value);
  if (multipliers.length > 100) multipliers.shift(); // keep recent 100
  localStorage.setItem("multipliers", JSON.stringify(multipliers));

  input.value = "";
  updateDisplay();
}

function updateDisplay() {
  displayHistory();
  displayPrediction();
}

function displayHistory() {
  const history = document.getElementById("history");
  const recent = multipliers.slice(-10).reverse();
  history.innerHTML = recent.map(m => `<li>${m.toFixed(2)}x</li>`).join("");
}

function displayPrediction() {
  const prediction = document.getElementById("prediction");
  const last5 = multipliers.slice(-5);

  if (last5.length < 5) {
    prediction.textContent = "Enter more data for analysis...";
    return;
  }

  const lows = last5.filter(m => m < 2).length;

  if (lows >= 4) {
    prediction.textContent = "⚠️ Possible spike soon (3x–8x)";
  } else if (last5.every(m => m > 2.5)) {
    prediction.textContent = "🔻 Risk of crash under 2x coming";
  } else {
    prediction.textContent = "⏳ No strong pattern detected.";
  }
}

// Load on startup
updateDisplay();
