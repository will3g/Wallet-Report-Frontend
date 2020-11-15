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

function convertBRL(value) {
	return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function convertDateToBrazil(date) {
	return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function formatData(date, value) {
	date = date.split('T');
	return {
		period: date[0],
		BTC: value
	}
}

function renderGraph(data) {
	return Morris.Area({
		element: 'morris-area-chart',
		data: data,
		xkey: 'period',
		ykeys: ['BTC'],
		labels: ['BTC'],
		pointSize: 0,
		fillOpacity: 0,
		pointStrokeColors: ['#f90'],
		behaveLikeLine: true,
		gridLineColor: '#f6f6f6',
		lineWidth: 1,
		hideHover: 'auto',
		lineColors: ['#f90'],
		resize: true
	});
}

fetch("https://localhost:5001/details/btc").then(res => res.json()).then(response => {
	const datas = [];

	response.map(coin => {
		datas.push(formatData(coin.date, coin.last));
	});

	renderGraph(datas);
});



/*

$(function () {
	"use strict";
	Morris.Area({
		element: 'morris-area-chart',
		data: [{
			period: '2010',
			BTC: 0,
			ETH: 0,
			XRP: 0
		}, {
			period: '2011',
			BTC: 130,
			ETH: 100,
			XRP: 80
		}, {
			period: '2012',
			BTC: 100,
			ETH: 60,
			XRP: 70
		}, {
			period: '2013',
			BTC: 210,
			ETH: 160,
			XRP: 140
		}, {
			period: '2014',
			BTC: 180,
			ETH: 150,
			XRP: 140
		}, {
			period: '2015',
			BTC: 120,
			ETH: 100,
			XRP: 80
		}],
		xkey: 'period',
		ykeys: ['BTC', 'ETH', 'XRP'],
		labels: ['BTC', 'ETH', 'XRP'],
		pointSize: 0,
		fillOpacity: 0,
		pointStrokeColors: ['#f90', '#009a13', '#00a1ff'],
		behaveLikeLine: true,
		gridLineColor: '#f6f6f6',
		lineWidth: 1,
		hideHover: 'auto',
		lineColors: ['#f90', '#009a13', '#00a1ff'],
		resize: true
	});

});

*/