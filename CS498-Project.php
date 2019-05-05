<?php
   $ispost = false;
   $networkfilter = '';
   
   $agefilter = '';
   
   function queryfilter(&$ispost,$id_string){
     if(isset($_GET[$id_string])){
       if(strlen($_GET[$id_string]) < 1){
         return '';
       } else {
         $ispost = true;
         return $_GET[$id_string];
       }
     } else {
       return '';
     }
   }
   
   function dropOption($filter,$val,$showString='SameAsVal'){
     $selectedString = '';
     if($filter == $val){
       $selectedString = ' selected ';
     }
     if($showString == 'SameAsVal'){
       $showString = $val;
     }
     $echoString = "<option value=\"" . $val . "\"" . $selectedString . ">" . $showString . "</option>";
     echo($echoString);
   }
   
   //$callscrimecategory $callshour $callsmonth
   
   $callscrimecategory = queryfilter($ispost,'callscrimecategory');
   $callshour = queryfilter($ispost,'callshour');
   $callsmonth = queryfilter($ispost,'callsmonth');

 //'$incidentscategory' '$incidentsdayofweek' '$incidentspddist' $incidentsmonth $incidentshour incidents"
 
   $incidentscategory = queryfilter($ispost,'incidentscategory');
   $incidentsdayofweek = queryfilter($ispost,'incidentsdayofweek');
   $incidentspddist = queryfilter($ispost,'incidentspddist');

   $incidentsmonth = queryfilter($ispost,'incidentsmonth');
   $incidentshour = queryfilter($ispost,'incidentshour');

  
   
   ?>
<!DOCTYPE html>

   
   
   <html xmlns="http://www.w3.org/1999/xhtml" class="fp-enabled" style="overflow: hidden; height: 100%;">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>A Big Data Analytics Solution</title>
      <meta name="author" content="Team 27 of CS498-CCA 2019">
      <meta name="Resource-type" content="Document">
      <link rel="stylesheet" type="text/css" href="./CS498-Project_files/fullpage.css">
      <link rel="stylesheet" type="text/css" href="./CS498-Project_files/examples.css">
      <style>
         /* Style for our header texts
         * --------------------------------------- */
         h1{
         font-size: 3em;
         font-family: arial,helvetica;
         color: #2c2d2d;
         margin:0;
         }
         .intro {
         color: #2c2d2d;
		 font-size: 20px;
         }
         /* Centered texts in each section
         * --------------------------------------- */
         .section{
		 text-align:left;
         border-bottom: 6px solid grey;
		 /*
		 border-style: outset;
		 border-width: 10;
		 border-bottom: 8px solid grey;
         */
		 }
		 .section1
		 {
         text-align:center;
         }
		 
		 .button1 {
			background-color: #00a2e8; /* ededed 008CBA  017da5 017aa3  029bce 00a2e8*/
			color: #ededed;
			Outline: none;
			border-radius: 12px;
			 /* border-radius: 12px; */
			padding: 15px 32px;
			text-align: center;
			font-size: 28px;
			/*font-weight:bold;*/
			-webkit-transition-duration: 0.4s; /* Safari */
			transition-duration: 0.4s;
		}

		.button1:hover {
			background-color: #017aa3; /* blue */
			color: white;
			cursor:pointer;
			/* border-radius: 12px; */
			 border: 0;
			border-width: 0;
			
		}
		
	/*	.bodyText {
			font-size: 16px;
LINE-HEIGHT:30px;
		}*/
		.bodyText {
		  font-size: 13.5px;
		  font-family: 'Raleway', sans-serif;
		/*  -webkit-margin-before: 0.2em;
		  -webkit-margin-after: 0.2em;*/
		 /* color:#404040; */
		 color:#262626;
		  text-align: justify;
LINE-HEIGHT:16px;

		}
		
		/************************* overview ****************/
		
		form {
		  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		  position: absolute;
		  left: 10px;
		  top: 10px;
		}
		label {
		  display: block;
		}

		body{
		  font-family: sans-serif;  
		}

		.checkbox {
			margin: 50px auto;
			position: relative;
			display: block;
			width: 100px;
		}

		 .yaxis line {
		  stroke: lightgrey;
		  stroke-opacity: 0.3;
		  shape-rendering: crispEdges;
		}

		.axis line, .axis, .axis path {
		   shape-rendering: crispEdges;
		   stroke-opacity: 0.3;
		   stroke: lightgrey;
		   
		 }
		 
		 .viz4yaxis{
		   shape-rendering: crispEdges;
		   stroke-opacity: 0.1;
		   stroke: darkgrey;
		 }
		 
		 .viz4xaxis1{
		   shape-rendering: crispEdges;
		   stroke-opacity: 0.2;
		   stroke: lightgrey;
		 }
		 .viz4annoto1 {
		    
		 }
		 /*
		 .lineN, .lineS, .lineE, .lineW, .lineC, .lineU {
		   shape-rendering: crispEdges;
		 }*/
		 
		 .toolTip {
		  position: absolute;
		  display: none;
		  min-width: 120px;
		  height: auto;
		  background: none repeat scroll 0 0 #f4f4f4;
		  border: 2px solid darkgrey;
		  padding: 7px;
		  text-align: left;
		  border-radius: 5px;
		  font-size: 11px;
		  pointer-events: none;
		}
		
		.cirLabels{
		pointer-events: none;
		}
		 .toolTip2 {
		  position: absolute;
		  display: none;
		  min-width: 120px;
		  height: auto;
		  background: none repeat scroll 0 0 #f4f4f4;
		  border: 2px solid darkgrey;
		  padding: 7px;
		  text-align: left;
		  border-radius: 5px;
		  font-size: 11px;
		  pointer-events: none;
		}
		
		 .anno6, .anno606, .anno607, .anno608, .viz60annoto5, .viz60annoto6, .viz60annoto7 {
		  min-width: 20px;
		  max-width: 20px;
		  text-align: right;
		  font-size: 11px;
		}
		
		.cirLabels {
			font-size: 16px;
		}
		
		 .anno7 {
		  min-width: 20px;
		  max-width: 20px;
		  text-align: right;
		  font-size: 11px;
		}

		 .anno8 {
		  min-width: 20px;
		  max-width: 20px;
		  text-align: right;
		  font-size: 11px;
		}

		 .annoto5 {
		  min-width: 20px;
		  max-width: 20px;
		  text-align: right;
		  font-size: 11px;
		}
		 .annoto6 {
		  min-width: 20px;
		  max-width: 20px;
		  text-align: right;
		  font-size: 11px;
		}
		
		 .vizlegendt, .viz4legendt {
		   font-size: 13px;
		 }
		 .bublgnd {
		   font-size: 13px;
		 }
		 .viz2annoto5, .viz2annoto6, .viz2annoto7 {
		  min-width: 20px;
		  max-width: 20px;
		  text-align: right;
		  font-size: 11px;
		}	

		 .viz4annoto5, .viz4annoto6, .viz4annoto7 , .viz4annoto55, .viz4annoto66, .viz4annoto77{
		  min-width: 20px;
		  max-width: 20px;
		  text-align: right;
		  font-size: 11px;
		}
		
		 .viz1title {
		  font-size: 20px;
		}
		
		 .legendmale3 {
		  font-size: 15px;
		}

		 .legendfemale3 {
		  font-size: 15px;
		}

		 .legendstk3 {
		  font-size: 15px;
		}

		 .legendgrp3 {
		  font-size: 15px;
		}
		
		 .legendviz2 {
		  font-size: 12px;
		  }
		
		 .yearButtonviz2{

		 }
		 
		 .yearButtonviz2Label, .yearButtonviz6Label {
			pointer-events: none;
		 }
		.noselectzzzzzz {
		  -webkit-touch-callout: none; /* iOS Safari */
			-webkit-user-select: none; /* Safari */
			 -khtml-user-select: none; /* Konqueror HTML */
			   -moz-user-select: none; /* Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none; /* Non-prefixed version, currently
										  supported by Chrome and Opera */
		}

		/************************* overview ****************/
		
