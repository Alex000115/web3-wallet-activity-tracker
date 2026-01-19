async function loadWalletData() {
  const wallet = document.getElementById("walletInput").value;

  if (!wallet) {
    alert("Please enter a wallet address");
    return;
  }

  loadBalance(wallet);
  loadTransactions(wallet);
}

async function loadBalance(wallet) {
  const url = `${API_BASE}?module=account&action=balance&address=${wallet}&tag=latest&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  const ethBalance = data.result / 1000000000000000000;

  document.getElementById("balanceBox").innerHTML =
    `<h3>Balance</h3><p>${ethBalance} ETH</p>`;
}

async function loadTransactions(wallet) {
  const url = `${API_BASE}?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  let html = "<h3>Recent Transactions</h3>";

  data.result.slice(0, 5).forEach(tx => {
    html += `<p>${tx.hash.substring(0, 20)}...</p>`;
  });

  document.getElementById("txBox").innerHTML = html;
}
