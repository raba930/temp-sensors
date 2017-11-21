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
                if (firstRender) {
                    Graph = AmCharts.makeChart("chart", graphOptions(res.entries));
                } else {
                    Graph.dataProvider = res.entries;
                }
                $('#unutra span').text(res.entries[0].inside + ' °');
                $('#vani span').text(res.entries[0].outside + ' °');
            }
        });
}

function graphOptions(data) {
    return {
        'type': 'serial',
        'theme': 'light',
        'autoMarginOffset': 20,
        'addClassNames': true,
        'dataDateFormat': 'YYYY-MM-DD HH:NN',
        'dataProvider': data,
        'valueAxes': [{
            'axisAlpha': 0,
            'position': 'left',
            'tickLength': 0
        }],
        'graphs': [{
            'balloonText': '[[category]]<br><b><span style="font-size:14px;">temp: [[value]]°</span></b>',
            'bullet': 'round',
            'bulletSize': 6,
            'bulletBorderAlpha': 1,
            'bulletColor': '#FFFFFF',
            'lineColor': '#bb1c47',
            'useLineColorForBulletBorder': true,
            'bulletBorderThickness': 2,
            'lineThickness': 3,
            'colorField': 'color',
            'valueField': 'outside'
        }, {
            'balloonText': '[[category]]<br><b><span style="font-size:14px;">temp: [[value]]°</span></b>',
            'bullet': 'round',
            'bulletSize': 6,
            'bulletBorderAlpha': 1,
            'bulletColor': '#FFFFFF',
            'lineColor': '#67d219',
            'useLineColorForBulletBorder': true,
            'bulletBorderThickness': 2,
            'lineThickness': 3,
            'colorField': 'color',
            'valueField': 'inside'
        }],
        'chartCursor': {
            'zoomable': false,
            'fullWidth': true,
            'categoryBalloonDateFormat': 'YYYY-MM-DD HH:NN',
            'valueLineEabled': true,
            'valueLineBalloonEnabled': true,
            'valueLineAlpha': 0.5,
            'cursorAlpha': 0
        },
        'categoryField': 'created_at',
        'startDuration': 1,
        'categoryAxis': {
            'parseDates': true,
            'minPeriod': 'mm',
            'equalSpacing': true,
            'axisAlpha': 0,
            'gridAlpha': 0.1,
            'minorGridAlpha': 0.1,
            'minorGridEnabled': true
        }
    };
}