<html>

<head>
	<!--link href="normalize.css" rel="stylesheet" /-->
	<link href="index.css" rel="stylesheet" />

	<script src="lib/jQuery.min.js"></script>
	
	<script src="lib/d3.v3.min.js"></script>
	<script src="lib/d3.v4.min.js"></script>

	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">

	<script src="lib/d3-tip.js"></script>

	<!--script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script-->
	<script src="http://d3js.org/queue.v1.min.js"></script>
	<script src="http://d3js.org/topojson.v1.min.js"></script>
	<!--script src="lib/d3-tip.js"></script-->
	<script src="world_countries.js"></script>

	<script src="lib/xml2json.js"></script>
	<script src="lib/tree_chart.js"></script>
	<script src="lib/donut_chart.js"></script>
	<script src="lib/bubble_chart.js"></script>
	<script src="lib/bar_chart.js"></script>
	<script src="lib/multiline_chart.js"></script>
	<script src="lib/multi_bar_chart.js"></script>
	<script src="lib/horizontalGroupBarChart.js"></script>
	<script src="lib/geomap.js"></script>
	<script src="lib/area_chart.js"></script>
	<script src="lib/platelets.js"></script>
	<script src="lib/rectangular_area_chart.js"></script>
	<script src="lib/d3-radial.js"></script>
	<script src="lib/radial_bar_chart.js"></script>
	

	<script src="util.js"></script>

</head>