/* Create four equal columns that floats next to each other */
.column {
  float: left;
  width: 23%;
  padding: 10px;
  height: 550px; /* Should be removed. Only for demonstration */
  		  font-size: 13.5px;
		  font-family: 'Raleway', sans-serif;

		 color:#262626;
		  text-align: justify;
		  
}
.column3 {
  float: left;
  width: 45%;
  padding: 10px;
  height: 550px; /* Should be removed. Only for demonstration */
  		  font-size: 13.5px;
		  font-family: 'Raleway', sans-serif;

		 color:#262626;
		  text-align: justify;
}

/*
		.bodyText {
		  font-size: 13.5px;
		  font-family: 'Raleway', sans-serif;

		 color:#262626;
		  text-align: justify;
LINE-HEIGHT:16px;

		}
		*/

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}		
		
		
		
.table1 {
  width: 100%;
  border: 10px solid #e7ecea;
  background: #e7ecea;
  padding: 10px;
  text-align: left;
  
  		  

		 color:#262626;
		  text-align: justify;  
  
}
.tr1 {
  padding: 6px;
}
.td1 {
  padding: 6px;
}

		
		
      </style>
      <!--script type="text/javascript" charset="utf-8" async="" src="/var/www/html/MK/CS498Final/CS498-Project_files/button.bf357a6ba1a5f1fa0ddb61377ae3add5.js.download"></script-->
	  
    <script type="text/javascript" src="http://code.jquery.com/jquery 2.1.4.min.js"></script>  

	
   </head>
   <body class="fp-viewing-firstPage" style="overflow: hidden; height: 100%;">
      <div id="fullpage" class="fullpage-wrapper" style="height: 100%; position: relative; touch-action: none; transform: translate3d(0px, 0px, 0px); transition: all 700ms ease;">
         <div class="section active fp-section" id="section1" data-fp-styles="null" data-anchor="firstPage" style="height: 100%; background-color: white;background:url('bckImage1.png');background-repeat: no-repeat;background-position: center;background-attachment: fixed; background-size:cover; ">
               <div class="intro" align="center"style="height: 40%;" onclick="window.location='./CS498-Project.html#secondPage'">
                  <h1>San Francisco Police Calls and Incidents</h1>
					<h2>A Big Data Solution to analyze and explore data</h2>

				  <br>
                  <button class="button1" type="button">About this Solution</button>
               </div>
         </div>
         <div class="section fp-section fp-table" id="section2" data-fp-styles="null" data-anchor="secondPage" style="width: 100%; height: 00%; background-color: white; padding-left: 3%; padding-right: 8%;">
			<div class="fp-tableCell"  style="height:662px;">
							<div style="float: right; width: 50%;">
								<div style="padding-left:7%;">
								<!--p style="font-size: 40px; font-weight: bold; color:#1a1a1a;">&nbsp;</p!-->
								
									
									<!--p style="font-size: 16px; font-weight: bold; color:red;">Caution: </p!-->
									<p class="bodyText"><font color="red"><strong>Caution:</strong></font> This project is best viewed on desktops using Chrome (preferred), Firefox or Safari. It is not suitable for viewing on phones or tables; you might see overlapping contents on them.</p>
								</div>
							</div>
							<div style="float: left; width: 50%;">
								<p style="font-size: 40px; font-weight: bold; color:#1a1a1a;">Introduction</p><br>
								<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Objective:</p>
								<p class="bodyText">
								San Francisco Police Department (SFPD) serves about 1.5 million people across its 49 square miles area. They are tasked with responding to emergency and non-emergency cases, in assisting Fire Department in fire suppression and also in assisting paramedics during emergency cases. SFPDs operation structure mainly comprises of 10 stations, 2108 officers, 338 patrol cars. The people to police ratio is pretty high and despite adding additional staff to cater to growing population in the area the departments performance scorecard for year 2018 indicates that the average dispatch to on-scene time has only gone up from 5 minutes to 5.5 minutes and has hardly met the target of 4 minutes. One of the key reasons for this has been the lack of tools and systems to anticipate, plan and prepare based on historical data.  
