function drawCountryGraph(flatArray) {
    var format = d3.format(",");
    // Set tooltips
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Count: </strong><span class='details'>" + format(d.population) + "</span>";
        })

    var margin = { top: 0, right: 0, bottom: 0, left: 0 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var domains=[0, 1, 5, 10, 20, 30, 40, 50];
    var domainColors=["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)"];

    var color = d3.scaleThreshold()
        .domain(domains)
        .range(domainColors);

    var path = d3.geoPath();

    var svg = d3.select("#chart_area")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map');

    var projection = d3.geoMercator()
        .scale(130)
        .translate([width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);

    svg.call(tip);

    data = returnWorldCountries();
    population = flatArray;

    var populationById = {};

    population.forEach(function (d) { populationById[d.id] = +d.population; });
    data.features.forEach(function (d) { d.population = populationById[d.id] || 0 });

    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function (d) { return color(populationById[d.id]); })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "white")
        .style('stroke-width', 0.3)
        .on('mouseover', function (d) {
            tip.show(d);
            d3.select(this)
                .style("opacity", 1)
                .style("stroke", "white")
                .style("stroke-width", 3);
        })
        .on('mouseout', function (d) {
            tip.hide(d);
            d3.select(this)
                .style("opacity", 0.8)
                .style("stroke", "white")
                .style("stroke-width", 0.3);
        });

    svg.append("path")
        .datum(topojson.mesh(data.features, function (a, b) { return a.id !== b.id; }))
        .attr("class", "names")
        .attr("d", path);

        console.log("populationById.....",populationById);

        valueObj={}

        for(var key in populationById){
            if(!valueObj[populationById[key]]){
                valueObj[populationById[key]]=true;
                var min,max
                for(var len=1;len<domains.length;len++){
                    if(populationById[key]<=domains[len] && populationById[key]>domains[len-1]){
                        min= domains[len-1];
                        max= domains[len];
                    }
                }

                $("#legends").append(`<span class="legend_rect" style="background-color:${color(populationById[key])}"></span><span style="float:left;">${min}-${max}</span><br>`)
            }
        }
}