function drawSingleLoliPop(data, maxVal, xlabel, ylabel) {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 40, left: 100 },
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#chart_area")
        .append("svg")
        .attr("class", "lolipop_single")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    // sort data
    data.sort(function (b, a) {
        return a.Value - b.Value;
    });


    var domain = [0, maxVal + 10];

    // Add X axis
    var x = d3.scaleLinear()
        .domain(domain)
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .append('text')
        .attr("x", 100)
        .attr("y", 480)
        .attr("fill", "#000")
        .text(xlabel || "Count");

    // Y axis
    var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) { return d.Country; }))
        .padding(1);

    svg.append("g")
        .call(d3.axisLeft(y))

    svg.append("g")
        .append('text')
        .attr("x", -100)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text(ylabel || "Series");

    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", x(0))
        .attr("x2", x(0))
        .attr("y1", function (d) { return y(d.Country); })
        .attr("y2", function (d) { return y(d.Country); })
        .attr("stroke", "grey")

    // Circles -> start at X=0
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", x(0))
        .attr("cy", function (d) { return y(d.Country); })
        .attr("r", "7")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")

    // Change the X coordinates of line and circle
    var dots = svg.selectAll("circle")
        .transition()
        .duration(2000)
        .attr("cx", function (d) { return x(d.Value); })
    svg.selectAll("circle")
        .on("mouseover", function (d, i) {
            svg.append("text")
                .attr("class", "title-text")
                .style("fill", "black")
                .text(d.Value)
                .attr("text-anchor", "middle")
                .attr("x", x(d.Value) + 20)
                .attr("y", y(d.Country));
        })
        .on("mouseout", function (d) {
            svg.select(".title-text").remove();
        })

    svg.selectAll("line")
        .transition()
        .duration(2000)
        .attr("x1", function (d) { return x(d.Value); })
}