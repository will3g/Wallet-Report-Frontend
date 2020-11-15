const container = document.querySelector('#high-cryptos');

function convertBRLHighCryptos(value) {
	return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function convertDateToBrazilHighCryptos(date) {
	return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function formatDataHighCryptos(datetime) {
	return convertDateToBrazil(datetime.split('T')[0]);
}

function formatHourHighCryptos(datetime) {
	return datetime.split('T')[1];
}

function markupHighCryptos(name, slug, datetime, value) {
    return `
    <div class="sl-item">
        <div class="sl-left bg ${slug}"></div>
        <div class="sl-right">
            <div class="font-medium">${name}</div>
            <span class="sl-date">${formatDataHighCryptos(datetime)} ${formatHourHighCryptos(datetime)}</span>
            <div class="desc">${convertBRLHighCryptos(value)}</div>
        </div>
    </div>
    `;
}

Promise.all([
	fetch("https://localhost:5001/details/btc").then(res => res.json()),
	fetch("https://localhost:5001/details/eth").then(res => res.json()),
	fetch("https://localhost:5001/details/bch").then(res => res.json()),
	fetch("https://localhost:5001/details/dash").then(res => res.json()),
	fetch("https://localhost:5001/details/zec").then(res => res.json()),
	fetch("https://localhost:5001/details/xrp").then(res => res.json()),
]).then(res => {
    res.map((coin, index) => {
        if (coin.slice(-1)[0]) {
            container.innerHTML += markupHighCryptos(dict[index], coin.slice(-1)[0].slug, coin.slice(-1)[0].date, coin.slice(-1)[0].last);
        }
    });
});