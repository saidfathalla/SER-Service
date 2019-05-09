function generateCQuery(isFChart) {
    var series = isFChart ? $("#f_series").val() : $("#c_series").val();
    var sdate = isFChart ? $("#f_date").val() : $("#c_date").val();

    var lastQueryParams = isFChart ? { "f_series": series, "f_date": sdate } : { "c_series": series, "c_date": sdate };
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", isFChart ? "f" : "c");


    var cQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#> 
    SELECT ?series ?eventtype ?submittedpaper ?acceptedpaper ?sd
    WHERE{
    ?events seo:belongsToSeries ?series.
    FILTER(?series = eventskg:${series})
    ?events seo:submittedPapers ?submittedpaper.
    ?events seo:acceptedPapers ?acceptedpaper.
    ?events conference-ontology:startDate ?sd.
    FILTER(STR(?sd) > "${sdate}") 
    }          
    `
    if (isFChart) {
        cQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
        PREFIX seo: <http://purl.org/seo/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX eventskg: <http://purl.org/events_ds#> 
        SELECT ?accrate ?sd
        WHERE{
        ?events seo:belongsToSeries ?series.
        FILTER(?series = eventskg:${series})
        ?events seo:acceptanceRate ?accrate.
        ?events conference-ontology:startDate ?sd.
        FILTER(STR(?sd) > "${sdate}") 
        }         
    `
    }
    reInitControls(cQuery, isFChart ? "fChart" : "cChart");
}
function constructCLineChart(results) {
    var isFChart = chartType == "fChart";
    var graphData = [
        {
            name: "Submitted",
            values: []
        },
        {
            name: "Accepted",
            values: []
        }
    ];
    var acceptanceData = [
        {
            name: "Acceptance rate",
            values: []
        }
    ];
    var dateArr = [];
    results.forEach((obj, index) => {
        var dateVal = obj.binding[isFChart ? 1 : 3].literal["#text"];
        dateVal = dateVal.split("T")[0];
        dateVal = dateVal.split("-");
        dateArr.push(`${dateVal[0]}`);
        if (isFChart) {
            var accrate = Number(obj.binding[0].literal["#text"]);
            acceptanceData[0].values.push({ date: index, price: accrate });
        } else {
            var submitted = Number(obj.binding[1].literal["#text"]);
            var accepted = Number(obj.binding[2].literal["#text"]);
            graphData[0].values.push({ date: index, price: submitted });
            graphData[1].values.push({ date: index, price: accepted });
        }

    });
    if (isFChart) {
        constructLineGraph(acceptanceData, "chart_area");
    } else {
        constructLineGraph(graphData, "chart_area");
    }
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
    }
}
function constructCColumnChart(results) {
    var isFChart = chartType == "fChart";
    var barData = [];
    var acceptanceData = [];
    results.forEach((obj, index) => {
        var dateVal = obj.binding[isFChart ? 1 : 3].literal["#text"];
        dateVal = dateVal.split("T")[0];
        dateVal = dateVal.split("-");
        if (!isFChart) {
            var submitted = Number(obj.binding[1].literal["#text"]);
            var accepted = Number(obj.binding[2].literal["#text"]);
            barData.push({
                "model_name": dateVal[0],
                "field1": submitted,
                "field2": accepted
            });
        } else {
            var accrate = Number(obj.binding[0].literal["#text"]);
            acceptanceData.push({
                "model_name": dateVal[0],
                "field1": accrate,
                "field2": 0
            })
        }
    });
    if (isFChart) {
        drawMultiBarChart(acceptanceData, "#chart_area", true)
    } else {
        drawMultiBarChart(barData, "#chart_area");
    }
}
function constructCBarChart(results) {
    var isFChart = chartType == "fChart";
    var groupChartData = [], acceptanceData = [];
    results.forEach((obj, index) => {
        var dateVal = obj.binding[isFChart ? 1 : 3].literal["#text"];
        dateVal = dateVal.split("T")[0];
        dateVal = dateVal.split("-");
        if (isFChart) {
            var accrate = Number(obj.binding[0].literal["#text"]);
            acceptanceData.push({
                "over": +dateVal[0],
                "2614": accrate,
                "4449": 0
            })
        } else {
            var submitted = Number(obj.binding[1].literal["#text"]);
            var accepted = Number(obj.binding[2].literal["#text"]);
            groupChartData.push({
                "over": +dateVal[0],
                "2614": submitted,
                "4449": accepted
            });
        }
    });
    var columnsInfo = { "2614": "Submitted", "4449": "Accepted" };
    $("#chart_area").empty();

    if (isFChart) {
        var columnsInfo_2 = { "2614": "Acceptance rate", "4449": "" };
        var barChartConfig2 = {
            mainDiv: "#chart_area",
            colorRange: ["#008000", "#0000A0"],
            data: acceptanceData,
            columnsInfo: columnsInfo_2,
            xAxis: "runs",
            yAxis: "over",
            label: {
                xAxis: "Acceptance rate",
                yAxis: "Year"
            }
        };
        new horizontalGroupBarChart(barChartConfig2);
    } else {
        var barChartConfig = {
            mainDiv: "#chart_area",
            colorRange: ["#0000A0", "#008000"],
            data: groupChartData,
            columnsInfo: columnsInfo,
            xAxis: "runs",
            yAxis: "over",
            label: {
                xAxis: "Count",
                yAxis: "Year"
            },
            requireLegend: true
        };
        new horizontalGroupBarChart(barChartConfig);
    }
}
function constructClollipopchart(results) {
    var isFChart = chartType == "fChart";
    var groupChartData = [], acceptanceData = [];
    results.forEach((obj, index) => {
        var dateVal = obj.binding[isFChart ? 1 : 3].literal["#text"];
        dateVal = dateVal.split("T")[0];
        console.log("dateVal:", dateVal);
        //dateVal = dateVal.split("-");
        if (isFChart) {
            var accrate = Number(obj.binding[0].literal["#text"]);
            acceptanceData.push({
                "name": dateVal,
                "0": accrate,
                "1": 0,
                "2": 50
            })
        } else {
            var submitted = Number(obj.binding[1].literal["#text"]);
            var accepted = Number(obj.binding[2].literal["#text"]);
            groupChartData.push({
                "name": dateVal,
                "0": submitted,
                "1": accepted,
                "2": 100
            });
        }
    });
    var chart;
    if (isFChart) {
        chart = d4.lollipop()
            .yLabelText('Acc rate')
            .duration(1500)
            .legendBoxSize(13)
            .legendText(['Acc rate'])
            .height(450)
            .tooltipText(function (d, i) {
                return "<span style='color: #1f77b4'>Acc rate:</span> " + d[0];
            });
    } else {
        chart = d4.lollipop()
            .yLabelText('Count')
            .duration(1500)
            .legendBoxSize(13)
            .legendText(['Submitted', 'Accepted'])
            .height(450)
            .tooltipText(function (d, i) {
                return "<span style='color: #1f77b4'>submitted:</span> " + d[0] + "<p><span style='color: #2ca02c'>accepted:</span> " + d[1];
            });
    }
    d4.select('div#chart_area').append('svg').attr({
        'width': 1000,
        'height': 450,
        'class': 'chart lollichart'
    });
    d4.select('svg.chart').datum(isFChart ? acceptanceData : groupChartData).call(chart);
    if(isFChart){
        $(".legendContainer").html("");
    }

}
function constructCChart(results) {
    var chartSubType = $("#chart_type").val();
    var chartTypeMapping = {
        line: constructCLineChart,
        bar: constructCBarChart,
        column: constructCColumnChart,
        lollipop: constructClollipopchart
    }
    chartTypeMapping[chartSubType] && (chartTypeMapping[chartSubType])(results);
}