The main objective of our project is to provide a comprehensive and easy-to-use analytical solution on Police Calls and Incidents using Big Data tools stack to help supervisors and decision makers draw valuable insights from data and plan well and dispatch resources effectively and efficiently.



</p>



<br>
								<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Dataset: </p>
								<p class="bodyText">For this project, we will be using ‘San Francisco Police Calls for Service and Incidents’ dataset publicly available in Kaggle site.
								
The dataset contains information on below two main categories, <br>
&bull;&nbsp;&nbsp;<strong>Police Calls for Service:</strong> This contains Police calls for service that were made for criminal activities. It contains calls from 31 March, 2016 to present. There are around 2.28 million calls in the dataset. Some of the main attributes include - crime type, call date and time, types of assitance that was dispatched, location details, etc. <br>
&bull;&nbsp;&nbsp;<strong>Police Incident reports:</strong> This contains the incident reports filed by officers or by individuals through the self-service online portal. The dataset contains incident reports starting from January 1, 2018 onward to present. There are around 2.22 millions incident reports in the dataset. Some of the main attributes include – incident Id, incident category, day-of-week, location where incident was reported, resolution that was provided for the incident, etc. 
								
								
								</p><br>
								<br>

								</div>			
						</div>
         </div>
		 
		 <div class="section fp-section fp-table" id="section3" style="width: 100%; height: 662px; padding-left: 3%; padding-right: 7%; background-color: rgb(242, 242, 242);"  data-anchor="thirdPage">
		 <div class="fp-tableCell" style="height:662px;">

				<div style="font-size: 40px; font-weight: bold; color:#1a1a1a;">Analytical Insights - Incidents</div><br>
					
<div class="row">
  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Incidents by Category:</p>
		<div class="row"> <br><img src="incidents_by_ctgry.PNG">
		</div>
		<div class="row"> In the above table, we can see that almost a fifth of the incidents fell under Larceny/Theft, so department can conduct more training sessions for their officials in these areas or hire more contractor detectives who specialize in these areas.
		</div>		
  </div>

  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Incidents by Month:</p>
		<div class="row"> <br><img src="incidents_by_month.PNG">
		</div>
		<div class="row"> Above table suggests that during the months of January, March and October the incidents count are high and so department (again) should have all decks on board during these months; department should instruct officers not to plan leaves during these months.
		</div>		
  </div>

  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Incidents by Day of Week:</p>
		<div class="row"> <br><img src="incidents_by_day.PNG">
		</div>
		<div class="row"> Highest number of incidents were reported during Friday, Saturday and surpisingly in the middle of the week – Wednesday. We can use this insight and have more contractor detectives on duty only during these days, this can help department to effectively manage billing time and help save cost on contractor detectives
		</div>		
  </div>

  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Incidents by PD District:</p>
		<div class="row"> <br><img src="incidents_by_pd.PNG">
		</div>
		<div class="row"> From above table we can infer that 'SOUTHER', 'MISSION', 'NORTHER' & 'CENTRAL' districts are high risk areas and so SFPD can proportionately deploy more officers in these localities. Department can also plan awareness programs for people here to help bring down the incidents rate
		</div>		
  </div>
  
  
