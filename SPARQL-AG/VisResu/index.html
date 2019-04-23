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
	<script src="index.js"></script>
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
</body>

</html>