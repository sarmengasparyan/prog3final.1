google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });


      

google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawTable);

var uniqueCount = [];
var count = {};
function drawPieChart() {
    $.ajax({
        url: "/bajin",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'caytegory');
            data.addColumn('number', 'date');

            for (var i = 0; i < jsonData.length; i++) {
                uniqueCount.push(jsonData[i].caytegory);
            }

            
            uniqueCount.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

            Object.keys(count).forEach(function (key) {
                
                data.addRow([key, count[key]]);
            });

            var options = {
                legend: 'left',
                title: 'Songs in percentages',
                is3D: true,
                width: '100%',
                height: '100%'
            };
            
            var chart = new google.visualization.PieChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
}

var uniqueDate = [];
var date = {};
function drawColumnChart() {
    $.ajax({
        url: "/bajin",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'date');
            data.addColumn('number', 'count');
            
            for (var i = 0; i < jsonData.length; i++) {
                uniqueDate.push(jsonData[i].time[2]);
                
            }

            
            uniqueDate.forEach(function (i) { date[i] = (date[i] || 0) + 1; });

            Object.keys(date).forEach(function (key) {
                
                data.addRow([key, date[key]]);
            });
 

            var options = {
                colors:["red"],
                title: 'Songs by quantity',
   
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
}


function drawTable() {
    $.ajax({
        url: "/bajin",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'song');
            data.addColumn('string', 'songer');
            data.addColumn('string', 'category');
            data.addColumn('date', 'date');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].song,
                    jsonData[i].songer,
                    jsonData[i].caytegory,
                    new Date(jsonData[i].time)
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 3); 
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawPieChart();
    drawColumnChart();
    drawTable();
});
