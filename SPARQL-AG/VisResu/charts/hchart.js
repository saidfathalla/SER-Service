function generateHQuery() {
    var series = $("#h_series").val();

    var lastQueryParams = { "h_series": series};
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "h");

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
function constructHDonutChart(results){
    var resultModified = [];
    var count = 0;
    results.forEach(data => {
        var val = data.binding[2].literal["#text"];
        count = count + Number(val);
    });
    results.forEach(data => {
        var uri = data.binding[1].uri.split("/");
        uri = uri[uri.length - 1].replace("_", " ");
        var val = data.binding[2].literal["#text"];
        resultModified.push({ Country: `${uri}(${val})`, Count: Number(val) / count });
    });
    var donut = donutChart()
        .width(960)
        .height(500)
        .cornerRadius(3)
        .padAngle(0.015)
        .variable('Count')
        .category('Country');
    d3.select('#chart_area').datum(resultModified).call(donut);
}
function constructHCountryChart(results){
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
        var countryObj = countryList.find(con => con.name.indexOf(data.country) != -1);
        data.id = countryObj && countryObj.id;
        data.population = data.count;
        data.name = data.country;
        return data;
    });
    drawCountryGraph(flatArray);
}
function constructHChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "geomap") {
        constructHCountryChart(results);
    } else {
        constructHDonutChart(results)
    }
}