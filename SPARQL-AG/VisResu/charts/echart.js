function generateEQuery() {
    var country = $("#e_country").val();
    var sdate = $("#e_date").val();

    var lastQueryParams = { "e_country": country, "e_date": sdate};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "e");

    var eQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#> 
    SELECT ?field (COUNT(?field) AS ?EVENTURI)
    WHERE{
    ?events seo:field ?field.
    ?events seo:heldInCountry ?country.
    FILTER(?country = <${country}>)
    ?events conference-ontology:startDate ?sd.
    FILTER(STR(?sd) > "${sdate}") 
    }       
    `
    reInitControls(eQuery, "eChart");
}
function constructEColumnChart(results) {
    var graphD = [];
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        uri = nameMapping[uri];
        var val = Number(data.binding[1].literal["#text"]);
        graphD.push({ salesperson: uri, sales: val })
    });
    drawBarChart(graphD,"Field");
}
function constructEradialbarchart(results) {
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
function constructELineChart(results) {
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
function constructEBarChart(results) {
    var acceptanceData = [];
    results.forEach((data) => {
        var uri = data.binding[0].uri.split("#")[1];
        //var uri = obj.binding[0].uri.split("#")[1];
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
function constructEDonutChart(results){
    var resultModified = [];
    var count = 0;
    results.forEach(data => {
        var val = data.binding[1].literal["#text"];
        count = count + Number(val);
    });
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var val = data.binding[1].literal["#text"];
        resultModified.push({ Field: `${uri}(${val})`, Count: Number(val) / count });
    });
    var donut = donutChart()
        .width(960)
        .height(500)
        .cornerRadius(3)
        .padAngle(0.015)
        .variable('Count')
        .category('Field');
    d3.select('#chart_area').datum(resultModified).call(donut);
}

function drawElolipop(results) {
    var loliData = [];
    var maxVal=-Infinity, minVal=Infinity;
    results.forEach((obj, i) => {
        var uri = obj.binding[0].uri.split("#")[1];
        var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
        uri = nameMapping[uri];
        var accRate = Number(obj.binding[1].literal["#text"]);
        if(accRate>maxVal){
            maxVal = accRate;

        }
        //if(numberofevents<minVal){
           // minVal = numberofevents;
        //}
        loliData.push({
            Country: uri,
            Value: accRate
        })
    });
    console.log(maxVal);
    drawSingleLoliPop(loliData,maxVal,"Count","Field");
}  

function constructEChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "donut") {
        constructEDonutChart(results);
    } else if (chartSubType == "radialbar") {
        constructEradialbarchart(results)
    } else if (chartSubType == "bar") {
        constructEBarChart(results);
    } else if (chartSubType == "column") {
        constructEColumnChart(results);
    } else if (chartSubType == "lollipop_single") {
        drawElolipop(results);
    }else  {
        constructELineChart(results);
    }
}