setTimeout((() => { 
    fetch("https://localhost:5001/api/coin/bch");
    fetch("https://localhost:5001/api/coin/brzx");
    fetch("https://localhost:5001/api/coin/btc");
    fetch("https://localhost:5001/api/coin/dai");
    fetch("https://localhost:5001/api/coin/dash");
    fetch("https://localhost:5001/api/coin/dcr");
    fetch("https://localhost:5001/api/coin/eth");
    fetch("https://localhost:5001/api/coin/ltc");
    fetch("https://localhost:5001/api/coin/omg");
    fetch("https://localhost:5001/api/coin/paxg");
    fetch("https://localhost:5001/api/coin/tusd");
    fetch("https://localhost:5001/api/coin/usdt");
    fetch("https://localhost:5001/api/coin/xrp");
    fetch("https://localhost:5001/api/coin/zec");
    fetch("https://localhost:5001/api/coin/zrx");
}), 300000 );

// 60000 // 1 minute
// 300000 // 5 minutes
// 36000000 // 10 hours