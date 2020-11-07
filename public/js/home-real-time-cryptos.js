function setPrice(response, coin) {
    let element = document.querySelector(`[data-coin=${coin}]`);
    let price = element.querySelector('.price');
    price.textContent = response.slice(-1)[0].last.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    if (response.slice(-1)[0].last < response.slice(-2)[0].last) {
        price.classList.remove('glow-up');
        price.classList.add('glow-down');
    } else {
        price.classList.remove('glow-down');
        price.classList.add('glow-up');
    }
}

fetch("https://localhost:5001/details/btc").then(res => res.json()).then(res => {
    setPrice(res, 'BTC');
});

fetch("https://localhost:5001/details/xrp").then(res => res.json()).then(res => {
    setPrice(res, 'XRP');
});

fetch("https://localhost:5001/details/eth").then(res => res.json()).then(res => {
    setPrice(res, 'ETH');
});

fetch("https://localhost:5001/details/ltc").then(res => res.json()).then(res => {
    setPrice(res, 'LTC');
});

fetch("https://localhost:5001/details/bch").then(res => res.json()).then(res => {
    setPrice(res, 'BCH');
});