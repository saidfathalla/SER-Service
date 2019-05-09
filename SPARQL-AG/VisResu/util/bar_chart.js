function drawBarChart(data, xLabel) {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#chart_area")
        .append("svg")
        .attr("class", "bar_chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data

    // format the data
    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.salesperson; }));
    y.domain([0, d3.max(data, function (d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.salesperson); })
        .attr("width", x.bandwidth())
        //.attr("y", function (d) { return y(d.sales); })
        //.attr("height", function (d) { return height - y(d.sales); });
        .attr("height", function(d) { return height - y(0); }) // always equal to 0
        .attr("y", function(d) { return y(0); })
        //.attr("y", function (d) { return y(d.sales); })
        //.attr("height", function (d) { return height - y(d.sales); });



        svg.selectAll("rect")
       .transition()
       .duration(800)
       .attr("y", function(d) { return y(d.sales); })
       .attr("height", function(d) { return height - y(d.sales); })
       .delay(function(d,i){console.log(i) ; return(i*100)})



    svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (function (d) { return x(d.salesperson) + x.bandwidth() / 2; }))
        .attr("y", function (d) { return y(d.sales) + 1; })
        .attr("dy", ".75em")
        .text(function (d) { return d.sales; });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append('text')
        .attr("x", 900)
        .attr("y", 20)
        .attr("fill", "#000")
        .text(xLabel||"Country");

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .append('text')
        .attr("y", -10)
        .attr("fill", "#000")
        .text("Count");
}