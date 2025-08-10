// Matrix Effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-bg').appendChild(canvas);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = Array(256).join("1").split("");
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    letters.map((y, index) => {
        const text = String.fromCharCode(3e4 + Math.random() * 33);
        const x = index * 10;
        ctx.fillText(text, x, y);
        letters[index] = (y > 758 + Math.random() * 1e4) ? 0 : y + 10;
    });
}
setInterval(drawMatrix, 33);

// API Lookup
function lookupNumber() {
    const num = document.getElementById("number").value.trim();
    const output = document.getElementById("output");

    if (!num) {
        output.textContent = "[ERROR] Please enter a number.";
        return;
    }

    output.textContent = "[INFO] Connecting to database...\n";

    fetch(`https://api.nexoracle.com/details/pak-sim-database-free?apikey=free_key@maher_apis&q=${num}`)
        .then(res => res.json())
        .then(data => {
            output.textContent += "[SUCCESS] Data Retrieved:\n\n";
            output.textContent += JSON.stringify(data, null, 2);
        })
        .catch(err => {
            output.textContent += `[ERROR] ${err.message}`;
        });
}
