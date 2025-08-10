const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultContainer = document.getElementById("resultContainer");

searchBtn.addEventListener("click", () => {
  const raw = searchInput.value.trim();
  if (!/^\d{10,11}$/.test(raw) && !/^\d{13}$/.test(raw)) {
    resultContainer.innerHTML = `<p style="color:red;">Please enter valid 10–11 digit mobile or 13-digit CNIC</p>`;
    resultContainer.classList.remove("hidden");
    return;
  }

  resultContainer.innerHTML = `<p>Loading...</p>`;
  resultContainer.classList.remove("hidden");

  const query = raw.startsWith("0") && raw.length === 11 ? raw.substring(1) : raw; // format for API
  const apiURL = `https://api.nexoracle.com/details/pak-sim-database-free?apikey=free_key@maher_apis&q=${encodeURIComponent(query)}`;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.result || (typeof data.result === "string" && data.result.toLowerCase().includes("no sim"))) {
        resultContainer.innerHTML = `<p style="color:red;">No data found for the entered number/CNIC</p>`;
        return;
      }

      let items = Array.isArray(data.result) ? data.result : [data.result];

      let html = `<table class="result-table">
        <tr><th>Field</th><th>Value</th></tr>`;
      items.forEach(item => {
        for (let key in item) {
          if (key.toLowerCase() === "owner" && item[key].toLowerCase().includes("meher")) {
            html += `<tr><td>${capitalize(key)}</td><td>Ayan Ahmad</td></tr>`;
          } else {
            html += `<tr><td>${capitalize(key)}</td><td>${item[key] ?? ""}</td></tr>`;
          }
        }
        html += `<tr><td colspan="2"><hr></td></tr>`;
      });
      html += `</table>`;
      resultContainer.innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      resultContainer.innerHTML = `<p style="color:red;">Error fetching data</p>`;
    });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
