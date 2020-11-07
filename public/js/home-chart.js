let graphContent;
let attributesCoin = [];
let graphsComponent = '';
const li = document.querySelector('.section-five-graphs-container');

let coins = [];

			//[posição, valor]	
			// data: [
			// 	[1, 500],
			// 	[2, 600],
			// 	[3, 800],
			// 	[4, 750],
			// 	[5, 600],
			// 	[6, 900],
			// 	[7, 700],
			// 	[8, 950],
			// 	[9, 830],
			// 	[10, 1000]
			// ],

function buildData(multArray, coin, index1) {
	for (let index2 = 0; index2 < 2; index2++)
		if (index2 == 0)
			multArray[index1][index2] = index1;
		else
			multArray[index1][index2] = coin.last;
}

function graphData(data, index) {
	return [
		{
			data: data[index].childrens,
			color: '#ffa500',
			points: { radius: 1, fillColor: '#ffa500' }
		}
	];
}

function lineGraph(graphData, index) {
	$.plot($(`.graph-lines-${index}`), graphData, {
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
}

function showTooltip(x, y, contents) {
	$('<div id="tooltip">' + contents + '</div>').css({
		top: y,
		left: x,
		paddingBottom: 25,
	}).appendTo('body').fadeIn();
}

function tooltip(index) {
	var previousPoint = null;
	$(`.graph-lines-${index}`).bind('plothover', function (event, pos, item) {
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;
				$('#tooltip').remove();
				item.datapoint[0], y = item.datapoint[1];
				showTooltip(item.pageX, item.pageY, y.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
			}
		} else {
			$('#tooltip').remove();
			previousPoint = null;
		}
	});
}

function renderGraph(data) {

	const graph1 = graphData(data, 0);
	const graph2 = graphData(data, 1);
	const graph3 = graphData(data, 2);
	const graph4 = graphData(data, 3);
	const graph5 = graphData(data, 4);
	const graph6 = graphData(data, 5);

	lineGraph(graph1, 0);
	lineGraph(graph2, 1);
	lineGraph(graph3, 2);
	lineGraph(graph4, 3);
	lineGraph(graph5, 4);
	lineGraph(graph6, 5);

	tooltip(0);
	tooltip(1);
	tooltip(2);
	tooltip(3);
	tooltip(4);
	tooltip(5);
}

function markupGraph(last, img, nameCoin, slug, index) {
	li.innerHTML += `
		<div class="container-details-coin-${index}">
			<header>
				<img src="${img}" alt="">
				<div>
					<h3>${nameCoin}</h3>
					<p>${slug}</p>
				</div>
			</header>
			<div id="graph-wrapper">
				<div class="graph-container">
					<div class="graph-lines-${index}"></div>
				</div>
			</div>
			<div class="info-coin">
				<p>R$ ${last}</p>
			</div>
		</div>`;
}

function buildGraph(response, name, img, index) {
	let coin = {
		name: '',
		slug: '',
		img: '',
		last: '',
		childrens: []
	};

	let attributes = Array.from(Array(response.length), () => new Array(2));

	response.map((item, index) => {
		coin["slug"] = item['slug'].toUpperCase();
		coin["last"] = item['last'].toLocaleString('pt-br', { minimumFractionDigits: 2 });
		let last = buildData(attributes, item, index);
		if (last != undefined) {
			attributes.push(last)
		}
	});

	coin["img"] = img;
	coin["name"] = name;
	coin["childrens"] = attributes;

	markupGraph(coin["last"], coin["img"], coin["name"], coin["slug"], index)
	attributesCoin.push(coin);
	coins.push(attributesCoin);
}

Promise.all([
	fetch("https://localhost:5001/details/BTC").then(res => res.json()),
	fetch("https://localhost:5001/details/XRP").then(res => res.json()),
	fetch("https://localhost:5001/details/ETH").then(res => res.json()),
	fetch("https://localhost:5001/details/LTC").then(res => res.json()),
	fetch("https://localhost:5001/details/ZEC").then(res => res.json()),
	fetch("https://localhost:5001/details/DASH").then(res => res.json()),
]).then((res) => {
	const names = ['Bitcoin', 'Ripple', 'Ethereum', 'Litecoin', 'Zcash', 'Dash'];
	const images = ['../assets/icons/coins/btc.png', '../assets/icons/coins/xrp.png', '../assets/icons/coins/eth.png', '../assets/icons/coins/ltc.png', '../assets/icons/coins/zec.png', '../assets/icons/coins/dash-home.svg'];
	
	res.map((item, index) => {
		// console.log(item);
		buildGraph(item, names[index], images[index], index);
	});

	renderGraph(attributesCoin);
})