</div>

		 
		 




				
			</div>
         </div>

		 <div class="section fp-section fp-table" id="section4" style="width: 100%; height: 662px; padding-left: 1%; padding-right: 5%; background-color: rgb(242, 242, 242);"  data-anchor="fourthPage">
		 <div class="fp-tableCell" style="height:662px;">
		

				<div style="font-size: 40px; font-weight: bold; color:#1a1a1a;">Analytical Insights - Incidents (cont'd)</div><br>
					
<div class="row">
  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Incidents by Time of Day:</p>
		<div class="row"> <br><img src="incidents_by_time.PNG">
		</div>
		<div class="row"> Highest number of incidents were reported during evening hours. From this we can draw that it would be efficient to have more officers on duty during evening hours
		</div>		
  </div>

  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Incidents by Resolution:</p>
		<div class="row"> <br><img src="incidents_by_resolution.PNG">
		</div>
		<div class="row"> For about one third of the incidents there was no specific resolutoin needed or required. These could be false alarms or cases where all that officers had to do was showup for incident/situation to diffuse on it’s own. Department can have rookie cops handle these occasions.
		</div>		
  </div>

  <div class="column3" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Incidents % across Category & Day:</p>
		<div class="row"> 
		<!--img src="incidents_by_ctgry_and_day_percent.PNG"-->
		<svg class="stckdbar" id="stckdbar" width="600" height="400"></svg>
The chart above compares incidents count by Category Vs Day of week. From this figure we can clearly see that majority of DUI cases occurred during Saturday and Sunday. Department can use this insight to instruct their officials to carry breath analyzers (or other related equipments) without fail while patroling on these days, so that they don’t have to bring-in the suspect to station to check further.
		
<script src="https://d3js.org/d3.v4.min.js"></script>
<script>
// create the svg
var svg = d3.select(".stckdbar"),
    margin = {top: 20, right: 20, bottom: 130, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set x scale
var x = d3.scaleBand()
    .rangeRound([0, width-75])
    .paddingInner(0.05)
    //.align(0.1)
	;

// set y scale
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// set the colors
var z = d3.scaleOrdinal()
    .range(["#b07aa1", "#edc948", "#59a14f", "#76b7b2", "#e15759", "#f28e2b", "#4e79a7"]);

// load the csv and create the chart
//d3.csv("age-groups.csv", function(d, i, columns) {
d3.csv("incidents_ctgry_day.csv", function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  data.sort(function(a, b) { return b.total - a.total; });
  x.domain(data.map(function(d) { return d.State; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })-10]).nice();
  z.domain(keys);


				
  var floatFormat = d3.format(".2f");
  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.State); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      //console.log(d);
      var xPosition = d3.mouse(this)[0] - 5 +10;
      var yPosition = d3.mouse(this)[1] - 5;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")")
	  //.attr("class", "toolTip")
	  //.style("opacity", .9)
	  ;
      //tooltip.html(""+d.data.State+"<br>Percent:"+ floatFormat(d[1]-d[0]) +"%"
	      tooltip.select("text").text(""+ floatFormat(d[1]-d[0]) +"%"

	
	  )
              ;
    });

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
	  .selectAll("text")
    	.style("font-size", "10px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );

	  
	  
	  
	  ;

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z)
	  
	  
;

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5)

	
	;

  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")

	
	;

</script>		
		
		
		
		</div>
		<div class="row"> 
		</div>		
  </div>


  
  
</div>

		 		
		
		
		
		
			</div>
         </div>
		 <div class="section fp-section fp-table" id="section5" style="width: 100%; height: 662px; padding-left: 3%; padding-right: 7%; background-color: rgb(242, 242, 242);"  data-anchor="fifthPage">
			<div class="fp-tableCell" style="height:662px;">

			

				<div style="font-size: 40px; font-weight: bold; color:#1a1a1a;">Analytical Insights - Police Calls</div><br>
					
<div class="row">
  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Calls by Category:</p>
		<div class="row"> <br><img src="call_by_ctgry.PNG">
		</div>
		<div class="row"> Above table helps to visualize the crime types that are more prevalent and that need attention. Example, Passing Calls (increased enforcement and crime prevention in response to immenent threat) and Traffic Stop violation calls top the list. 
		</div>		
  </div>

  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Calls by City:</p>
		<div class="row"> <br><img src="calls_by_city.PNG">
		</div>
		<div class="row"> The above stats indicate that majority of calls came from San Fransico city. Department can hence deploy more resouces in this city. 
		</div>		
  </div>

  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Calls by Month:</p>
		<div class="row"> <br><img src="calls_by_month.PNG">
		</div>
		<div class="row"> In the above table, we can see that summer and early spring seasons saw high volume of calls and so department can use this insight and ask the call-takers not to plan leaves during these months. 
		</div>		
  </div>

  <div class="column" style="background-color:#ffffff;">
	<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Calls by Time of Day:</p>
		<div class="row"> <br><img src="calls_by_time.PNG">
		</div>
		<div class="row"> Evening hours – 4PM to 7PM – saw high volume of calls. This insight can be used to plan the size of work force during day and night shifts. Department can have more call-takers during evening hours.
		</div>		
  </div>


  </div>	
			
			
			
			
		
			</div>
         </div>	 
		 
		 <div class="section fp-section fp-table" id="section6" style="width: 100%; height: 662px; padding-left: 1%; padding-right: 5%; background-color: rgb(242, 242, 242);"  data-anchor="sixthPage">
		 <div class="fp-tableCell" style="height:662px;" >

				<div style="font-size: 40px; font-weight: bold; color:#1a1a1a;">Search/Predict Stats</div><br>

		<!--div style="font-size: 40px; font-weight: bold; color:#1a1a1a;">Search/Predict Stats</div-->
