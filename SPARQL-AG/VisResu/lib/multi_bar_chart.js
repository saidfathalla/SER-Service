function drawMultiBarChart(models, id, single) {
    models = models.map(i => {
        i.model_name = i.model_name;
        return i;
    });

    var container = d3.select(id),
        width = 500,
        height = 300,
        margin = { top: 30, right: 20, bottom: 30, left: 50 },
        barPadding = .2,
        axisTicks = { qty: 5, outerSize: 0, dateFormat: '%m-%d' };

    var svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
    var xScale1 = d3.scaleBand();
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

    xScale0.domain(models.map(d => d.model_name));
    xScale1.domain(['field1', 'field2']).range([0, xScale0.bandwidth()]);
    yScale.domain([0, d3.max(models, d => d.field1 > d.field2 ? d.field1 : d.field2)]);

    var model_name = svg.selectAll(".model_name")
        .data(models)
        .enter().append("g")
        .attr("class", "model_name")
        .attr("transform", d => `translate(${xScale0(d.model_name)},0)`);

    /* Add field1 bars */
    model_name.selectAll(".bar.field1")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar field1")
        .style("fill", !single ? "#0000A0" :  "#008000")
        .attr("x", d => xScale1('field1'))
        .attr("y", d => yScale(d.field1))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.field1)
        })
        .append("title")
        .text(function (d) {
            return d.field1;
        });
    if (!single) {
        /* Add field2 bars */
        model_name.selectAll(".bar.field2")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar field2")
            .style("fill", "#008000")
            .attr("x", d => xScale1('field2'))
            .attr("y", d => yScale(d.field2))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
                return height - margin.top - margin.bottom - yScale(d.field2)
            })
            .append("title")
            .text(function (d) {
                return d.field2;
            });
    }

    /// Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(xAxis)
        .append('text')
        .attr("x", 420)
        .attr("y", 20)
        .attr("fill", "#000")
        .text("Year");

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 0)
        .attr("x",!single ? 0:50)
        .attr("fill", "#000")
        .text(!single ? "Count" : "Acceptance rate");

    var legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(20, -10)');

    if (!single) {
        var legendColors = ["#0000A0", "#008000"]
        legend.selectAll('rect')
            .data(["Submitted", "Accepted"])
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', function (d, i) {
                return i * 18;
            })
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', function (d, i) {
                return legendColors[i];
            });

        legend.selectAll('text')
            .data(["Submitted", "Accepted"])
            .enter()
            .append('text')
            .text(function (d) {
                return d;
            })
            .attr('x', 18)
            .attr('y', function (d, i) {
                return i * 18;
            })
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'hanging');
    }
}