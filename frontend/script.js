async function checkPrice() {
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const price = Number(document.getElementById("price").value);
  const res = await fetch("http://localhost:3000/check-price", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ origin, destination, price })
  });
  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}