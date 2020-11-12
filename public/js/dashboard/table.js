const dictionaryToCoins = [
	{
		slug: 'bch',
		name: 'Bitcoin Cash',
		img: '../assets/icons/coins/bch.png'
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
		img: '../assets/icons/coins/ech.png'
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
		img: '../assets/icons/coins/xrp.png'
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

function makup(name, date, hour, value, logo, style) {
	return `
    <tr>
		<div>
			<td class="txt-oflo">
				<img src="${logo}" alt="${name}">
				${name}
			</td>
			<td class="txt-oflo">${date}</td>
			<td class="txt-oflo">${hour}</td>
			<td><span class="${style}">${value}</span></td>
		</div>
    </tr>
    `;
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

function getCoin(slug = 'btc', name = 'Bitcoin', img = '../assets/icons/coins/btc.png') {
	fetch(`https://localhost:5001/details/${slug}`).then(res => res.json()).then(response => {

		let LastPercentValue = 0;

		table.innerHTML = '';

		response.map(coin => {

			const DateTime = coin.date.split('T');
			let Date = convertDateToBrazil(DateTime[0]);
			let Hour = DateTime[1];
			let Value = convertBRL(coin.last);

			const Compare = comparePercentValue(coin.percentChange, LastPercentValue);

			table.innerHTML += makup(name, Date, Hour, Value, img, Compare);

			LastPercentValue = coin.percentChange;
		})
	});
}

// Init
window.document.onload = (() => {
	getCoin();
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
