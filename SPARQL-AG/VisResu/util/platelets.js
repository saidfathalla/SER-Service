function drawPlatelets(data) {
    var margin = { top: 40, left: 40, right: 40, bottom: 40 };
    width = 300;
    height = 300;
    radius = Math.min(width - 100, height - 100) / 2;
    var color = d4.scale.category10();
    var arc = d4.svg.arc()
        .outerRadius(radius - 230)
        .innerRadius(radius - 50)
        .cornerRadius(20);
    var arcOver = d4.svg.arc()
        .outerRadius(radius + 50)
        .innerRadius(0);

    var a = width / 2;
    var b = height / 2 - 90;
    var svg = d4.select("#chart_area").append("svg")
        .attr("viewBox", "0 0 " + width + " " + height / 2)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", "translate(" + a + "," + b + ")");

    div = d4.select("body")
        .append("div")
        .attr("class", "tooltip");
    var pie = d4.layout.pie()
        .sort(null)
        .value(function (d) { return d.population; })
        .padAngle(.02);
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .on("mousemove", function (d) {
            var mouseVal = d4.mouse(this);
            div.style("display", "none");
            div
                .html("Field:" + d.data.age + "</br>" + "Productivity:" + d.data.population)
                .style("left", (d4.event.pageX + 12) + "px")
                .style("top", (d4.event.pageY - 10) + "px")
                .style("opacity", 1)
                .style("display", "block");
        })
        .on("mouseout", function () { div.html(" ").style("display", "none"); })


    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) { return color(d.data.age); })
        .attr("d", arc);

    data.forEach(element => {
        $("#legends").append(`<span class="legend_rect" style="background-color:${color(element.age)}"></span><span style="float:left;">${element.actual}</span><br>`)
    });
}       