<body>
	<h2 class="header">Parametarized predefined SPARQL queries</h2>
	<center>
		<div class="article" style="margin-top:-20px;">
			<select id="chartType" onChange="showHideOptionsDiv(this.value);">
				<option value="">Select a chart type</option>
				<option value="a">Type 01 - List all events in the "field" that took place between "dates" in "country"</option>
				<option value="b">Type 02 - List the events related to "field" with an "acceptance rate"</option>
				<option value="c">Type 03 - List the number of submitted and accepted papers of the "series" since "date"</option>
				<option value="d">Type 04 - List the top "n" countries host most of the events in computer science research communities.</option>
				<option value="e">Type 05 - List the subfields of CS where "country" has hosted more events since "date"</option>
				<option value="f">Type 06 - Acceptance rate of the "series" since "date"</option>
				<option value="g">Type 07 - List the conference series that occur in the "month" of</option>
				<option value="h">Type 08 - List the Geographical distribution of series in CS Community</option>
				<option value="i">Type 09 - Field productivity for CS research communities in the "year"</option>
				<option value="j">Type 10 - Top "n" series in terms of the number of events</option>
			</select>
		</div>
		<div id="a_options" style="display: none; margin-top:20px;" class="options">
			List all events (with their websites) in the field&nbsp;
			<select id="a_fields"></select> &nbsp; that took place between&nbsp;&nbsp;
			<input type="date" id="a_from_date" value="2014-01-01"> and
			<input type="date" id="a_to_date" value="2019-03-24"> in
			<select id="a_country"></select>&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="a_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateAQuery();">
		</div>
		<div id="b_options" style="display: none; margin-top:20px;" class="options">
			List the events related to
			<select id="b_fields"></select> &nbsp;with an acceptance rate&nbsp;
			<select id="b_op">
				<option value=">"> &gt;</option>
				<option value=">="> ≥</option>
				<option value="<"> &lt;</option>
				<option value=">="> ≤</option>
				<option value="="> =</option>
				<option value="!="> ≠</option>
			</select>
			&nbsp;
			<input type="text" id="b_acrate" value="0.50" style="width:30px;" />&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="b_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateBQuery();" />
		</div>
		<div id="c_options" style="display: none; margin-top:20px;" class="options">
			List the number of submitted and accepted papers of the series
			<select id="c_series"></select>
			&nbsp;since&nbsp;
			<input type="date" id="c_date" value="2013-01-01" /> &nbsp;&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="c_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateCQuery(false);" />
		</div>
		<div id="d_options" style="display: none; margin-top:20px;" class="options">
			List the top-
			<input type="text" id="d_count" value="10" style="width:30px;"> countries host most of the events in computer science research communities. &nbsp;&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="d_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateDQuery();" />
		</div>
		<div id="e_options" style="display: none; margin-top:20px;" class="options">
			List the subfields of CS where
			<select id="e_country"></select>&nbsp; has hosted more events since
			<input type="date" id="e_date" value="2013-01-01" /> &nbsp;&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="e_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateEQuery();" />
		</div>
		<div id="f_options" style="display: none; margin-top:20px;" class="options">
			Acceptance rate of the series
			<select id="f_series"></select>
			&nbsp;since&nbsp;
			<input type="date" id="f_date" value="2013-01-01" /> &nbsp;&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="c_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateCQuery(true);" />
		</div>
		<div id="g_options" style="display: none; margin-top:20px;" class="options">
				List the series that occur in the month of &nbsp;
				<select id="g_month"></select>
				&nbsp;
				<!--
				&nbsp;since&nbsp;
				<input type="date" id="f_date" value="2013-01-01" /> &nbsp;&nbsp;&nbsp;
				<!--Chart Type&nbsp;&nbsp;<select id="c_chart_type"></select-->
				<input type="button" value="Generate Query" onClick="generateGQuery();" />
			</div>
		<div id="h_options" style="display: none; margin-top:20px;" class="options">
			Geographical distribution of series &nbsp;
			<select id="h_series"></select>
			in CS Community&nbsp;
			<!--
			&nbsp;since&nbsp;
			<input type="date" id="f_date" value="2013-01-01" /> &nbsp;&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="c_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateHQuery();" />
		</div>
		<div id="i_options" style="display: none; margin-top:20px;" class="options">
				Field productivity for CS research communities in the Year&nbsp;
				<input type="text" id="i_year" value="2017" style="width:40px;" />&nbsp;&nbsp;
				<!--
				&nbsp;since&nbsp;
				<input type="date" id="f_date" value="2013-01-01" /> &nbsp;&nbsp;&nbsp;
				<!--Chart Type&nbsp;&nbsp;<select id="c_chart_type"></select-->
				<input type="button" value="Generate Query" onClick="generateIQuery();" />
			</div>
		<div id="j_options" style="display: none; margin-top:20px;" class="options">
			Top&nbsp;
			<input type="text" id="j_count" value="10" style="width:30px;" />&nbsp;&nbsp;
			series in terms of the number of events
			<!--
			&nbsp;since&nbsp;
			<input type="date" id="f_date" value="2013-01-01" /> &nbsp;&nbsp;&nbsp;
			<!--Chart Type&nbsp;&nbsp;<select id="c_chart_type"></select-->
			<input type="button" value="Generate Query" onClick="generateJQuery();" />
		</div>
		<div style="display: none; margin-top:20px;" id="query_button_div">
			<input type="button" value="Hide Query" id="query_show" onClick="showHideQueryBox(this.value);"/>
		</div>
		<div style="display: none; margin-top:20px;" id="query_div">
			<textarea id="query"></textarea>
			<br>
			<br>
			Chart Type&nbsp;&nbsp;<select id="chart_type"></select>
			<br>
			<br>
			<input type="button" value="Construct Chart" id="chart_button" onClick="sendRequest();">
		</div>
		
		<div id="chart_area"></div>
		<span id="chart_area_1"></span>
		<span id="chart_area_2"></span>

		<img src="loading.gif" id="loading_gif" style="display:none;" />
	</center>
		<script >
	$(document).ready(function () {
    populateOptions();
});
function populateOptions() {
    var fieldStr = getFieldStr();
    $("#a_fields,#b_fields").html(fieldStr);
    var countriesStr = getCountriesStr();
    $("#a_country,#e_country").html(countriesStr);
    var seriesStr = getSeriesStr();
    $("#c_series,#f_series,#h_series").html(seriesStr);
    var month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var monthStr="";
    month.forEach((obj,i)=>{
        monthStr+=`<option value=${i+1}>${obj}</option>`
    });
    $("#g_month").html(monthStr);
}
function showHideOptionsDiv(opt) {
    $(`.options`).hide();
    $(`#${opt}_options`).show();
    $("#query_div").hide();
    $("#chart_area,#chart_area_1,#chart_area_2,#Legend_chart_area_1,#Legend_chart_area_1,#Legend_chart_area").html("");
    //$(`#${opt}_chart_type`).html(chartTypesAvailable[opt]);
    $("#chart_type").html(chartTypesAvailable[opt]);
}

