$(document).ready(function () {
    populateOptions();
    //var lastVisited = localStorage.getItem("last_visited_tab");
    //if (lastVisited) {
        //showHideHomeSearch(lastVisited);
        //if (lastVisited == "home") {
            //return;
        //}
    //}
    var lastQueryType = localStorage.getItem("last_query_type");
    if (lastQueryType) {
        //var loadLastQuery = confirm("Load Last Used Query?");
        //if (loadLastQuery) {
        $("#chartType").val(lastQueryType);
        showHideOptionsDiv(lastQueryType);
        var lastQueryParams = JSON.parse(localStorage.getItem("last_query_params"));
        console.log("lastQueryParams: ", lastQueryParams)
        for (var key in lastQueryParams) {
            $("#" + key).val(lastQueryParams[key]);
        }
        window[`generate${lastQueryType.toUpperCase()}Query`]()
        //}
    }
});
function showHideHomeSearch(page) {
    localStorage.setItem("last_visited_tab", page);
    $("#home_page,#search_page").hide();
    $("#" + page + "_page").show();
    $(".links").css('font-weight', 'normal');
    $("#" + page + "_link").css('font-weight', 'bolder')
}
function populateOptions() {
    var fieldStr = getFieldStr();
    $("#a_fields,#b_fields").html(fieldStr);
    var countriesStr = getCountriesStr();
    $("#a_country,#e_country").html(countriesStr);
    var seriesStr = getSeriesStr();
    $("#c_series,#f_series,#h_series").html(seriesStr);
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthStr = "";
    month.forEach((obj, i) => {
        monthStr += `<option value=${i + 1}>${obj}</option>`
    });
    $("#g_month").html(monthStr);
}
function showHideOptionsDiv(opt) {
    $(`.options`).hide();
    $(`#${opt}_options`).show();
    $("#query_div,#query_button_div").hide();
    $("#chart_area,#Legend_chart_area,#legends").html("");
    $("#query").val("");
    //$(`#${opt}_chart_type`).html(chartTypesAvailable[opt]);
    $("#chart_type").html(chartTypesAvailable[opt]);
}
function showHideQueryBox(val) {
    if (val == "Hide Query") {
        $("#query_show").val("Show Query");
        $("#query_div").slideUp();
    } else {
        $("#query_show").val("Hide Query");
        $("#query_div").slideDown();
    }
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
    a: `<option value="tree">Tree chart</option><option value="bubble">Bubble chart</option>`,
    //a: `<option value="tree">Tree chart</option><option value="packing">Circle Packing chart</option><option value="bubble">Bubble chart</option>`,
    //b: `<option value="bubble">Bubble chart</option><option value="tree">Tree chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    b: `<option value="bubble">Bubble chart</option><option value="tree">Tree chart</option>`,
    c: `<option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option><option value="lollipop">Lollipop chart</option>`,
    d: `<option value="bubble">Bubble chart</option><option value="lollipop_single">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    e: `<option value="donut">Donut chart</option><option value="radialbar">Radial chart</option><option value="lollipop_single">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    f: `<option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option><option value="lollipop">Lollipop chart</option>`,
    //g: `<option value="radial_bar">Radial bar chart</option><option value="donut">Donut chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    g: `<option value="radial_bar_chart">Radial bar chart</option><option value="lollipop_single">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    h: `<option value="geomap">Geomap</option><option value="donut">Donut chart</option>`,
    i: `<option value="platelets">Platelets chart</option><option value="radialbar">Radial chart</option><option value="lollipop_single">Lollipop Chart</option><option value="area">Area chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`,
    j: `<option value="rect_area">Rectangular chart</option><option value="lollipop_single">Lollipop Chart</option><option value="bar">Bar chart</option><option value="column">Column chart</option><option value="line">Line chart</option>`
}
var nameMapping = { 
    InformationSystems: "IS", 
    ComputerSystemsOrganization: "CSO", 
    SoftwareEngineering: "SE", 
    WorldWideWeb: "WWW", 
    ArtificialIntelligence: "AI", 
    HumanCenteredComputing: "HCC", 
    TheoryOfComputations: "TOC", 
    SecurityAndPrivacy: "SEC" 
};
function sendRequest() {
    $("#loading_gif").show();
    $("#chart_area,#Legend_chart_area,#legends").html("");
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
            if (!results) {
                alert("No results found");
                return;
            }
            if (!(results instanceof Array)) {
                results = [results]
            }
            chartsMapper[chartType] && (chartsMapper[chartType])(results);
        }
    }
}
var chartType;
function reInitControls(queryVal, chartT) {
    $("#query").val(queryVal);
    $("#query_div,#query_button_div").show();
    $("#query_show").val("Hide Query");
    $("#chart_area,#Legend_chart_area,#legends").html("");
    chartType = chartT;
}