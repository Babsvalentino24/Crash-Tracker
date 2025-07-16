function displayPrediction() {
  const prediction = document.getElementById("prediction");
  const last5 = multipliers.slice(-5);

  if (last5.length < 5) {
    prediction.textContent = "Enter more data for analysis...";
    return;
  }

  const lows = last5.filter(m => m < 2).length;
  const highs = last5.filter(m => m > 10).length;

  if (lows >= 4) {
    prediction.textContent = "⚠️ Possible spike soon (3x–8x)";
  } else if (last5.every(m => m > 2.5)) {
    prediction.textContent = "🔻 Risk of crash under 2x coming";
  } else if (highs >= 1 && lows >= 2) {
    prediction.textContent = "⚖️ Mixed pattern: be cautious.";
  } else {
    prediction.textContent = "⏳ No strong pattern detected.";
  }
}
