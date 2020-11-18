const dictionaryToCoins = [
	{
		slug: 'bch',
		name: 'Bitcoin Cash',
		img: '../assets/icons/coins/bch2.png'
	},
	{
		slug: 'brzx',
		name: 'Brasiliex',
		img: '../assets/icons/coins/brzx.png'
	},
	{
		slug: 'btc',
		name: 'Bitcoin',
		img: '../assets/icons/coins/btc.png'
	},
	{
		slug: 'dai',
		name: 'Dai',
		img: '../assets/icons/coins/dai.png'
	},
	{
		slug: 'dash',
		name: 'Dash',
		img: '../assets/icons/coins/dash-home.svg'
	},
	{
		slug: 'dcr',
		name: 'Decred',
		img: '../assets/icons/coins/dcr.png'
	},
	{
		slug: 'eth',
		name: 'Ethereum',
		img: '../assets/icons/coins/eth.png'
	},
	{
		slug: 'ltc',
		name: 'Litcoin',
		img: '../assets/icons/coins/ltc.png'
	},
	{
		slug: 'omg',
		name: 'OMG Network',
		img: '../assets/icons/coins/omg.png'
	},
	{
		slug: 'paxg',
		name: 'Pax Gold',
		img: '../assets/icons/coins/paxg.png'
	},
	{
		slug: 'tusd',
		name: 'TrueUSD',
		img: '../assets/icons/coins/tusd.png'
	},
	{
		slug: 'usdt',
		name: 'Tether',
		img: '../assets/icons/coins/usdt.png'
	},
	{
		slug: 'xrp',
		name: 'Ripple',
		img: '../assets/icons/coins/xrp-home.png'
	},
	{
		slug: 'zec',
		name: 'Zcash',
		img: '../assets/icons/coins/zec.png'
	},
	{
		slug: 'zrx',
		name: '0x',
		img: '../assets/icons/coins/zrx.png'
	}
]

const table = document.querySelector('tbody');
const input = document.querySelector('#input-search-coin');
const button = document.querySelector('#btn-search-coin');

let Coin = 'btc';

function makup(name, date, hour, percent, volume, lowest, highest, value, logo, style) {
	return `
    <tr>
		<div>
			<td class="txt-oflo">
				<img src="${logo}" alt="${name}">
				${name}
			</td>
			<td class="txt-oflo">${date}</td>
			<td class="txt-oflo">${hour}</td>
			<td class="txt-oflo ${style}">${percent}</td>
			<td class="txt-oflo">${volume}</td>
			<td class="txt-oflo">${lowest}</td>
			<td class="txt-oflo">${highest}</td>
			<td><span class="${style}">${value}</span></td>
		</div>
    </tr>
    `;
}

function transformToPercent(percentValue) {
    return Math.floor(percentValue * 100).toFixed(2) + '%';
}

function convertBRL(value) {
	return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function convertDateToBrazil(date) {
	return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function comparePercentValue(PercentValue, LastPercentValue) {
	if (PercentValue >= LastPercentValue)
		return 'text-success';
	else
		return 'text-danger';
}

function checkInputValue(inputCoin) {

	let InfoDictCoin = '';
	inputCoin = inputCoin.toLowerCase();

	dictionaryToCoins.map(coin => {
		let name = coin.name.toLowerCase()
		if ((coin.slug == inputCoin) || (name == inputCoin))
			InfoDictCoin = coin;
	});

	return InfoDictCoin;
}

function getCoin(slug, name, img) {
	fetch(`https://localhost:5001/details/${slug}`).then(res => res.json()).then(response => {
		let LastPercentValue = 0;

		table.innerHTML = '';

		response = response.reverse();

		response.map(coin => {

			const DateTime = coin.date.split('T');
			let Date = convertDateToBrazil(DateTime[0]);
			let Hour = DateTime[1];
			let Percent = transformToPercent(coin.percentChange);
			let Volume = convertBRL(coin.quoteVolume);
			let lowest = convertBRL(coin.lowestAsk24);
			let highest = convertBRL(coin.highestBid24);
			let Value = convertBRL(coin.last);

			const Compare = comparePercentValue(coin.percentChange, LastPercentValue);

			table.innerHTML += makup(name, Date, Hour, Percent, Volume, lowest, highest, Value, img, Compare);

			LastPercentValue = coin.percentChange;
		})
	})
	.catch(() => {
		alert('Moeda não encontrada no sistema.');
	});;
}

// Init
window.document.onload = (() => {
	getCoin('btc', 'Bitcoin', '../assets/icons/coins/btc.png');
})();

// Search
button.addEventListener('click', e => {
	e.preventDefault();
	const infoCoin = checkInputValue(input.value)
	getCoin(infoCoin.slug, infoCoin.name, infoCoin.img);
});

input.addEventListener('keyup', e => {
	e.preventDefault();
	if (e.keyCode === 13) {
		const infoCoin = checkInputValue(input.value)
		getCoin(infoCoin.slug, infoCoin.name, infoCoin.img);
	}
});
