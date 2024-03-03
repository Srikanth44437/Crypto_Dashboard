let data = [];

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
).then(response => {
    if (!response.ok) {
      throw new Error("Nework response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem in fetch operation:", error);
  });


async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
      { method: "GET" }
    );
    data = await response.json();
    console.log(data);
    renderTable(data);
  } 
  catch (error) {
    console.error("Error:", error);
  }
}

fetchData();

function renderTable(data) {
  const tb = document.getElementById("tb");
  tb.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    const PriceChangePercentage = item.price_change_percentage_24h;
    const PriceChangeClass =
      PriceChangePercentage >= 0 ? "positive-color" : "negative-color";

    row.innerHTML = `
    <td>
    <div class="items">
    <img src="${item.image}" alt="${item.name}" width="20"/>
    <p>${item.name}</p>
    </div>
    </td>
    <td>${item.symbol}</td>
    <td>${item.id}</td>
    <td>${"$" + item.current_price}</td>
    <td class="${PriceChangeClass}">${item.price_change_percentage_24h}</td>
    <td>${"MKT cap: $" + item.total_volume}</td>
    `;
    tb.appendChild(row);
  });
}

const searchfunc = document.getElementById("search_input");

searchfunc.addEventListener("keyup", () => {
  const searchTrim = document
    .getElementById("search_input")
    .value.trim()
    .toLowerCase();
  if (searchTrim == "") {
    renderTable(data);
    return;
  }
  const filteredData = data.filter((item) => {
    const itemName = item.name.toLowerCase();
    const itemSymbol = item.symbol.toLowerCase();
    return itemName.includes(searchTrim) || itemSymbol.includes(searchTrim);
  });
  renderTable(filteredData);
});

const sortMKTcap = document.getElementById("sortMKTcap");

sortMKTcap.addEventListener("click", () => {
  data.sort((a, b) => b.total_volume - a.total_volume);
  renderTable(data);
});

const sortPercentage = document.getElementById("sortPercentage");

sortPercentage.addEventListener("click", () => {
  data.sort(
    (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
  );
  renderTable(data);
});
