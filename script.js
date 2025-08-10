async function searchNumber() {
  let number = document.getElementById("numberInput").value.trim();
  if (!number) {
    alert("Please enter a number");
    return;
  }

  let resultsDiv = document.getElementById("results");
  resultsDiv.classList.remove("hidden");
  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    // Replace with your API URL
    let response = await fetch(`https://your-api-url.com/search?number=${number}`);
    let data = await response.json();

    // Hide "Meher" name if it comes
    if (data.owner && data.owner.toLowerCase() === "meher") {
      delete data.owner;
    }

    let html = "<table>";
    for (let key in data) {
      if (data[key] && data[key] !== "") {
        html += `<tr><td><strong>${capitalize(key)}</strong></td><td>${data[key]}</td></tr>`;
      }
    }
    html += "</table>";

    resultsDiv.innerHTML = html;

  } catch (error) {
    resultsDiv.innerHTML = "<p style='color:red;'>Error fetching data</p>";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