<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Enter/Select Details to estimate Incidents Volume:</p>
								
<table class="table1">
	<!--tr class="tr1" align="left"> <td class="td1">Enter/Select Details to estimate Incidents Volume</td></tr-->

	
	<form >
	<tr class="tr3" align="left">
		<td class="td3">
			  <!-- Incident Category:<br> <input type="text" name="incidentscategory" id="incidentscategory">	-->

			  <label for="incidentscategory">Incident Category:<br> 
			  <select name="incidentscategory" id="incidentscategory">
				 <option value=""></option>
					<?php dropOption($incidentscategory,'ARSON'); ?>
					<?php dropOption($incidentscategory,'ASSAULT'); ?>
					<?php dropOption($incidentscategory,'BAD CHECKS'); ?>
					<?php dropOption($incidentscategory,'BRIBERY'); ?>
					<?php dropOption($incidentscategory,'BURGLARY'); ?>
					<?php dropOption($incidentscategory,'DISORDERLY CONDUCT'); ?>
					<?php dropOption($incidentscategory,'DRIVING UNDER THE INFLUENCE'); ?>
					<?php dropOption($incidentscategory,'DRUG/NARCOTIC'); ?>
					<?php dropOption($incidentscategory,'DRUNKENNESS'); ?>
					<?php dropOption($incidentscategory,'EMBEZZLEMENT'); ?>
					<?php dropOption($incidentscategory,'EXTORTION'); ?>
					<?php dropOption($incidentscategory,'FAMILY OFFENSES'); ?>
					<?php dropOption($incidentscategory,'FORGERY/COUNTERFEITING'); ?>
					<?php dropOption($incidentscategory,'FRAUD'); ?>
					<?php dropOption($incidentscategory,'GAMBLING'); ?>
					<?php dropOption($incidentscategory,'KIDNAPPING'); ?>
					<?php dropOption($incidentscategory,'LARCENY/THEFT'); ?>
					<?php dropOption($incidentscategory,'LIQUOR LAWS'); ?>
					<?php dropOption($incidentscategory,'LOITERING'); ?>
					<?php dropOption($incidentscategory,'MISSING PERSON'); ?>
					<?php dropOption($incidentscategory,'NON-CRIMINAL'); ?>
					<?php dropOption($incidentscategory,'OTHER OFFENSES'); ?>
					<?php dropOption($incidentscategory,'PORNOGRAPHY/OBSCENE MAT'); ?>
					<?php dropOption($incidentscategory,'PROSTITUTION'); ?>
					<?php dropOption($incidentscategory,'RECOVERED VEHICLE'); ?>
					<?php dropOption($incidentscategory,'ROBBERY'); ?>
					<?php dropOption($incidentscategory,'RUNAWAY'); ?>
					<?php dropOption($incidentscategory,'SECONDARY CODES'); ?>
					<?php dropOption($incidentscategory,'SEX OFFENSES, FORCIBLE'); ?>
					<?php dropOption($incidentscategory,'SEX OFFENSES, NON FORCIBLE'); ?>
					<?php dropOption($incidentscategory,'STOLEN PROPERTY'); ?>
					<?php dropOption($incidentscategory,'SUICIDE'); ?>
					<?php dropOption($incidentscategory,'SUSPICIOUS OCC'); ?>
					<?php dropOption($incidentscategory,'TREA'); ?>
					<?php dropOption($incidentscategory,'TRESPASS'); ?>
					<?php dropOption($incidentscategory,'VANDALISM'); ?>
					<?php dropOption($incidentscategory,'VEHICLE THEFT'); ?>
					<?php dropOption($incidentscategory,'WARRANTS'); ?>
					<?php dropOption($incidentscategory,'WEAPON LAWS'); ?>

			  </select>


			  
		</td>
		<td class="td3" >
			
			<!--  Day of Week:<br><input type="text" name="incidentsdayofweek" id="incidentsdayofweek"-->
			  
			  
			  <label  for="incidentsdayofweek">Day of Week:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> 
			  <select name="incidentsdayofweek" id="incidentsdayofweek">
				 <option value=""></option>
					<?php dropOption($incidentsdayofweek,'Sunday'); ?>
					<?php dropOption($incidentsdayofweek,'Monday'); ?>
					<?php dropOption($incidentsdayofweek,'Tuesday'); ?>
					<?php dropOption($incidentsdayofweek,'Wednesday'); ?>
					<?php dropOption($incidentsdayofweek,'Thursday'); ?>
					<?php dropOption($incidentsdayofweek,'Friday'); ?>
					<?php dropOption($incidentsdayofweek,'Saturday'); ?>

			  </select>
			  


			  
		</td>
		<td class="td3">
			  <!-- PD District:<br><input type="text" name="incidentspddist" id="incidentspddist"-->
			  
			  <label for="incidentspddist">PD District:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> 
			  <select name="incidentspddist" id="incidentspddist">
				 <option value=""></option>
					<?php dropOption($incidentspddist,'BAYVIEW'); ?>
					<?php dropOption($incidentspddist,'CENTRAL'); ?>
					<?php dropOption($incidentspddist,'INGLESIDE'); ?>
					<?php dropOption($incidentspddist,'MISSION'); ?>
					<?php dropOption($incidentspddist,'NORTHERN'); ?>
					<?php dropOption($incidentspddist,'PARK'); ?>
					<?php dropOption($incidentspddist,'RICHMOND'); ?>
					<?php dropOption($incidentspddist,'SOUTHERN'); ?>
					<?php dropOption($incidentspddist,'TARAVAL'); ?>
					<?php dropOption($incidentspddist,'TENDERLOIN'); ?>


			  </select>
			  
			  
		</td>
		<td class="td3">
			 <!-- Month:<br> <input type="text" name="incidentsmonth" id="incidentsmonth"-->
			  
			  <label for="incidentsmonth">Month:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> 
			  <select name="incidentsmonth" id="incidentsmonth">
				 <option value=""></option>
                     <?php dropOption($incidentsmonth,'1'); ?>
                     <?php dropOption($incidentsmonth,'2'); ?>
                     <?php dropOption($incidentsmonth,'3'); ?>
                     <?php dropOption($incidentsmonth,'4'); ?>
                     <?php dropOption($incidentsmonth,'5'); ?>
                     <?php dropOption($incidentsmonth,'6'); ?>
                     <?php dropOption($incidentsmonth,'7'); ?>
                     <?php dropOption($incidentsmonth,'8'); ?>
                     <?php dropOption($incidentsmonth,'9'); ?>
                     <?php dropOption($incidentsmonth,'10'); ?>
                     <?php dropOption($incidentsmonth,'11'); ?>
                     <?php dropOption($incidentsmonth,'12'); ?>


			  </select>			  
			  
			  
		</td>
		<td class="td3">
			  <!--Hour:<br> <input type="text" name="incidentshour" id="incidentshour"-->
			  
			  <label for="incidentshour">Hour:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> 
			  <select name="incidentshour" id="incidentshour">
				 <option value=""></option>
                     <?php dropOption($incidentshour,'0'); ?>
                     <?php dropOption($incidentshour,'1'); ?>
                     <?php dropOption($incidentshour,'2'); ?>
                     <?php dropOption($incidentshour,'3'); ?>
                     <?php dropOption($incidentshour,'4'); ?>
                     <?php dropOption($incidentshour,'5'); ?>
                     <?php dropOption($incidentshour,'6'); ?>
                     <?php dropOption($incidentshour,'7'); ?>
                     <?php dropOption($incidentshour,'8'); ?>
                     <?php dropOption($incidentshour,'9'); ?>
                     <?php dropOption($incidentshour,'10'); ?>
                     <?php dropOption($incidentshour,'11'); ?>
                     <?php dropOption($incidentshour,'12'); ?>
                     <?php dropOption($incidentshour,'13'); ?>
                     <?php dropOption($incidentshour,'14'); ?>
                     <?php dropOption($incidentshour,'15'); ?>
                     <?php dropOption($incidentshour,'16'); ?>
                     <?php dropOption($incidentshour,'17'); ?>
                     <?php dropOption($incidentshour,'18'); ?>
                     <?php dropOption($incidentshour,'19'); ?>
                     <?php dropOption($incidentshour,'20'); ?>
                     <?php dropOption($incidentshour,'21'); ?>
                     <?php dropOption($incidentshour,'22'); ?>
                     <?php dropOption($incidentshour,'23'); ?>

			  </select>	

			  
			  
		</td>

		</tr>

	<tr class="tr1" align="left"> <td class="td1"></td></tr>

	<tr class="tr3" align="left">
		<td class="td3">

				<br><input type="submit" name="EstimateIncidentsVolume" id="EstimateIncidentsVolume" value="Estimate Incidents Volume" />

		</td>
		<td class="td3"></td>
	</tr>
			</form>
			<br>
