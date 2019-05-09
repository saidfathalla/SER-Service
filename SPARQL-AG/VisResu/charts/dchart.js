function generateDQuery() {
    var dCount = $("#d_count").val();

    var lastQueryParams = { "d_count": dCount};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "d");

    var dQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#> 
    SELECT ?country (COUNT(?country) AS ?Hosted)
    WHERE{
    ?events seo:heldInCountry ?country.
    }
    ORDER BY DESC(?Hosted)
    LIMIT ${dCount}             
    `;
    reInitControls(dQuery, "dChart");
}
function constructDColumnChart(results) {
    var graphD = [];
    results.forEach(obj => {
        var country = obj.binding[0].uri.split("/");
        country = country[country.length - 1].replace("_", " ");
        var count = obj.binding[1].literal["#text"];
        graphD.push({ salesperson: country, sales: count })
    });
    drawBarChart(graphD);
}
function constructDLineChart(results) {
    var acceptanceData = [
        {
            name: "Count",
            values: []
        }
    ];
    var dateArr = [];
    results.forEach((obj, index) => {
        var uri = obj.binding[0].uri;
        uri = uri.split("/");
        uri = uri[uri.length - 1];
        uri = uri.replace("_", " ");
        var accrate = Number(obj.binding[1].literal["#text"]);
        dateArr.push(uri);
        var accrate = Number(obj.binding[1].literal["#text"]);
        acceptanceData[0].values.push({ date: index, price: accrate });
    });
    constructLineGraph(acceptanceData, "chart_area", "Country");
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
    }
}
function constructDBarChart(results) {
    var acceptanceData = [];
    results.forEach((obj, index) => {
        var uri = obj.binding[0].uri;
        uri = uri.split("/");
        uri = uri[uri.length - 1];
        uri = uri.replace("_", " ");
        var accrate = Number(obj.binding[1].literal["#text"]);
        acceptanceData.push({
            "over": uri,
            "2614": accrate,
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
            yAxis: "Country"
        }
    };
    new horizontalGroupBarChart(barChartConfig);
}
function constructDRectangularChart(results){
    var areaData = [];
    var max = 0, min = Infinity;
    var countObj = {};
    var j = 0;
    results.forEach((obj, i) => {
        var series = obj.binding[0].uri;
        series = series.split("/");
        series = series[series.length - 1].replace("_", " ");

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
function constructDBubbleChart(results) {
    var dataset = { children: [] };
    results.forEach(data => {
        var series = data.binding[0].uri;
        series = series.split("/");
        series = series[series.length - 1].replace("_", " ");
        var accRate = Number(data.binding[1].literal["#text"]);
        dataset.children.push({ Name: series, Count: accRate });
    });
    drawBubbleChart(dataset);
}

function drawDlolipop(results) {
    var loliData = [];
    var maxVal=-Infinity, minVal=Infinity;
    results.forEach((obj, i) => {
       var country = obj.binding[0].uri.split("/");
        country = country[country.length - 1].replace("_", " ");
        var count = Number(obj.binding[1].literal["#text"]);
        if(count>maxVal){
            maxVal = count;

        }
        //if(numberofevents<minVal){
           // minVal = numberofevents;
        //}
        loliData.push({
            Country: country,
            Value: count
        })
    });
    console.log(maxVal);
    drawSingleLoliPop(loliData,maxVal,"Count","Country");
}  


function constructDChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "bubble") {
        constructDBubbleChart(results);
    } else if (chartSubType == "rect_area") {
        constructDRectangularChart(results);
    } else if (chartSubType == "bar") {
        constructDBarChart(results);
    } else if (chartSubType == "column") {
        constructDColumnChart(results);
    } else if (chartSubType == "lollipop_single") {
        drawDlolipop(results);
    } else  {
        constructDLineChart(results);
    }
}
