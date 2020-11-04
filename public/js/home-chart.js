const infoCoins = [
	{
		id: 1,
		slug: 'BTC',
		last: 72360,
		max: 73694.88,
		min: 69000,
		buy: 72360,
		sell: 72549.87,
		open: 71800,
		vol: 16.54220449,
		trade: 16.54220449,
		trades: 939,
		vwap: 72034.276974411,
		money: '73.002,40',
		img: '../assets/icons/coins/btc.png'
	},
	{
		id: 2,
		slug: 'LTC',
		last: 72360,
		max: 73694.88,
		min: 69000,
		buy: 72360,
		sell: 72549.87,
		open: 71800,
		vol: 16.54220449,
		trade: 16.54220449,
		trades: 939,
		vwap: 72034.276974411,
		money: '333,03',
		img: '../assets/icons/coins/ltc.png'
	},
	{
		id: 3,
		slug: 'DCR',
		last: 72360,
		max: 73694.88,
		min: 69000,
		buy: 72360,
		sell: 72549.87,
		open: 71800,
		vol: 16.54220449,
		trade: 16.54220449,
		trades: 939,
		vwap: 72034.276974411,
		money: '2.300,00',
		img: '../assets/icons/coins/dcr.png'
	},
	{
		id: 4,
		slug: 'DASH',
		last: 72360,
		max: 73694.88,
		min: 69000,
		buy: 72360,
		sell: 72549.87,
		open: 71800,
		vol: 16.54220449,
		trade: 16.54220449,
		trades: 939,
		vwap: 72034.276974411,
		money: '435,49',
		img: '../assets/icons/coins/dash.png'
	},
	{
		id: 5,
		slug: 'XRP',
		last: 72360,
		max: 73694.88,
		min: 69000,
		buy: 72360,
		sell: 72549.87,
		open: 71800,
		vol: 16.54220449,
		trade: 16.54220449,
		trades: 939,
		vwap: 72034.276974411,
		money: '1,43',
		img: '../assets/icons/coins/xrp.png'
	},
	{
		id: 5,
		slug: 'XRM',
		last: 72360,
		max: 73694.88,
		min: 69000,
		buy: 72360,
		sell: 72549.87,
		open: 71800,
		vol: 16.54220449,
		trade: 16.54220449,
		trades: 939,
		vwap: 72034.276974411,
		money: '1.519,09',
		img: '../assets/icons/coins/xrm.png'
	}
]

const nameCoin = [
	{'BTC': 'Bitcoin'},
	{'LTC': 'Litcoin'},
	{'DCR': 'Decred'},
	{'DASH': 'Dash'},
	{'XRP': 'Ripple'},
	{'XRM': 'Monero'}
]

let graphsComponent = '';

function searchCoinName(index, slug) {
	if (Object.keys(nameCoin[index]) == slug) {
		return Object.values(nameCoin[index]);
	}
}

$(document).ready(function () {

	var lista = document.querySelector('.section-five-graphs-container');

	infoCoins.forEach((item, index) => {
		lista.innerHTML += `
		<div class="container-details-coin-${index}">
			<header>
				<img src="${item.img}" alt="">
				<div>
					<h3>${searchCoinName(index, item.slug)}</h3>
					<p>${item.slug}</p>
				</div>
			</header>
			<div id="graph-wrapper">
				<div class="graph-container">
					<div class="graph-lines-${index}"></div>
				</div>
			</div>
			<div class="info-coin">
				<p>R$ ${item.money}</p>
			</div>
		</div>`;
	});

	for (let i = 0; i <= infoCoins.length; i++) {
		// Graph Data ##############################################
		var graphData = [
			{
				// [posição, valor]
				data: [
					[1, 500],
					[2, 600],
					[3, 800],
					[4, 750],
					[5, 600],
					[6, 900],
					[7, 700],
					[8, 950],
					[9, 830],
					[10, 1000]
				],
				color: '#ffa500',
				points: { radius: 1, fillColor: '#ffa500' }
			}
		];

		// Lines Graph #############################################
		$.plot($(`.graph-lines-${i}`), graphData, {
			series: {
				points: {
					show: false,
					radius: 5
				},
				lines: {
					show: true
				},
				shadowSize: 0
			},
			grid: {
				color: 'transparent',
				borderColor: 'transparent',
				borderWidth: -1000000000,
				hoverable: true
			},
			xaxis: {
				tickColor: 'transparent',
				tickDecimals: 2,
				backgroundColor: '#555555'
			},
			yaxis: {
				tickSize: 1,
				backgroundColor: '#555555'
			}
		});

		// Tooltip #################################################
		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css({
				top: y,
				left: x,
				paddingBottom: 25,
			}).appendTo('body').fadeIn();
		}

		var previousPoint = null;

		$(`.graph-lines-${i}`).bind('plothover', function (event, pos, item) {
			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;
					$('#tooltip').remove();
					var x = item.datapoint[0], y = item.datapoint[1];
					showTooltip(item.pageX, item.pageY, y);
				}
			} else {
				$('#tooltip').remove();
				previousPoint = null;
			}
		});
	}
});