var chartsMapper = {
    aChart: constructAChart,
    bChart: constructBChart,
    cChart: constructCChart,
    dChart: constructDChart,
    eChart: constructEChart,
    fChart: constructCChart,
    gChart: constructGChart,
    hChart: constructHChart,
    iChart: constructIChart,
    jChart: constructJChart
}
var chartTypesAvailable = {
    a: `<option value="tree">Tree chart</option>`,
    b: `<option value="bubble">Bubble chart</option>`,
    c: `<option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    d: `<option value="bar">Bar chart</option>`,
    e: `<option value="donut">Donut chart</option>`,
    f: `<option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    g: `<option value="radial_bar">Radial bar chart</option>`,
    h: `<option value="geomap">Geomap</option>`,
    i: `<option value="area">Platelets chart</option>`,
    j: `<option value="rect_area">Rectangular chart</option>`
}
function sendRequest() {
    $("#loading_gif").show();
    $("#chart_area,#chart_area_1,#chart_area_2,#Legend_chart_area_1,#Legend_chart_area").html("");
    //$("#query_show").val("Show Query");
    //$("#query_div").slideUp();
    var query = $("#query").val();
    var url = `http://kddste.sda.tech/sparql?default-graph-uri=&query=${encodeURIComponent(query)}`
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            $("#loading_gif").hide();
            var response = xml2json(this.responseXML).replace("undefined", "");
            response = JSON.parse(response);
            var results = response.sparql.results.result;
            if (!(results instanceof Array)) {
                results = [results]
            }
            chartsMapper[chartType] && (chartsMapper[chartType])(results);
        }
    }
}

