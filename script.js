const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const output = document.getElementById("output");
const toggle = document.getElementById("darkToggle");

// Dark mode toggle
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Start camera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    video.srcObject = stream;
    output.innerText = "Place finger on camera for HR detection...";
    processFrames();
  } catch (err) {
    try {
      // fallback to any camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      output.innerText = "Place finger on camera for HR detection...";
      processFrames();
    } catch (err2) {
      output.innerText = "Camera access denied or not supported.";
    }
  }
}

// Fake processing (simulate BP & HR check)
function processFrames() {
  setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Simulation values
    let hr = Math.floor(70 + Math.random() * 20);
    let bpSys = Math.floor(110 + Math.random() * 15);
    let bpDia = Math.floor(70 + Math.random() * 10);
    output.innerText = `❤️ HR: ${hr} bpm | BP: ${bpSys}/${bpDia} mmHg`;
  }, 3000);
}

startCamera();