<tr class="tr3" align="left">
		<td class="td3">

				
 <?php
	if(isset($_GET['EstimateIncidentsVolume'])){
	   $output = shell_exec("/var/www/html/MK/CS498Final/cca_ml.py dummy dummy dummy '$incidentscategory' '$incidentsdayofweek' '$incidentspddist' $incidentsmonth $incidentshour incidents");
	   echo "<br><br>";
	   echo $output;	
	   //echo "hello";
	   	echo "<br><br>";

	}
	//echo "world";
	?>					

		</td>
		<td class="td3"></td>
	</tr>
	
  </table>							

<br><br><br><br>

<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Enter/Select Details to estimate Calls Volume:</p>
								
<table class="table1">
	<!--tr class="tr1" align="left"> <td class="td1">Enter/Select Details to estimate Incidents Volume</td></tr-->
	<form >
	<tr class="tr3" align="left">
		<td class="td3">
			  <!--Crime Category:<br> <input type="text" name="callscrimecategory" id="callscrimecategory"-->
			  
			  <label for="callscrimecategory">Crime Category:<br> 
			  <select name="callscrimecategory" id="callscrimecategory">
				 <option value=""></option>
                     <?php dropOption($callscrimecategory,'Traffic Stop'); ?>
                     <?php dropOption($callscrimecategory,'Suspicious Person'); ?>
                     <?php dropOption($callscrimecategory,'Homeless Complaint'); ?>
                     <?php dropOption($callscrimecategory,'Audible Alarm'); ?>
                     <?php dropOption($callscrimecategory,'Well Being Check'); ?>
                     <?php dropOption($callscrimecategory,'Suspicious Vehicle'); ?>
                     <?php dropOption($callscrimecategory,'Trespasser'); ?>
                     <?php dropOption($callscrimecategory,'Fight No Weapon'); ?>
                     <?php dropOption($callscrimecategory,'Noise Nuisance'); ?>
                     <?php dropOption($callscrimecategory,'Auto Boost / Strip'); ?>
                     <?php dropOption($callscrimecategory,'Traf Violation Cite'); ?>
                     <?php dropOption($callscrimecategory,'Mentally Disturbed'); ?>
                     <?php dropOption($callscrimecategory,'Assault / Battery'); ?>
                     <?php dropOption($callscrimecategory,'Petty Theft'); ?>
                     <?php dropOption($callscrimecategory,'Burglary'); ?>
                     <?php dropOption($callscrimecategory,'Drugs'); ?>
                     <?php dropOption($callscrimecategory,'Stolen Vehicle'); ?>
                     <?php dropOption($callscrimecategory,'Threats / Harassment'); ?>
                     <?php dropOption($callscrimecategory,'Vandalism'); ?>
                     <?php dropOption($callscrimecategory,'Traf Violation Tow'); ?>
                     <?php dropOption($callscrimecategory,'Veh Accident'); ?>
                     <?php dropOption($callscrimecategory,'Fraud'); ?>
                     
                     


			  </select>			  
		</td>
		<td class="td3">
			
			 <!-- Month:<br> <input type="text" name="callsmonth" id="callsmonth"-->
			  
			  <label for="callsmonth">Month:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> 
			  <select name="callsmonth" id="callsmonth">
				 <option value=""></option>
                     <?php dropOption($callsmonth,'1'); ?>
                     <?php dropOption($callsmonth,'2'); ?>
                     <?php dropOption($callsmonth,'3'); ?>
                     <?php dropOption($callsmonth,'4'); ?>
                     <?php dropOption($callsmonth,'5'); ?>
                     <?php dropOption($callsmonth,'6'); ?>
                     <?php dropOption($callsmonth,'7'); ?>
                     <?php dropOption($callsmonth,'8'); ?>
                     <?php dropOption($callsmonth,'9'); ?>
                     <?php dropOption($callsmonth,'10'); ?>
                     <?php dropOption($callsmonth,'11'); ?>
                     <?php dropOption($callsmonth,'12'); ?>


			  </select>	

			  </td>
		<td class="td3">
			  <!--Hour:<br> <input type="text" name="callshour" id="callshour"-->
			  
			  <label for="callshour">Hour:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> 
			  <select name="callshour" id="callshour">
				 <option value=""></option>
                     <?php dropOption($callshour,'0'); ?>
                     <?php dropOption($callshour,'1'); ?>
                     <?php dropOption($callshour,'2'); ?>
                     <?php dropOption($callshour,'3'); ?>
                     <?php dropOption($callshour,'4'); ?>
                     <?php dropOption($callshour,'5'); ?>
                     <?php dropOption($callshour,'6'); ?>
                     <?php dropOption($callshour,'7'); ?>
                     <?php dropOption($callshour,'8'); ?>
                     <?php dropOption($callshour,'9'); ?>
                     <?php dropOption($callshour,'10'); ?>
                     <?php dropOption($callshour,'11'); ?>
                     <?php dropOption($callshour,'12'); ?>
                     <?php dropOption($callshour,'13'); ?>
                     <?php dropOption($callshour,'14'); ?>
                     <?php dropOption($callshour,'15'); ?>
                     <?php dropOption($callshour,'16'); ?>
                     <?php dropOption($callshour,'17'); ?>
                     <?php dropOption($callshour,'18'); ?>
                     <?php dropOption($callshour,'19'); ?>
                     <?php dropOption($callshour,'20'); ?>
                     <?php dropOption($callshour,'21'); ?>
                     <?php dropOption($callshour,'22'); ?>
                     <?php dropOption($callshour,'23'); ?>

			  </select>	
			  </td>

		</tr>

	<tr class="tr1" align="left"> <td class="td1"></td></tr>

	<tr class="tr3" align="left">
		<td class="td3">

				<br><input type="submit" name="EstimateCallsVolume" id="EstimateCallsVolume" value="Estimate Calls Volume" />

		</td>
		<td class="td3"></td>
	</tr>
			</form>
			<br>
