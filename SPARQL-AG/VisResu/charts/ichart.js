function generateIQuery() {
    var year = $("#i_year").val();

    var lastQueryParams = { "i_year": year};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "i");

    var iQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#>
    
    SELECT DISTINCT ?field xsd:float(xsd:float(SUM(?p))/?result)*100 as ?productivity  
    WHERE
    {
    ?k seo:field ?field.
    ?k seo:acceptedPapers ?p.
    ?k conference-ontology:startDate ?d.
    FILTER (?d > "${year}-01-01T00:00:00.0000000+00:00"^^xsd:dateTime && ?d < "${year}-12-31T00:00:00.0000000+00:00"^^xsd:dateTime)
    {
    SELECT DISTINCT ?f1 (SUM(?h) as ?result) where
    {
    ?k seo:acceptedPapers ?h.
    ?k seo:field ?f1.
    }
    GROUP BY ?f1
    }
    FILTER(?f1=?field)
    }
    `
    reInitControls(iQuery, "iChart");
}
function constructIColumnChart(results) {
    var graphD = [];
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        uri = nameMapping[uri];
        var val = Number(data.binding[1].literal["#text"]);
        graphD.push({ salesperson: uri, sales: val })
    });
    drawBarChart(graphD, "Field");
}
function constructILineChart(results) {
    var acceptanceData = [
        {
            name: "Count",
            values: []
        }
    ];
    var dateArr = [];
    results.forEach((data, index) => {
        var uri = data.binding[0].uri.split("#")[1];
        //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        uri = nameMapping[uri];
        dateArr.push(uri);
        var val = Number(data.binding[1].literal["#text"]);
        acceptanceData[0].values.push({ date: index, price: val });
    });
    constructLineGraph(acceptanceData, "chart_area", "Field");
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
        //$(gElements[len]).find("text").attr("transform", "rotate(-45)");
    }
}
function constructIBarChart(results) {
    var acceptanceData = [];
    results.forEach((data) => {
        var uri = data.binding[0].uri.split("#")[1];
        //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        uri = nameMapping[uri];
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
            yAxis: "Field"
        }
    };
    new horizontalGroupBarChart(barChartConfig);
    var gElements = $("#rotateClass").siblings("g");
    for (var loop = gElements.length - 1; loop >= 0; loop--) {
        //$(gElements[loop]).find("text").attr("transform","rotate(-45)");
    }
}
function constructIAreaChart(results){
    var areaData = [];
    results.forEach((obj, i) => {
        var event = obj.binding[0].uri.split("#")[1];
        //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        event = nameMapping[event];
        var numberofevents = obj.binding[1].literal["#text"];
        areaData.push({
            "date": i,
            "close": numberofevents,
            "actual": event,
            "age": event,
            "population": numberofevents
        });
    });
    drawAreaChart(areaData);
    var gElements = $("#chart_area").find(".area_x").find("g");
    var len = gElements.length - 1;
    for (var loop = areaData.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(areaData[loop].actual);
    }
}
function constructIPlatelets(results){
    var areaData = [];
    results.forEach((obj, i) => {
        var event = obj.binding[0].uri.split("#")[1];
        var numberofevents = obj.binding[1].literal["#text"];
        areaData.push({
            "date": i,
            "close": numberofevents,
            "actual": event,
            "age": event,
            "population": numberofevents
        });
    });
    drawPlatelets(areaData);
}
function drawIlolipop(results) {
    var loliData = [];
    var maxVal=-Infinity, minVal=Infinity;
    results.forEach((obj, i) => {
        var event = obj.binding[0].uri.split("#")[1];
        console.log(event);
        //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        event = nameMapping[event];
        console.log(event);

        var numberofevents = Number(obj.binding[1].literal["#text"]);
        if(numberofevents>maxVal){
            maxVal = numberofevents;

        }
        //if(numberofevents<minVal){
           // minVal = numberofevents;
        //}
        loliData.push({
            Country: event,
            Value: numberofevents
        })
    });
    console.log(maxVal);
    drawSingleLoliPop(loliData,maxVal,"Count","Field");
} 
function constructIradialbarchart(results) {
    var flatArray = [];
    var min = Infinity, max = -Infinity;
    results.forEach(data => {
         var uri = data.binding[0].uri.split("#")[1];
        //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        uri = nameMapping[uri];
        var val = Number(data.binding[1].literal["#text"]);
        if (min > val) {
            min = val;
        }
        if (max < val) {
            max = val;
        }
        flatArray.push({
            "name": uri,
            "value": val
        })
    });
    drawradialbarr(flatArray, min, max);
} 

function constructIChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "platelets") {
        constructIPlatelets(results)
    } else if (chartSubType == "area") {
        constructIAreaChart(results)
    } else if (chartSubType == "radialbar") {
        constructIradialbarchart(results)
    } else if (chartSubType == "bar") {
        constructIBarChart(results)
    } else if (chartSubType == "column") {
        constructIColumnChart(results)
    } else if (chartSubType == "lollipop_single") {
        drawIlolipop(results);
    } else {
        constructILineChart(results);
    }
}