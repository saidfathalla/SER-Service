function generateGQuery() {
    var month = $("#g_month").val();

    var lastQueryParams = { "g_month": month};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "g");

    var gQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg:<http://purl.org/events_ds#> 
    SELECT ?series (COUNT(?events) AS ?Noofoccurence)
    WHERE{
        ?events seo:belongsToSeries ?series.
        ?events conference-ontology:startDate ?startDate.
        ?events conference-ontology:endDate ?endDate.
        FILTER (MONTH(?startDate)=${month})
    }
    GROUP BY ?series
    ORDER BY DESC(?Noofoccurence)
    `;
    reInitControls(gQuery, "gChart");
}
function constructGColumnChart(results) {
    var graphD = [];
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var val = Number(data.binding[1].literal["#text"]);
        graphD.push({ salesperson: uri, sales: val })
    });
    drawBarChart(graphD, "Series");
}
function constructGLineChart(results) {
    var acceptanceData = [
        {
            name: "Count",
            values: []
        }
    ];
    var dateArr = [];
    results.forEach((data, index) => {
        var uri = data.binding[0].uri.split("#")[1];
        dateArr.push(uri);
        var val = Number(data.binding[1].literal["#text"]);
        acceptanceData[0].values.push({ date: index, price: val });
    });
    constructLineGraph(acceptanceData, "chart_area", "Series");
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
        //$(gElements[len]).find("text").attr("transform", "rotate(-45)");
    }
}
function constructGBarChart(results) {
    var acceptanceData = [];
    results.forEach((data) => {
        var uri = data.binding[0].uri.split("#")[1];
        var accRate = Number(data.binding[1].literal["#text"]);
        acceptanceData.push({
            "over": uri,
            "2614": accRate,
            "4449": 0
        });
    });
    $("#chart_area").empty();
    var columnsInfo = { "2614": "Count", "4449": "" };
    var barChartConfig = {
        mainDiv: "#chart_area",
        colorRange: ["#008000", "#0000A0"],
        data: acceptanceData,
        columnsInfo: columnsInfo,
        xAxis: "runs",
        yAxis: "over",
        label: {
            xAxis: "Count",
            yAxis: "Series"
        }
    };
    new horizontalGroupBarChart(barChartConfig);
}
function constructGRadialBarChart(results) {
    var flatArray = [];
    var min = Infinity, max = -Infinity;
    results.forEach(data => {
        var series = data.binding[0].uri.split("#")[1];
        var value = +data.binding[1].literal["#text"];
        if (min > value) {
            min = value;
        }
        if (max < value) {
            max = value;
        }
        flatArray.push({
            "Country": series,
            "Value": value
        })
    });
    drawRadialBar(flatArray, min, max);
}

function constructGradialbarchart(results) {
    var flatArray = [];
    var min = Infinity, max = -Infinity;
    results.forEach(data => {
        var series = data.binding[0].uri.split("#")[1];
        var value = +data.binding[1].literal["#text"];
        if (min > value) {
            min = value;
        }
        if (max < value) {
            max = value;
        }
        flatArray.push({
            "name": series,
            "value": value
        })
    });
    drawradialbarr(flatArray, min, max);
}
function constructGDonutChart(results){
    /*var resultModified = [];
    var count = 0;
    results.forEach(data => {
        var val = data.binding[1].literal["#text"];
        count = count + Number(val);
    });
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var val = data.binding[1].literal["#text"];
        resultModified.push({ Series: `${uri}(${val})`, Count: Number(val) / count });
    });
    var donut = donutChart()
        .width(960)
        .height(700)
        .cornerRadius(3)
        .padAngle(0.015)
        .variable('Count')
        .category('Series');
    d3.select('#chart_area').datum(resultModified).call(donut);*/

    var dataObj = {};
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var val = data.binding[1].literal["#text"];
        dataObj[uri]=val;
    });

    drawPieChart(dataObj);
}
function drawGlolipop(results) {
    var loliData = [];
    var maxVal=-Infinity, minVal=Infinity;
    results.forEach((obj, i) => {
       var uri = obj.binding[0].uri.split("#")[1];
        var val = Number(obj.binding[1].literal["#text"]);
        if(val>maxVal){
            maxVal = val;
        }
        
        loliData.push({
            Country: uri,
            Value: val
        })
    });
    drawSingleLoliPop(loliData,maxVal);
}  

function constructGChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "radial_bar_chart") {
        constructGRadialBarChart(results);
    }else if (chartSubType == "donut") {
        constructGDonutChart(results);
    } else if (chartSubType == "radialbar") {
        constructGradialbarchart(results)
    } else if (chartSubType == "bar") {
        constructGBarChart(results);
    } else if (chartSubType == "column") {
        constructGColumnChart(results);
    } else if (chartSubType == "lollipop_single") {
        drawGlolipop(results);
    } else {
        constructGLineChart(results)
    }
}