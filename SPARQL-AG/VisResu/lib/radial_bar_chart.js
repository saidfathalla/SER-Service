function drawRadialBar(data,min,max) {
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 800 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom,
        innerRadius = 250,
        outerRadius = Math.max(width, height)/2;   // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object to the body of the page
    var svg = d3.select("#chart_area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")"); // Add 100 on Y translation, cause upper bars are longer

    // X scale
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing ?
        .domain(data.map(function (d) { return d.Country; })); // The domain of the X axis is the list of states.

    // Y scale
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([min-1,max+10]); // Domain of Y is from 0 to the max seen in the data

    // Add bars
    svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "#1010A0")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function (d) { return y(d['Value']); })
            .startAngle(function (d) { return x(d.Country); })
            .endAngle(function (d) { return x(d.Country) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius)
        )
        .attr("class", "monthArc")
        .attr("id", function (d, i) { return "monthArc_" + i; })
        .attr("title",function(d,i){return d.Value});

    //Append the month names to each slice
    svg.selectAll(".monthText")
        .data(data)
        .enter().append("text")
        .attr("class", "monthText")
        .append("textPath")
        .attr("xlink:href", function (d, i) { return "#monthArc_" + i; })
        .text(function (d) { return `${d.Country}(${d.Value})`; });

}