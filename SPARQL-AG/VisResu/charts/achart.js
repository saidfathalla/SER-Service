function generateAQuery() {
    var field = $("#a_fields").val();
    var country = $("#a_country").val();
    var fDate = $("#a_from_date").val();
    var tDate = $("#a_to_date").val();

    var lastQueryParams = { "a_fields": field, "a_country": country, "a_from_date": fDate, "a_to_date": tDate };
    localStorage.setItem("last_query_params", JSON.stringify(lastQueryParams));
    localStorage.setItem("last_query_type", "a");

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
    FILTER(?eventtype = conference-ontology:Conference ||conference-ontology:Symposium||conference-ontology:Workshop)
    ?events conference-ontology:startDate ?sd.
    FILTER (STR(?sd) > "${fDate}" && STR(?sd) < "${tDate}")
    ?events seo:heldInCountry ?country.
    FILTER(?country = <${country}>)
    ?events seo:eventWebsite ?webpage.
    }
    `
    reInitControls(aQuery, "aChart");
}
function constructATreechart(results) {
    //var field = $("#a_fields").find("option:selected").html();
    //var nameMapping = {InformationSystems: "IS",ComputerSystemsOrganization: "CSO",SoftwareEngineering: "SE",WorldWideWeb: "WWW",ArtificialIntelligence: "AI",HumanCenteredComputing: "HCC",TheoryOfComputations: "TOC",SecurityAndPrivacy: "SEC"};
    //field = nameMapping[field];
    var params = JSON.parse(localStorage.getItem("last_query_params"));
    var field = (params.a_fields.split("#")[1]).split(">")[0];
    var treeData = {
         "name": nameMapping[field],
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

function constructABubbleChart(results) {
    var resultData = {
        name: "bubble",
        "children": [
            { "name": "Conference", "children": [] },
            { "name": "Symposium", "children": [] },
            { "name": "Workshop", "children": [] }
        ]
    }
    results.forEach(data => {
        var event = data.binding[0].uri.split("#")[1];
        var type = data.binding[1].uri;
        var eventLink = data.binding[5].literal || data.binding[5].uri;
        if (eventLink.indexOf("http://") == -1 && eventLink.indexOf("https://") == -1) {
            eventLink = `http://${eventLink}`;
        }
        if (type.indexOf("Conference") != -1) {
            resultData.children[0].children.push({ name: `${event}`, address: `${eventLink}` });
        } else if (type.indexOf("Symposium") != -1) {
            resultData.children[1].children.push({ name: `${event}`, address: `${eventLink}` });
        } else if (type.indexOf("Workshop") != -1) {
            resultData.children[2].children.push({ name: `${event}`, address: `${eventLink}` });
        }

    });
    drawBubbleMenu(resultData)
}

function constructACirclePacking(results) {    
    var field = $("#a_fields").find("option:selected").html();
    var parkingData = {
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
            parkingData.children[0].children.push({ name: `${event}`,size: 1 });
        } else if (type.indexOf("Symposium") != -1) {
            parkingData.children[1].children.push({ name: `${event}` ,size: 1});
        } else if (type.indexOf("Workshop") != -1) {
            parkingData.children[2].children.push({ name: `${event}`,size: 1 });
        }

    });
    circlePacking(parkingData)
}

function constructAChart(results) {
    var chartSubType = $("#chart_type").val();
    if (chartSubType == "bubble") {
        constructABubbleChart(results);
    }else if (chartSubType == "packing") {
        constructACirclePacking(results);
    } else {
        constructATreechart(results);
    }
}