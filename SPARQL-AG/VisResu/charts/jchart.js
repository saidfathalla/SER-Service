function generateJQuery() {
    var count = $("#j_count").val();

    var lastQueryParams = { "j_count": count };
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "j");

    var j_Query = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#> 
    SELECT
      ?series (count(?series) as ?numberofevents)
    WHERE{
    ?s seo:belongsToSeries ?series.
    }
    GROUP BY(?series)
    ORDER BY DESC(?numberofevents)
    LIMIT ${count}
    `;
    reInitControls(j_Query, "jChart");
}
function constructJColumnChart(results) {
    var graphD = [];
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var val = Number(data.binding[1].literal["#text"]);
        graphD.push({ salesperson: uri, sales: val })
    });
    drawBarChart(graphD, "Series");
}
function constructJLineChart(results) {
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
function constructJBarChart(results) {
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
    var gElements = $("#rotateClass").siblings("g");
    for (var loop = gElements.length - 1; loop >= 0; loop--) {
        //$(gElements[loop]).find("text").attr("transform", "rotate(-45)");
    }
}
function constructJRectangularChart(results) {
    var areaData = [];
    var max = 0, min = Infinity;
    var countObj = {};
    var j = 0;
    results.forEach((obj, i) => {
        var series = obj.binding[0].uri.split("#")[1];
        var numberofevents = Number(obj.binding[1].literal["#text"]);
        if (numberofevents > max) {
            max = numberofevents;
        }
        if (numberofevents < min) {
            min = numberofevents;
        }
        if (!countObj[numberofevents]) {
            countObj[numberofevents] = j++;
            areaData.push({
                "label": series,
                "value": numberofevents,
                "valueSuffix": ""
            });
        } else {
            var index = countObj[numberofevents];
            areaData[index].label += "," + series
        }
    });

    var config = rectangularAreaChartDefaultSettings();
    config.expandFromLeft = false;
    config.colorsScale = d4.scale.category20b();
    config.maxValue = max;
    config.minValue = min;
    loadRectangularAreaChart(null, areaData, config);
}
function drawlolipop(results) {
    var loliData = [];
    var maxVal=-Infinity, minVal=Infinity;
    results.forEach((obj, i) => {
        var series = obj.binding[0].uri.split("#")[1];
        var numberofevents = Number(obj.binding[1].literal["#text"]);
        if(numberofevents>maxVal){
            maxVal = numberofevents;
        }
        if(numberofevents<minVal){
            minVal = numberofevents;
        }
        loliData.push({
            Country: series,
            Value: numberofevents
        })
    });
    drawSingleLoliPop(loliData,maxVal);
}

function constructJChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "rect_area") {
        constructJRectangularChart(results)
    } else if (chartSubType == "bar") {
        constructJBarChart(results)
    } else if (chartSubType == "column") {
        constructJColumnChart(results)
    } else if (chartSubType == "lollipop_single") {
        drawlolipop(results)
    } else {
        constructJLineChart(results)
    }
}