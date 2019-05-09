function generateBQuery() {
    var field = $("#b_fields").val();
    var op = $("#b_op").val();
    var accVal = $("#b_acrate").val();

    var lastQueryParams = { "b_fields": field, "b_op": op, "b_acrate": accVal };
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "b");

    var bQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#> 
    SELECT ?events ?eventtype ?field ?accrate
    WHERE{
    ?events seo:field ?field.
    FILTER(?field = ${field})
    ?events rdf:type ?eventtype.
    FILTER(?eventtype = conference-ontology:Conference ||conference-ontology:Symposium||conference-ontology:Workshop)
    ?events seo:acceptanceRate ?accrate.
    FILTER(?accrate ${op} ${accVal}) 
    }    
    `
    reInitControls(bQuery, "bChart");
}
function constructBBubbleChart(results) {
    var dataset = { children: [] };
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var accRate = Number(data.binding[3].literal["#text"]);
        var eventType = data.binding[1].uri.split("#")[1] || "Others";
        if (eventType !== "NamedIndividual") {
            dataset.children.push({ Name: uri, Count: accRate });
        }
    });
    drawBubbleChart(dataset);
}
/*function constructBBarChart(results) {
    var graphD = [];
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var accRate = Number(data.binding[3].literal["#text"]);
        var eventType = data.binding[1].uri.split("#")[1] || "Others";
        if (eventType !== "NamedIndividual") {
            graphD.push({ salesperson: uri, sales: accRate })
        }
    });
    drawBarChart(graphD, "Events");
}
function constructBLineChart(results) {
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
        var accRate = Number(data.binding[3].literal["#text"]);
        var eventType = data.binding[1].uri.split("#")[1] || "Others";
        if (eventType !== "NamedIndividual") {
            acceptanceData[0].values.push({ date: index, price: accRate });
        }
    });
    constructLineGraph(acceptanceData, "chart_area", "Events");
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
        $(gElements[len]).find("text").attr("transform", "rotate(-45)");
    }
}
function constructBColumnChart(results) {
    var acceptanceData = [];
    results.forEach((data) => {
        var uri = data.binding[0].uri.split("#")[1];
        var accRate = Number(data.binding[3].literal["#text"]);
        var eventType = data.binding[1].uri.split("#")[1] || "Others";
        if (eventType !== "NamedIndividual") {
            acceptanceData.push({
                "over": uri,
                "2614": accRate,
                "4449": 0
            });
        }
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
            xAxis: "Acc rate",
            yAxis: "Events"
        }
    };
    new horizontalGroupBarChart(barChartConfig);
}*/
function constructBTreechart(results) {
    var params = JSON.parse(localStorage.getItem("last_query_params"));
    var field = (params.b_fields.split("#")[1]).split(">")[0];
    var treeData = {
        name: nameMapping[field],
        children: [
            { name: "0", children: [] },
            { name: "0.1", children: [] },
            { name: "0.2", children: [] },
            { name: "0.3", children: [] },
            { name: "0.4", children: [] },
            { name: "0.5", children: [] },
            { name: "0.6", children: [] },
            { name: "0.7", children: [] },
            { name: "0.8", children: [] },
            { name: "0.9", children: [] },
        ]
    };
    var values = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    results.forEach(data => {
        var event = data.binding[0].uri.split("#")[1];
        var eventType = data.binding[1].uri.split("#")[1] || "Others";
        if (eventType !== "NamedIndividual") {
            var accrate = data.binding[3].literal["#text"];
            for (var l = values.length - 1; l >= 0; l--) {
                if (Number(accrate) >= values[l]) {
                    var eventIndex = treeData.children[l].children.findIndex(obj => obj.name == eventType);
                    if (eventIndex == -1) {
                        treeData.children[l].children.push({ name: eventType, children: [] });
                        eventIndex = treeData.children[l].children.length - 1;
                    }
                    treeData.children[l].children[eventIndex].children.push({ name: event });
                    break;
                }
            }
        }
    });
    treeData.children = treeData.children.filter(obj => obj.children.length);
    drawTreeChart(treeData);
}
function constructBChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "bubble") {
        constructBBubbleChart(results);
    } else if (chartSubType == "tree") {
        constructBTreechart(results);
    } else if (chartSubType == "bar") {
        constructBBarChart(results);
    } else if (chartSubType == "column") {
        constructBColumnChart(results);
    } else {
        constructBLineChart(results)
    }
}