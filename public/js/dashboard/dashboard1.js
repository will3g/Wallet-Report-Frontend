$(function() {
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