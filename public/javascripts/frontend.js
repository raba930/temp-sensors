var chartData = [{
    "country": "USA",
    "visits": 4252
}, {
    "country": "China",
    "visits": 1882
}, {
    "country": "Japan",
    "visits": 1809
}, {
    "country": "Germany",
    "visits": 1322
}, {
    "country": "UK",
    "visits": 1122
}, {
    "country": "France",
    "visits": 1114
}, {
    "country": "India",
    "visits": 984
}, {
    "country": "Spain",
    "visits": 711
}, {
    "country": "Netherlands",
    "visits": 665
}, {
    "country": "Russia",
    "visits": 580
}, {
    "country": "South Korea",
    "visits": 443
}, {
    "country": "Canada",
    "visits": 441
}, {
    "country": "Brazil",
    "visits": 395
}, {
    "country": "Italy",
    "visits": 386
}, {
    "country": "Australia",
    "visits": 384
}, {
    "country": "Taiwan",
    "visits": 338
}, {
    "country": "Poland",
    "visits": 328
}];

window.onload = () => {

    AmCharts.makeChart("chart", {
        "type": "serial",
        "dataProvider": chartData,
        "categoryField": "country",
        "graphs": [{
            "valueField": "visits",
            "type": "column"
        }]
    });
    console.log('LOADDDDDD');
}

setInterval(() => {
    $.ajax('/current')
        .done(res => {
            if (res.entries && res.entries.length) {
                $('#nutra span').text(res.entries[0].inside);
                $('#vani span').text(res.entries[0].outside);
            }
        });
}, 120000);