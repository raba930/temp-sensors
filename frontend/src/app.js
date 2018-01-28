import Chart from 'chart.js';
import $ from 'jquery';

var Graph;
window.onload = function() {
    setInterval(function() {
        getData();
    }, 120000);
    getData(true);
}

function getData(firstRender) {
    $.ajax('/current')
        .done(function(res) {
            if (res.entries && res.entries.length) {
                var data = res.entries.sort(function (a, b) {
                    return new Date(a.created_at) - new Date(b.created_at);
                });
                if (firstRender) {
                    var ctx = document.getElementById("chart").getContext("2d");
                    Graph = new Chart(ctx, graphOptions(data));
                } else {
                    // Graph.dataProvider = data;
                    // Graph.validateData();
                }
                var entry = data[data.length - 1];
                var created_at = new Date(entry.created_at);
                $('#unutra span').text(entry.inside + ' °');
                $('#vani span').text(entry.outside + ' °');
                $('#vrijeme span').text(
                    created_at.getDate() + '.' +
                    (created_at.getMonth() + 1) + '.' +
                    created_at.getFullYear() + '.  ' +
                    created_at.getHours() +  ' : ' +
                    created_at.getMinutes()
                )
            }
        });
}

function graphOptions(data) {
    console.log('---', data.map(entry => ({
        x: entry.created_at,
        y: entry.inside
    })))
    return {
        labels: data.map(entry => entry.created_at),
        type: 'line',
        data: {
            datasets: [{
                label: "unutra",
                backgroundColor: 'green',
                borderColor: 'green',
                data: data.map(entry => ({
                    x: new Date(entry.created_at), 
                    y: entry.inside
                })),
                fill: false,
            }, {
                label: "vani",
                fill: false,
                backgroundColor: 'red',
                borderColor: 'red',
                data: data.map(entry => ({
                    x: new Date(entry.created_at),
                    y: entry.outside
                })),
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    distribution: 'series',
                    time: {
                        unit: 'minute'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    }
}