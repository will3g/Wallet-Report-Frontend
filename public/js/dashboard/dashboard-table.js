const containerDashboardTable = document.querySelector('#dashboard-table');

function convertBRLDashboardTable(value) {
	return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function convertDateToBrazilDashboardTable(date) {
	return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function formatDataDashboardTable(datetime) {
	return convertDateToBrazil(datetime.split('T')[0]);
}

function transformToPercent(percentValue) {
    return Math.floor(percentValue * 100).toFixed(2) + '%';
}



function markupDashboardTable(name, slug, datetime, volume, percent, value) {
    return `
    <tr>
        <td class="txt-oflo sl-left bg ${slug}" 
            style="background-position: left; background-origin: content-box; color: #000 !important;">
            <p style="margin: 0 0 0 30px; padding: 0;">${name}</p>
        </td>
        <td class="txt-oflo">${formatDataDashboardTable(datetime)}</td>
        <td class="txt-oflo">${convertBRLDashboardTable(volume)}</td>
        <td class="txt-oflo">${transformToPercent(percent)}</td>
        <td>${convertBRLDashboardTable(value)}</td>
    </tr>
    `;
}

Promise.all([
	fetch("https://localhost:5001/details/btc").then(res => res.json()),
	fetch("https://localhost:5001/details/eth").then(res => res.json()),
	fetch("https://localhost:5001/details/bch").then(res => res.json()),
	fetch("https://localhost:5001/details/dash").then(res => res.json()),
	fetch("https://localhost:5001/details/zec").then(res => res.json()),
    fetch("https://localhost:5001/details/xrp").then(res => res.json()),
    fetch("https://localhost:5001/details/brzx").then(res => res.json()),
    fetch("https://localhost:5001/details/dai").then(res => res.json()),
    fetch("https://localhost:5001/details/dcr").then(res => res.json()),
    fetch("https://localhost:5001/details/ltc").then(res => res.json()),
    fetch("https://localhost:5001/details/omg").then(res => res.json()),
    fetch("https://localhost:5001/details/paxg").then(res => res.json()),
    fetch("https://localhost:5001/details/tusd").then(res => res.json()),
    fetch("https://localhost:5001/details/usdt").then(res => res.json()),
    fetch("https://localhost:5001/details/zrx").then(res => res.json()),
]).then(res => {

    res.map((coin, index) => {

        const getLastData = coin.slice(-1)[0];

        if (getLastData) {
            containerDashboardTable.innerHTML += markupDashboardTable(
                getLastData.slug.toUpperCase(), 
                getLastData.slug,
                getLastData.date, 
                getLastData.quoteVolume,
                getLastData.percentChange,
                getLastData.last
            );
        }
    });
});