const chart = document.querySelector('#morris-area-chart');
const containerSelectCoin = document.querySelector('#select-coin');
const headerSelectCoin = document.querySelector('#header-select-coin');

const dict = [
	'Bitcoin (BTC)',
	'Ethereum (ETH)',
	'Bitcoin Cash (BCH)',
	'Dash (DASH)',
	'Zcash (ZEC)',
	'Ripple (XRP)',
	'Brasiliex (BRZX)',
	'DAI (DAI)',
	'Decred (DCR)',
	'Litecoin (LTC)',
	'Network (OMG)',
	'Gold paxg (PAXG)',
	'TrueUSD (TUSD)',
	'Tether (USDT)',
	'0x (ZRX)'
];

const dictionaryToCoins = [
	{
		slug: 'bch',
		name: 'Bitcoin Cash',
		img: '../assets/icons/coins/bch2.png',
		color: '#8dc351'
	},
	{
		slug: 'brzx',
		name: 'Brasiliex',
		img: '../assets/icons/coins/brzx.png',
		color: '#14c8e1'
	},
	{
		slug: 'btc',
		name: 'Bitcoin',
		img: '../assets/icons/coins/btc.png',
		color: '#f90'
	},
	{
		slug: 'dai',
		name: 'Dai',
		img: '../assets/icons/coins/dai.png',
		color: '#fbc349'
	},
	{
		slug: 'dash',
		name: 'Dash',
		img: '../assets/icons/coins/dash-home.svg',
		color: '#2573c2'
	},
	{
		slug: 'dcr',
		name: 'Decred',
		img: '../assets/icons/coins/dcr.png',
		color: '#74dcb6'
	},
	{
		slug: 'eth',
		name: 'Ethereum',
		img: '../assets/icons/coins/eth.png',
		color: '#7a00ff'
	},
	{
		slug: 'ltc',
		name: 'Litcoin',
		img: '../assets/icons/coins/ltc.png',
		color: '#979797'
	},
	{
		slug: 'omg',
		name: 'OMG Network',
		img: '../assets/icons/coins/omg.png',
		color: '#1a53f0'
	},
	{
		slug: 'paxg',
		name: 'Pax Gold',
		img: '../assets/icons/coins/paxg.png',
		color: '#ede70a'
	},
	{
		slug: 'tusd',
		name: 'TrueUSD',
		img: '../assets/icons/coins/tusd.png',
		color: '#139ab9'
	},
	{
		slug: 'usdt',
		name: 'Tether',
		img: '../assets/icons/coins/usdt.png',
		color: '#53ae94'
	},
	{
		slug: 'xrp',
		name: 'Ripple',
		img: '../assets/icons/coins/xrp-home.png',
		color: '#4fc1f6'
	},
	{
		slug: 'zec',
		name: 'Zcash',
		img: '../assets/icons/coins/zec.png',
		color: '#ecb244'
	},
	{
		slug: 'zrx',
		name: '0x',
		img: '../assets/icons/coins/zrx.png',
		color: '#000000'
	}
]

function convertValueToBRL(value) {
	return value.toLocaleString('pt-br', { minimumFractionDigits: 6 });
}

function convertDateToBrazil(date) {
	return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function formatData(slug, date, value) {
	date = date.split('T');

	let dataToChart = {
		period: date[0]
	}
	
	dataToChart[`${slug.toUpperCase()}`] = value;
	return dataToChart;
}

function renderChart(slug, data, color) {
	return Morris.Area({
		element: 'morris-area-chart',
		data: data,
		xkey: 'period',
		ykeys: [`${slug.toUpperCase()}`],
		labels: [`${slug.toUpperCase()}`],
		pointSize: 3,
		fillOpacity: 0.5,
		pointStrokeColors: [`${color}`],
		behaveLikeLine: true,
		gridLineColor: '#f6f6f6',
		lineWidth: 4,
		hideHover: 'auto',
		preUnits: "R$ ",
		lineColors: [`${color}`],
		resize: true
	});
}

function renderHeaderSelectCoin(slug, color) {
	return `<li><i class="fa fa-circle" style="color: ${color};"></i> ${slug.toUpperCase()}</li>`;
}

function renderSelectCoin(slug, path) {
	return `<button id="button-${slug}"><img src="${path}" alt="${slug}"></button>`;
}

function buildSelectCoins() {
	dictionaryToCoins.map(coin => {
		containerSelectCoin.innerHTML += renderSelectCoin(coin.slug, coin.img);
	});
}

function getDataToChart(slugCoin = 'btc', color = '#f90') {
	fetch(`https://localhost:5001/details/${slugCoin}`).then(res => res.json()).then(response => {
		const datas = [];
		headerSelectCoin.innerHTML = renderHeaderSelectCoin(slugCoin, color);
		console.log(color);
		response.map(coin => {
			datas.push(formatData(slugCoin, coin.date, coin.last));
		});

		chart.innerHTML = '';
		renderChart(slugCoin, datas, color);
	});
}

function selectCoin() {
	dictionaryToCoins.map(coin => {
		let tagButton = document.querySelector(`#button-${coin.slug}`);
		tagButton.addEventListener('click', e => {
			e.preventDefault();
			getDataToChart(coin.slug, coin.color)
		});
	});
}

(() => {
	getDataToChart();
	buildSelectCoins();
	selectCoin();
})();