<tr class="tr3" align="left">
		<td class="td3">

				
 <?php
	if(isset($_GET['EstimateCallsVolume'])){
	   $output = shell_exec("/var/www/html/MK/CS498Final/cca_ml.py '$callscrimecategory' '$callshour' '$callsmonth' dummy dummy dummy dummy dummy calls");
	   echo "<br><br>";
	   echo $output;	
	   //echo "hello";
	   	echo "<br><br>";

	}
	//echo "world";
	?>	
	
	
		</td>
		<td class="td3"></td>
	</tr>
	
	
  </table>			


<br><br><br><br>
<br><br><br><br>
<br><br>

				

			</div>
         </div>		 
		 
		 
         <div class="section fp-section" id="section7" data-fp-styles="null" data-anchor="seventhPage" style="height: 662px; background-color: rgb(126, 143, 124); padding-left: 3%; padding-right: 7%;">
            <div style="float: right; width: 50%;">
					<div style="padding-left:10%;">
						<p style="font-size: 40px; font-weight: bold; color:#1a1a1a;">References</p><br>				
						<br>
						<p class="bodyText">- <a href="https://www.kaggle.com/san-francisco/sf-police-calls-for-service-and-incidents">Kaggle Site</a> for SF Police Incidents and Calls data<br>- <a href="https://github.com/alvarotrigo/fullPage.js">FullPage.js</a> to create horizontally scrollable pages (slides).<br>- <a href="https://d3js.org/">D3.js</a> for Data-Driven Documents(D3) JavaScript libraries<br>- <a href="https://bl.ocks.org">bl.ocks.org</a> for D3.js sample charts<br>- <a href="https://ambari.apache.org/">Apache Ambari</a> for provisioning, managing, and monitoring Apache Hadoop clusters<br>- <a href="https://scikit-learn.org">Python Scikit-Learn</a> for building machine learning solution(s)<br>
					</div>
				</div>
				<div style="float: left; width: 50%;">
					<p style="font-size: 40px; font-weight: bold; color:#1a1a1a;">About the author<br></p><br><br>
					<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Authors:</p><br>
					<p class="bodyText">This project was created by <strong>Team 27</strong> for the final project of the course  'CS498: Cloud Computing Applications.</p><br>
					<p class="bodyText"> <strong>Team 27:</strong><br>
					- Madhukar Kambadahalli Puttasetty (Net Id: mk30)<br>
					- Rajendra Jena (Net Id: rjena2)<br>
					- Rishikesh Pagnis (Net Id: rpagnis2)<br>
					- Karthik Mohanasundaram (Net Id: karthik7)<br>

					</p><br><br>
					
					<p style="font-size: 16px; font-weight: bold; color:#1a1a1a;">Disclaimer:</p><br>
					<p class="bodyText">This project was created solely for academic purposes to exhibit the abilities of D3.js as a visualization tool. It is not a conclusive report and no pratical decisions should be made based on this report. References to resources used to develop this report are listed in the next column</p><br>
				</div>	
         </div>
		 
      </div>
      <script type="text/javascript" src="./CS498-Project_files/fullpage.js.download"></script>
      <script type="text/javascript" src="./CS498-Project_files/examples.js.download"></script>
      <script type="text/javascript">
         var myFullpage = new fullpage('#fullpage', {   // light - ffffff, dark - f2f2f2
         	anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage'], //
         	//sectionsColor: ['#e8f7ff', '#f3fcff', '#f9fbfc', '#f3fcff', '#e8f7ff', '#f3fcff', '#e8f7ff'],
         	//sectionsColor: ['#ffffff', '#f2f2f2', '#ffffff', '#f2f2f2', '#ffffff', '#f2f2f2', '#ffffff'],
			sectionsColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white'],
			
			//sectionsColor: ['#e8f7ff', '#f3fcff', '#f9fbfc', '#f3fcff', '#e8f7ff', '#f3fcff', '#e8f7ff'],
         	//sectionsColor: ['#ffffff', '#ffffff', '#f2f2f2', '#ffffff', '#f2f2f2', '#ffffff', '#f2f2f2'],
					
			navigation: true,
         	navigationPosition: 'right',
         	//navigationTooltips: ['Welcome', 'About', 'Overview', 'States Comparison', 'Age Group', 'Mode of Transportation', 'References']
			navigationTooltips: ['[1] Welcome', '[2] Introduction', '[3] Insights - Incidents', '[4] Insights - Incidents (cont\'d)', '[4] Insights - Calls', '[6] Search/Predict', '[7] References']//'Welcome', 'About this visualization', 'Overview'  # c1efff - dark blue   # e1f7ff - light blue 
			//  '#fdefe7', '#fefaf8'  f9fbfc
         });
      </script>

<script src="https://d3js.org/d3.v4.min.js"></script>
<!--script src="./firstChart.js"></script>
<script src="./secondChart.js"></script>
<script src="./lineChart.js"></script>
<script src="./bubbleChart.js"></script-->

</body>