var chartType;
function generateAQuery() {
    var field = $("#a_fields").val();
    var country = $("#a_country").val();
    var fDate = $("#a_from_date").val();
    var tDate = $("#a_to_date").val();
    var aQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#> 
    SELECT ?events ?eventtype ?field ?sd  ?country ?webpage
    WHERE{
    ?events seo:field ?field.
    FILTER(?field = ${field})
    ?events rdf:type ?eventtype.
    FILTER(?eventtype = conference-ontology:Conference||conference-ontology:Symposium||conference-ontology:Workshop)
    ?events conference-ontology:startDate ?sd.
    FILTER (STR(?sd) > "${fDate}" && STR(?sd) < "${tDate}")
    ?events seo:heldInCountry ?country.
    FILTER(?country = <${country}>)
    ?events seo:eventWebsite ?webpage.
    }
    `
    reInitControls(aQuery, "aChart");
}


function constructAChart(results) {
    var field = $("#a_fields").find("option:selected").html();
    var treeData = {
        "name": field,
        "children": [
            { "name": "Conference", "children": [] },
            { "name": "Symposium", "children": [] },
            { "name": "Workshop", "children": [] }
        ]
    };
    results.forEach(data => {
        var event = data.binding[0].uri.split("#")[1];
        var type = data.binding[1].uri;
        var eventLink = data.binding[5].literal || data.binding[5].uri;
        if (eventLink.indexOf("http://") == -1 && eventLink.indexOf("https://") == -1) {
            eventLink = `http://${eventLink}`;
        }
        if (type.indexOf("Conference") != -1) {
            treeData.children[0].children.push({ name: `${event} (<a href="${eventLink}" target="_blank">Link</a>)` });
        } else if (type.indexOf("Symposium") != -1) {
            treeData.children[1].children.push({ name: `${event} (<a href="${eventLink}" target="_blank">Link</a>)` });
        } else if (type.indexOf("Workshop") != -1) {
            treeData.children[2].children.push({ name: `${event} (<a href="${eventLink}" target="_blank">Link</a>)` });
        }

    });
    drawTreeChart(treeData);
}
function generateBQuery() {
    var field = $("#b_fields").val();
    var op = $("#b_op").val();
    var accVal = $("#b_acrate").val();
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
    FILTER(?eventtype = conference-ontology:Conference||conference-ontology:Symposium||conference-ontology:Workshop)
    ?events seo:acceptanceRate ?accrate.
    FILTER(?accrate ${op} ${accVal}) 
    }    
    `
    reInitControls(bQuery, "bChart");
}
function constructBChart(results) {
    var dataset = { children: [] };
    results.forEach(data => {
        var uri = data.binding[0].uri.split("#")[1];
        var accRate = Number(data.binding[3].literal["#text"]);
        dataset.children.push({ Name: uri, Count: accRate });
    });
    drawBubbleChart(dataset);
}
function generateEQuery() {
    var country = $("#e_country").val();
    var sdate = $("#e_date").val();
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
function constructEChart(results) {
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
function generateCQuery(isFChart) {
    var series = isFChart ? $("#f_series").val() : $("#c_series").val();
    var sdate = isFChart ? $("#f_date").val() : $("#c_date").val();
    var eQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#> 
    SELECT ?series ?eventtype ?submittedpaper ?acceptedpaper ?accrate ?sd
    WHERE{
    ?events seo:belongsToSeries ?series.
    FILTER(?series = eventskg:${series})
    ?events rdf:type ?eventtype.
    FILTER(?eventtype = conference-ontology:Conference||conference-ontology:Symposium||conference-ontology:Workshop)
    ?events seo:submittedPapers ?submittedpaper.
    ?events seo:acceptedPapers ?acceptedpaper.
    ?events seo:acceptanceRate ?accrate.
    ?events conference-ontology:startDate ?sd.
    FILTER(STR(?sd) > "${sdate}") 
    }          
    `
    reInitControls(eQuery, isFChart ? "fChart" : "cChart");
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
        }]
    var dateArr = [];
    results.forEach((obj, index) => {
        var submitted = Number(obj.binding[2].literal["#text"]);
        var accepted = Number(obj.binding[3].literal["#text"]);
        var accrate = Number(obj.binding[4].literal["#text"]);
        var dateVal = obj.binding[5].literal["#text"];
        dateVal = dateVal.split("T")[0];
        dateVal = dateVal.split("-");
        dateArr.push(`${dateVal[0]}`);//-${dateVal[1]}-${dateVal[2]}
        graphData[0].values.push({ date: index, price: submitted });
        graphData[1].values.push({ date: index, price: accepted });
        acceptanceData[0].values.push({ date: index, price: accrate });
    });
    if (isFChart) {
        constructLineGraph(acceptanceData, "chart_area");
    } else {
        constructLineGraph(graphData, "chart_area");
    }
    var gElements = $("#chart_area").find("g").find("g[class='x axis']").find("g");
    //var gElements2 = $("#chart_area_2").find("g").find("g[class='x axis']").find("g");
    var len = gElements.length - 1;
    for (var loop = dateArr.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(dateArr[loop]);
        //$(gElements2[len]).find("text").text(dateArr[loop]);
    }
}
function constructCBarChart(results) {
    var isFChart = chartType == "fChart";
    var barData = [];
    var acceptanceData = [];
    results.forEach((obj, index) => {
        var submitted = Number(obj.binding[2].literal["#text"]);
        var accepted = Number(obj.binding[3].literal["#text"]);
        var accrate = Number(obj.binding[4].literal["#text"]);
        var dateVal = obj.binding[5].literal["#text"];
        dateVal = dateVal.split("T")[0];
        dateVal = dateVal.split("-");
        barData.push({
            "model_name": dateVal[0],
            "field1": submitted,
            "field2": accepted
        });
        acceptanceData.push({
            "model_name": dateVal[0],
            "field1": accrate,
            "field2": 0
        })
    });
    if (isFChart) {
        drawMultiBarChart(acceptanceData, "#chart_area", true)
    } else {
        drawMultiBarChart(barData, "#chart_area");
    }
}
function constructCColumnChart(results) {
    var isFChart = chartType == "fChart";
    var groupChartData = [], acceptanceData = [];
    results.forEach((obj, index) => {
        var submitted = Number(obj.binding[2].literal["#text"]);
        var accepted = Number(obj.binding[3].literal["#text"]);
        var accrate = Number(obj.binding[4].literal["#text"]);
        var dateVal = obj.binding[5].literal["#text"];
        dateVal = dateVal.split("T")[0];
        dateVal = dateVal.split("-");
        groupChartData.push({
            "over": +dateVal[0],
            "2614": submitted,
            "4449": accepted
        });
        acceptanceData.push({
            "over": +dateVal[0],
            "2614": accrate,
            "4449": 0
        })
    });
    var columnsInfo = { "2614": "Submitted", "4449": "Accepted" };
    $("#chart_area,#chart_area_1,#chart_area_2").empty();

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
function constructCChart(results) {
    //var chartSubType = $("#c_chart_type").val();
    var chartSubType = $("#chart_type").val();
    var chartTypeMapping = {
        line: constructCLineChart,
        bar: constructCBarChart,
        column: constructCColumnChart
    }
    chartTypeMapping[chartSubType] && (chartTypeMapping[chartSubType])(results);
}
function generateDQuery() {
    var dCount = $("#d_count").val();
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
function constructDChart(results) {
    var graphD = [];
    results.forEach(obj => {
        var country = obj.binding[0].uri.split("/");
        country = country[country.length - 1].replace("_", " ");
        var count = obj.binding[1].literal["#text"];
        graphD.push({ salesperson: country, sales: count })
    });
    drawBarChart(graphD);
}
function generateGQuery() {
    var month = $("#g_month").val();
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
function constructGChart(results) {
    var flatArray = [];
    var min=Infinity, max=-Infinity;
    results.forEach(data => {
        var series=data.binding[0].uri.split("#")[1];
        var value=+data.binding[1].literal["#text"];
        if(min>value){
            min=value;
        }
        if(max<value){
            max=value;
        }
        flatArray.push({
            "Country": series,
            "Value": value
        })
    });
    drawRadialBar(flatArray,min,max);
}
function generateHQuery() {
    var series = $("#h_series").val();
    var hQuery = `PREFIX conference-ontology:<https://w3id.org/scholarlydata/ontology/conference-ontology.owl#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
    PREFIX seo: <http://purl.org/seo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX eventskg: <http://purl.org/events_ds#>
    SELECT (SAMPLE(?series) AS ?SERIES) (SAMPLE(?country) AS ?COUNTRY) (COUNT(?country) as ?COUNT)
    WHERE {
      ?e seo:belongsToSeries ?series.
      FILTER(?series = eventskg:${series})
      ?e seo:heldInCountry ?country.
    }
    GROUP BY ?series ?country
    `;
    reInitControls(hQuery, "hChart");
}
function constructHChart(results) {
    var flatArray = [];
    var countryList = returnCountryIds();
    results.forEach(data => {
        var series = data.binding[0].uri && data.binding[0].uri.split("#")[1] || data.binding[0].literal;
        var country = data.binding[1].uri.split("/");
        country = country[country.length - 1].replace("_", " ");
        var count = data.binding[2].literal["#text"];
        flatArray.push({ country: country, series: series, count: count });
    });
    flatArray = flatArray.map(data => {
    	console.log(data);
        var countryObj = countryList.find(con => con.name.indexOf(data.country) != -1);
        console.log(countryObj);
        data.id = countryObj && countryObj.id;
        data.population = data.count;
        data.name = data.country;
        return data;
    });
    drawCountryGraph(flatArray);
}

function generateJQuery() {
    var count = $("#j_count").val();
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
function constructJChart(results) {
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
    loadRectangularAreaChart("chart_area_3", areaData, config);
}
function generateIQuery() {
    var year = $("#i_year").val();
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
function constructIChart(results) {
    var areaData = [];
    results.forEach((obj, i) => {
    	console.log(obj);
        var event = obj.binding[0].uri.split("#")[1];
        console.log(event);
        var numberofevents = obj.binding[1].literal["#text"];
        console.log(numberofevents);
        areaData.push({
            //"date": i,
            //"close": numberofevents,
            //"actual": event,
            "age": event,
            "population": numberofevents
        });
    });
    /*drawAreaChart(areaData);
    var gElements = $("#chart_area").find(".area_x").find("g");
    var len = gElements.length - 1;
    for (var loop = areaData.length - 1; loop >= 0; loop-- , len--) {
        $(gElements[len]).find("text").text(areaData[loop].actual);
    }*/

    drawPlatelets(areaData);
}
function reInitControls(queryVal, chartT) {
    $("#query").val(queryVal);
    $("#query_div").show();
    //$("#query_show").val("Hide Query");
    $("#chart_area,#chart_area_1,#chart_area_2,#Legend_chart_area_1,#Legend_chart_area").html("");
    chartType = chartT;
}
	</script>
</body>

</html>