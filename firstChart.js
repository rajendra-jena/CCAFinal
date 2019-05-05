
var xz = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    yz = [[66876, 70950, 71128, 77164, 83209, 89177, 97398, 
	      100300, 108409, 113935, 116629, 118533, 117055, 
		  121132, 125090, 127453],
		  [13386, 13109, 13302, 14212, 15045, 16548, 17192, 
		  17939, 18487, 20003, 20205, 20558, 20368, 20377, 
		  21042, 23332]],
    yzm = [[66876, 70950, 71128, 77164, 83209, 89177, 97398, 
	      100300, 108409, 113935, 116629, 118533, 117055, 
		  121132, 125090, 127453],
		  [0, 0, 0, 0, 0, 0, 0, 
		  0, 0, 0, 0, 0, 0, 0, 
		  0, 0]],		  
    yzf = [[0, 0, 0, 0, 0, 0, 0, 
		  0, 0, 0, 0, 0, 0, 0, 
		  0, 0],
		  [13386, 13109, 13302, 14212, 15045, 16548, 17192, 
		  17939, 18487, 20003, 20205, 20558, 20368, 20377, 
		  21042, 23332]];	  
		  
  /*  ymd = [66876, 70950, 71128, 77164, 83209, 89177, 97398, 
	      100300, 108409, 113935, 116629, 118533, 117055, 
		  121132, 125090, 127453],
    yfd = [13386, 13109, 13302, 14212, 15045, 16548, 17192, 
		  17939, 18487, 20003, 20205, 20558, 20368, 20377, 
		  21042, 23332];*/
		  
var n = yz.length, // The number of series.
    m = xz.length; // The number of values per series.

var y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz)),
	y01zm = d3.stack().keys(d3.range(n))(d3.transpose(yzm)),
	y01zf = d3.stack().keys(d3.range(n))(d3.transpose(yzf)),
    yMax = d3.max(yz, function(y) { return d3.max(y); }), //has max of male 
    y1Max = d3.max(y01z, function(y) { return d3.max(y, function(d) { return d[1]; }); }); // has max of total 
	
	yfMax = d3.max(yz[1]);
	
	/*
	console.log(y01z);
	console.log(yMax);
	console.log(yfMax);
	*/
	
var svgBr = d3.select(".viz1"),
    margin = {top: 150, right: 10, bottom: 80, left: 80},
    width = +svgBr.attr("width") - margin.left - margin.right,
    height = +svgBr.attr("height") - margin.top - margin.bottom;

var g = svgBr.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .domain(xz)
    .rangeRound([0, width])
    .padding(0.2);
	
var y = d3.scaleLinear()
    .domain([0, yMax])
    .range([height, 0]);
	
var tooltip = d3.select("body")
				.append("div")
				.attr("class", "toolTip")
				.style("opacity", 0);


var color = ["#3c8ad8","#ef69ab"];  //  #ef69ab    #fe80be
var series = g.selectAll(".series")
  .data(y01z)
  .enter().append("g")
    .attr("fill", function(d, i) { return color[i]; });
var rect = series.selectAll("rect")
  .attr("class","viz1rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i); })
    .attr("y", height)
    .attr("width", x.bandwidth())
    .attr("height", 0)
	.on("mouseover", function(d, i){

			d3.select(this).attr("stroke","#4f4f4f").attr("stroke-width",2);
			console.log(d);
			console.log(d3.select(this));
	        tooltip
			  .transition()
			  .duration(200)
			  .style("opacity", .9);
			  
			tooltip  
			  .html(tooltiptext(d[1]-d[0], i))
			  //.style("opacity", .9)
			  .style("left", (d3.event.pageX + 3) + "px")
              .style("top", (d3.event.pageY - 38) + "px")
              .style("display", "inline-block")
              ;  // 
        })
    		.on("mouseout", function(d){ 
			d3.select(this).attr("stroke","#cecece").attr("stroke-width",0);
			tooltip
				.transition()
				.duration(1)
		//		.style("display", "none")
				.style("opacity", 0)
				;
			});
			
function tooltiptext(d,i) {
 var text;

 if (d > 60000 ) {  //// gray color - 4c4a4a
	text = "<strong><span style='color:#4c4a4a'>Year:</span></strong> <span style='color:#7a3402'>" + (i+2001) + "</span><br>" +
	"<strong><span style='color:#4c4a4a'>Male Death Count: </span></strong> <span style='color:#7a3402'>" + d3.format(",")(d) + "</span><br>" ;
	return text;
 } else {
	text = "<strong><span style='color:#4c4a4a'>Year:</span></strong> <span style='color:brown'>" + (i+2001) + "</span><br>" +
	"<strong><span style='color:#4c4a4a'>Female Death Count: </span></strong> <span style='color:brown'>" + d3.format(",")(d) + "</span><br>" ;
	return text;
 }	
  
 /*
 var text = "<strong>Country:</strong> <span style='color:red'>" + "datahere" + "</span><br>" + "<strong>Country:</strong> <span style='color:red'>" + "datahere" + "</span><br>"+ "<strong>Country:</strong> <span style='color:red'>" + "datahere" + "</span><br>";
 return text;*/
}	

	
			/*
rect.transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); });*/
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
        .tickSize(5)
		.tickFormat(function(d){return d+2001})
        .tickPadding(6))

g.append("g")
    .attr("class", "altaxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
        .tickSize(5)
		.tickFormat(""/*function(d){return d+2001}*/)
        .tickPadding(6))
	  
	  
var yAxisCallBr = d3.axisLeft(y)
	//.ticks(3)
	.tickSize(-width)
	.tickFormat(function(d){
		return d;
	});
	
var yAxisCallBr2 = d3.axisLeft(y)
	//.ticks(3)
	.tickSize(2)
	.tickFormat("");
	
g.append("g")
	.attr("class", "y axis")
	.call(yAxisCallBr);

g.append("g")
	.attr("class", "vizBryaltaxis")
	.call(yAxisCallBr2);

/*
svgBr.append("circle")
	.attr("class", "anno2")
	.attr("cx",220)
	.attr("cy",0)
	.attr("r",40)
	.attr("fill", "#cecece");*/

// title
  svgBr.append("text")     
	  .attr("class", "viz1title")
      .attr("transform",
            "translate(" + ((width+150)/2)  + " ," + 
                           (20) + ")")
      .style("text-anchor", "middle")
      .text("# of Road Accident Deaths by Year");
	
// labels 
  // text label for the y axis
  svgBr.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", y(0) - margin.left - 180)
      .attr("x",0 - ((height+280) / 2))
      //.attr("dy", "1em")
      .style("text-anchor", "middle")
	  .style("fill","grey")
      .text("# of Road Accident Deaths");
	
  // text label for the x axis
  svgBr.append("text")         
      .attr("transform",
            "translate(" + ((width+150)/2)  + " ," + 
                           (height + margin.top + 50) + ")")
      .style("text-anchor", "start")
	  .style("fill","grey")
      //.style("fill","#33302d")
      .text("Year");
  

//transitionStacked();
/////////////////////////// ANNOTATIONS 
y.domain([0, yMax]);


	/*
	anno1_x1 = x(4)+ x.bandwidth() *2;
	anno1_y1 = y(yz[0][4]-36000);
	anno1_x2 = x(6)+ x.bandwidth() *4 + x.bandwidth()/2;
	anno1_y2 = y(yz[0][9]-40000);
	*/
	anno1_x1 = x(3);
	anno1_y1 = y(yz[0][3])-9;
	anno1_x2 = x(9);
	anno1_y2 = y(yz[0][9])-9;
	
	g.append("line")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno1")
		.attr("stroke", "#cecece")
		//.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x2)
		.attr("y2", anno1_y2)
		.attr("stroke-width",2)
		;
	
	g.append("circle")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "anno2")
	.attr("cx",(anno1_x1 + anno1_x2) /2)
	.attr("cy",(anno1_y1 + anno1_y2) /2)
	.attr("r",4)
	.attr("fill", "#cecece");
	
	g.append("line")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno3")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2)
		.attr("y1", (anno1_y1 + anno1_y2) /2)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;		

	g.append("line")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno4")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;			

	g.append("line")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno5")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20 - 17)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20 + 17)
		.attr("stroke-width",2)
		;	

  g.append("text")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno6")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 6)
	  .style("fill", "#3f3b38")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Slightly steep increase in the");		

  g.append("text")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno7")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 18)
	  .style("fill", "#3f3b38")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("TOTAL death count from road");	

  g.append("text")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno8")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 30)
	  .style("fill", "#3f3b38")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("accidents from 2004 to 2010");	


////////////////////////////////	 ANNOTATIONS-2

	anno1_x1 = x(12) + x.bandwidth()/2;
	anno1_y1 = y(yz[0][12])-5;

	g.append("circle")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "annoto1")
	.attr("cx",anno1_x1)
	.attr("cy",anno1_y1)
	.attr("r",4)
	.attr("fill", "#cecece");

	
 	g.append("line")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto2")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x1)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;
	
 	g.append("line")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto3")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1 - 30)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;

 	g.append("line")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto4")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1 - 13)
		.attr("y1", anno1_y1 - 30 - 10)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30 + 10)
		.attr("stroke-width",2)
		;		
		
		
  g.append("text")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto5")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 8)
	  .style("fill", "#3f3b38")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Small dip in 2013");		

  g.append("text")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto6")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 18)
	  .style("fill", "#3f3b38")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("a good thing !!");			
		
////////////////////////////////



////////////// Legends \\\\\\\\\\\\\\

/// male
var tmpwidth = width - 100;
var tmpcy = margin.top - 60 -20;
tmpwidth = tmpwidth+30;
svgBr.append("circle")
	.attr("class", "legendmale1")
	.attr("cx", tmpwidth)
	.attr("cy", tmpcy)
	.attr("r", 8)
	.attr("fill", "#3c8ad8")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionMale();})
	;

svgBr.append("circle")
	.attr("class", "legendmale2")
	.attr("cx", tmpwidth)
	.attr("cy", tmpcy)
	.attr("r", 5)
	.attr("fill", "white")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionMale();})
	;	

svgBr.append("text")
	  .attr("class", "legendmale3")
      //.attr("transform", "rotate(-90)")
      .attr("x", tmpwidth + 12) 
      .attr("y", tmpcy + 6)
	  .style("fill", "black")
      .style("text-anchor", "start")
      .text("Male");	
	  
	  
/// female
tmpwidth2 = tmpwidth + 70;
tmpcy = margin.top - 60 -20;
svgBr.append("circle")
	.attr("class", "legendfemale1")
	.attr("cx", tmpwidth2)
	.attr("cy", tmpcy)
	.attr("r", 8)
	.attr("fill", "#ef69ab")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionFemale();})
	;

svgBr.append("circle")
	.attr("class", "legendfemale2")
	.attr("cx", tmpwidth2)
	.attr("cy", tmpcy)
	.attr("r", 5)
	.attr("fill", "white")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionFemale();})
	;	

svgBr.append("text")
	  .attr("class", "legendfemale3")
      //.attr("transform", "rotate(-90)")
      .attr("x", tmpwidth2 + 12) 
      .attr("y", tmpcy + 6)
	  .style("fill", "black")
      .style("text-anchor", "start")
      .text("Female");

	  
/// stk
var tmpwidth = margin.left - 15;
var tmpcy = margin.top - 60 -20;
tmpwidth = tmpwidth+30;
svgBr.append("circle")
	.attr("class", "legendstk1")
	.attr("cx", tmpwidth)
	.attr("cy", tmpcy)
	.attr("r", 8)
	.attr("fill", "black")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionStacked();})
	;

svgBr.append("circle")
	.attr("class", "legendstk2")
	.attr("cx", tmpwidth)
	.attr("cy", tmpcy)
	.attr("r", 5)
	.attr("fill", "black")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionStacked();})
	;	

svgBr.append("text")
	  .attr("class", "legendstk3")
      //.attr("transform", "rotate(-90)")
      .attr("x", tmpwidth + 12) 
      .attr("y", tmpcy + 6)
	  .style("fill", "black")
      .style("text-anchor", "start")
      .text("Stacked");	
	  
	  
/// grp
tmpwidth2 = tmpwidth + 90;
tmpcy = margin.top - 60 -20;
svgBr.append("circle")
	.attr("class", "legendgrp1")
	.attr("cx", tmpwidth2)
	.attr("cy", tmpcy)
	.attr("r", 8)
	.attr("fill", "black")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionGrouped();})
	;

svgBr.append("circle")
	.attr("class", "legendgrp2")
	.attr("cx", tmpwidth2)
	.attr("cy", tmpcy)
	.attr("r", 5)
	.attr("fill", "white")
	.on("mouseover", function(){d3.select(this).style("cursor","pointer");})
	.on("click",function(d){transitionGrouped();})
	;	

svgBr.append("text")
	  .attr("class", "legendgrp3")
      //.attr("transform", "rotate(-90)")
      .attr("x", tmpwidth2 + 12) 
      .attr("y", tmpcy + 6)
	  .style("fill", "black")
      .style("text-anchor", "start")
      .text("Grouped");

	  
////////////// Legends \\\\\\\\\\\\\\


d3.selectAll(".section3")
    .on("active", changed());

/*

d3.selectAll(".section3")
    .on("nonactive", eraseviz1());
	
function eraseviz1(){
	d3.selectAll(".viz1rect")
		.attr("height",0);
}
*/

//changed();	   

/*
var timeout = d3.timeout(function() {
  d3.select("input[value=\"stacked\"]")
      .property("checked", true)
      .dispatch("change");
}, 5);
*/


function changed() {
  //timeout.stop();
  /*
  if (this.value === "grouped") transitionGrouped();
  else if (this.value === "male") transitionMale();
  else if (this.value === "female") transitionFemale();
  else */
  transitionStacked();
}

function transitionGrouped() {

  d3.selectAll(".legendmale2").attr("fill", "white");
  d3.selectAll(".legendfemale2").attr("fill", "white");
  d3.selectAll(".legendgrp2").attr("fill", "black");
  d3.selectAll(".legendstk2").attr("fill", "white");
  

  //annotations reset   
  d3.selectAll(".anno1").attr("stroke-width",0);
  d3.selectAll(".anno2").attr("r",0);
  d3.selectAll(".anno3").attr("stroke-width",0);
  d3.selectAll(".anno4").attr("stroke-width",0);
  d3.selectAll(".anno5").attr("stroke-width",0);
  d3.selectAll(".anno6").text("");
  d3.selectAll(".anno7").text("");
  d3.selectAll(".anno8").text("");

  d3.selectAll(".annoto1").attr("r",0);
  d3.selectAll(".annoto2").attr("stroke-width",0);
  d3.selectAll(".annoto3").attr("stroke-width",0);
  d3.selectAll(".annoto4").attr("stroke-width",0);
  d3.selectAll(".annoto5").text("");
  d3.selectAll(".annoto6").text("");

  y.domain([0, yMax]);
  
  /////////////////////////// ANNOTATIONS 


	anno1_x1 = x(3);
	anno1_y1 = y(yz[0][3])-9;
	anno1_x2 = x(9);
	anno1_y2 = y(yz[0][9])-9;
	
	d3.selectAll(".anno1")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno1")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x2)
		.attr("y2", anno1_y2)
		.attr("stroke-width",2)
		;
	
	d3.selectAll(".anno2")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "anno2")
	.attr("cx",(anno1_x1 + anno1_x2) /2)
	.attr("cy",(anno1_y1 + anno1_y2) /2)
	.attr("r",4)
	.attr("fill", "#cecece");
	
	d3.selectAll(".anno3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno3")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2)
		.attr("y1", (anno1_y1 + anno1_y2) /2)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;		

	d3.selectAll(".anno4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno4")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;			

	d3.selectAll(".anno5")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno5")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20 - 17)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20 + 17)
		.attr("stroke-width",2)
		;	

  d3.selectAll(".anno6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno6")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 6)
	  //.style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Slightly steep increase in the");		

  d3.selectAll(".anno7")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno7")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 18)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("TOTAL death count from road");	

  d3.selectAll(".anno8")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno8")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 30)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("accidents from 2004 to 2010");	


////////////////////////////////	 ANNOTATIONS-2

	anno1_x1 = x(12) + x.bandwidth()/2;
	anno1_y1 = y(yz[0][12])-5;

	d3.selectAll(".annoto1")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "annoto1")
	.attr("cx",anno1_x1)
	.attr("cy",anno1_y1)
	.attr("r",4)
	.attr("fill", "#cecece");

	
 	d3.selectAll(".annoto2")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto2")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x1)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;
	
 	d3.selectAll(".annoto3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto3")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1 - 30)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;

 	d3.selectAll(".annoto4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto4")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1 - 13)
		.attr("y1", anno1_y1 - 30 - 10)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30 + 10)
		.attr("stroke-width",2)
		;		
		
		
  d3.selectAll(".annoto5")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto5")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 8)
	  // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Small dip in 2013");		

  d3.selectAll(".annoto6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto6")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 18)
	  //.style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("a good thing !!");			
		
////////////////////////////////


  
  yAxisCallBr.scale(y);
  yAxisCallBr2.scale(y);
  
  var t = d3.transition()
            .duration(500);

	svgBr.select(".y")
		.transition(t)
		.call(yAxisCallBr); 
		
	svgBr.select(".vizBryaltaxis")
		.transition(t)
		.call(yAxisCallBr2); 
		
  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("x", function(d, i) { return x(i) + x.bandwidth() / n * this.parentNode.__data__.key; })
      .attr("width", x.bandwidth() / n)
    .transition()
      .attr("y", function(d) { return y(d[1] - d[0]); })
      .attr("height", function(d) { return y(0) - y(d[1] - d[0]); });

}

function transitionStacked() {

  d3.selectAll(".legendmale2").attr("fill", "white");
  d3.selectAll(".legendfemale2").attr("fill", "white");
  d3.selectAll(".legendgrp2").attr("fill", "white");
  d3.selectAll(".legendstk2").attr("fill", "black");
  

  //annotations reset   
  d3.selectAll(".anno1").attr("stroke-width",0);
  d3.selectAll(".anno2").attr("r",0);
  d3.selectAll(".anno3").attr("stroke-width",0);
  d3.selectAll(".anno4").attr("stroke-width",0);
  d3.selectAll(".anno5").attr("stroke-width",0);
  d3.selectAll(".anno6").text("");
  d3.selectAll(".anno7").text("");
  d3.selectAll(".anno8").text("");

  d3.selectAll(".annoto1").attr("r",0);
  d3.selectAll(".annoto2").attr("stroke-width",0);
  d3.selectAll(".annoto3").attr("stroke-width",0);
  d3.selectAll(".annoto4").attr("stroke-width",0);
  d3.selectAll(".annoto5").text("");
  d3.selectAll(".annoto6").text("");
  
  
  y.domain([0, yMax]);
  
  
/////////////////////////// ANNOTATIONS 


	anno1_x1 = x(3);
	anno1_y1 = y(yz[0][3])-9;
	anno1_x2 = x(9);
	anno1_y2 = y(yz[0][9])-9;
	
	d3.selectAll(".anno1")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno1")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x2)
		.attr("y2", anno1_y2)
		.attr("stroke-width",2)
		;
	
	d3.selectAll(".anno2")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "anno2")
	.attr("cx",(anno1_x1 + anno1_x2) /2)
	.attr("cy",(anno1_y1 + anno1_y2) /2)
	.attr("r",4)
	.attr("fill", "#cecece");
	
	d3.selectAll(".anno3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno3")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2)
		.attr("y1", (anno1_y1 + anno1_y2) /2)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;		

	d3.selectAll(".anno4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno4")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;			

	d3.selectAll(".anno5")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno5")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20 - 17)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20 + 17)
		.attr("stroke-width",2)
		;	

  d3.selectAll(".anno6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno6")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 6)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Slightly steep increase in the");		

  d3.selectAll(".anno7")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno7")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 18)
	  //.style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("TOTAL death count from road");	

  d3.selectAll(".anno8")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno8")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 30)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("accidents from 2004 to 2010");	


////////////////////////////////	 ANNOTATIONS-2

	anno1_x1 = x(12) + x.bandwidth()/2;
	anno1_y1 = y(yz[0][12])-5;

	d3.selectAll(".annoto1")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "annoto1")
	.attr("cx",anno1_x1)
	.attr("cy",anno1_y1)
	.attr("r",4)
	.attr("fill", "#cecece");

	
 	d3.selectAll(".annoto2")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto2")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x1)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;
	
 	d3.selectAll(".annoto3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto3")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1 - 30)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;

 	d3.selectAll(".annoto4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto4")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1 - 13)
		.attr("y1", anno1_y1 - 30 - 10)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30 + 10)
		.attr("stroke-width",2)
		;		
		
		
  d3.selectAll(".annoto5")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto5")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 8)
	//  .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Small dip in 2013");		

  d3.selectAll(".annoto6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto6")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 18)
	//  .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("a good thing !!");			
		
////////////////////////////////  
  
  y.domain([0, y1Max]);
  
  yAxisCallBr.scale(y);
  yAxisCallBr2.scale(y);
  
  //yAxisCallBr.tickSize(-width);
  
  var t = d3.transition()
            .duration(500);

	svgBr.select(".y")
		.transition(t)
		.call(yAxisCallBr); 
	
	svgBr.select(".vizBryaltaxis")
		.transition(t)
		.call(yAxisCallBr2); 

  rect.transition()
      .duration(500)
      //.delay(function(d, i) { return i * 10; })
      .delay(300)
	  .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    .transition()
      .attr("x", function(d, i) { return x(i); })
      .attr("width", x.bandwidth());
}


function transitionMale() {
  
  d3.selectAll(".legendmale2").attr("fill", "#3c8ad8");
  d3.selectAll(".legendfemale2").attr("fill", "white");
  d3.selectAll(".legendgrp2").attr("fill", "white");
  d3.selectAll(".legendstk2").attr("fill", "white");
  
  
  //annotations reset   
  d3.selectAll(".anno1").attr("stroke-width",0);
  d3.selectAll(".anno2").attr("r",0);
  d3.selectAll(".anno3").attr("stroke-width",0);
  d3.selectAll(".anno4").attr("stroke-width",0);
  d3.selectAll(".anno5").attr("stroke-width",0);
  d3.selectAll(".anno6").text("");
  d3.selectAll(".anno7").text("");
  d3.selectAll(".anno8").text("");

  d3.selectAll(".annoto1").attr("r",0);
  d3.selectAll(".annoto2").attr("stroke-width",0);
  d3.selectAll(".annoto3").attr("stroke-width",0);
  d3.selectAll(".annoto4").attr("stroke-width",0);
  d3.selectAll(".annoto5").text("");
  d3.selectAll(".annoto6").text("");
  
  y.domain([0, yMax]);
  
  
/////////////////////////// ANNOTATIONS 


	anno1_x1 = x(3);
	anno1_y1 = y(yz[0][3])-9;
	anno1_x2 = x(9);
	anno1_y2 = y(yz[0][9])-9;
	
	d3.selectAll(".anno1")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno1")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x2)
		.attr("y2", anno1_y2)
		.attr("stroke-width",2)
		;
	
	d3.selectAll(".anno2")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "anno2")
	.attr("cx",(anno1_x1 + anno1_x2) /2)
	.attr("cy",(anno1_y1 + anno1_y2) /2)
	.attr("r",4)
	.attr("fill", "#cecece");
	
	d3.selectAll(".anno3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno3")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2)
		.attr("y1", (anno1_y1 + anno1_y2) /2)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;		

	d3.selectAll(".anno4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno4")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;			

	d3.selectAll(".anno5")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno5")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20 - 17)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20 + 17)
		.attr("stroke-width",2)
		;	

  d3.selectAll(".anno6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno6")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 6)
	  //.style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Slightly steep increase in the");		

  d3.selectAll(".anno7")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno7")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 18)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      //.html("<strong>MALE<\strong><span>death count from road<\span>")
	  .text("MALE death count from road");	

  d3.selectAll(".anno8")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno8")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 30)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("accidents from 2004 to 2010");	


////////////////////////////////	 ANNOTATIONS-2

	anno1_x1 = x(12) + x.bandwidth()/2;
	anno1_y1 = y(yz[0][12])-5;

	d3.selectAll(".annoto1")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "annoto1")
	.attr("cx",anno1_x1)
	.attr("cy",anno1_y1)
	.attr("r",4)
	.attr("fill", "#cecece");

	
 	d3.selectAll(".annoto2")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto2")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x1)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;
	
 	d3.selectAll(".annoto3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto3")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1 - 30)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;

 	d3.selectAll(".annoto4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto4")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1 - 13)
		.attr("y1", anno1_y1 - 30 - 10)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30 + 10)
		.attr("stroke-width",2)
		;		
		
		
  d3.selectAll(".annoto5")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto5")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 8)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Small dip in 2013");		

  d3.selectAll(".annoto6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto6")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 18)
	//  .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("a good thing !!");			
		
////////////////////////////////
  
  
  
  yAxisCallBr.scale(y);
  
  yAxisCallBr.scale(y);

  var t = d3.transition()
            .duration(500);

	svgBr.select(".y")
		.transition(t)
		.call(yAxisCallBr); 
	
	svgBr.select(".vizBryaltaxis")
		.transition(t)
		.call(yAxisCallBr2); 
		
	//console.log(rect);
	  	rect.transition()
		  .duration(500)
		  .delay(function(d, i) { return i * 10; })
		  .attr("y", function(d) { return y(d[1]); })
		  .attr("height", function(d) { 
							//console.log(d);
							if (d[0] > 60000) {
							  return 0;
							} else {
							  return y(d[0]) - y(d[1]);
							}
							
							})
		.transition()
		  .attr("x", function(d, i) { return x(i); })
		  .attr("width", x.bandwidth());
	

  /*
	console.log("xxxxxxxxxxx");
	console.log(yMax);
	console.log(yz[0][4]);
	console.log(yMax - yz[0][4]);
	console.log(y(yMax - yz[0][4]));
	console.log("xxxxxxxxxxx");
	console.log(y(0));
	console.log(y(yMax));
	console.log(y(108409));
  */
}

function transitionFemale() {

  d3.selectAll(".legendmale2").attr("fill", "white");
  d3.selectAll(".legendfemale2").attr("fill", "#ef69ab");
  d3.selectAll(".legendgrp2").attr("fill", "white");
  d3.selectAll(".legendstk2").attr("fill", "white");
  
  //annotations reset   
  d3.selectAll(".anno1").attr("stroke-width",0);
  d3.selectAll(".anno2").attr("r",0);
  d3.selectAll(".anno3").attr("stroke-width",0);
  d3.selectAll(".anno4").attr("stroke-width",0);
  d3.selectAll(".anno5").attr("stroke-width",0);
  d3.selectAll(".anno6").text("");
  d3.selectAll(".anno7").text("");
  d3.selectAll(".anno8").text("");

  d3.selectAll(".annoto1").attr("r",0);
  d3.selectAll(".annoto2").attr("stroke-width",0);
  d3.selectAll(".annoto3").attr("stroke-width",0);
  d3.selectAll(".annoto4").attr("stroke-width",0);
  d3.selectAll(".annoto5").text("");
  d3.selectAll(".annoto6").text("");
  
  //transitionStacked()
  
   y.domain([0, yMax]);
   console.log("am in transitionFemale");
   console.log("yMax");
  
	
  /////////////////////////// ANNOTATIONS 


	anno1_x1 = x(3);
	anno1_y1 = y(yz[0][3])-9;
	anno1_x2 = x(9);
	anno1_y2 = y(yz[0][9]);
	
	d3.selectAll(".anno1")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno1")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x2)
		.attr("y2", anno1_y2)
		.attr("stroke-width",2)
		;
	
	d3.selectAll(".anno2")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "anno2")
	.attr("cx",(anno1_x1 + anno1_x2) /2)
	.attr("cy",(anno1_y1 + anno1_y2) /2)
	.attr("r",4)
	.attr("fill", "#cecece");
	
	d3.selectAll(".anno3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno3")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2)
		.attr("y1", (anno1_y1 + anno1_y2) /2)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;		

	d3.selectAll(".anno4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno4")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20)
		.attr("stroke-width",2)
		;			

	d3.selectAll(".anno5")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "anno5")
		.attr("stroke", "#cecece")
		.attr("x1", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y1", (anno1_y1 + anno1_y2) /2 - 20 - 17)
		.attr("x2", (anno1_x1 + anno1_x2) /2 - 10 - 50) 
		.attr("y2", (anno1_y1 + anno1_y2) /2 - 20 + 17)
		.attr("stroke-width",2)
		;	

  d3.selectAll(".anno6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno6")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 6)
	//  .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Slightly steep increase in the");		

  d3.selectAll(".anno7")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno7")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 18)
	//  .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("FEMALE death count from road");	

  d3.selectAll(".anno8")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "anno8")
      //.attr("transform", "rotate(-90)")
      .attr("x", (anno1_x1 + anno1_x2) /2 - 10 - 50 - 3) 
      .attr("y", (anno1_y1 + anno1_y2) /2 - 20 - 15 + 30)
	//  .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("accidents from 2004 to 2010");	


////////////////////////////////	 ANNOTATIONS-2

	anno1_x1 = x(12) + x.bandwidth()/2;
	anno1_y1 = y(yz[0][12])+10;

	d3.selectAll(".annoto1")
	.transition()
      .duration(500)
	  .delay(500)
	.attr("class", "annoto1")
	.attr("cx",anno1_x1)
	.attr("cy",anno1_y1)
	.attr("r",4)
	.attr("fill", "#cecece");

	
 	d3.selectAll(".annoto2")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto2")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1)
		.attr("x2", anno1_x1)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;
	
 	d3.selectAll(".annoto3")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto3")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1)
		.attr("y1", anno1_y1 - 30)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30)
		.attr("stroke-width",2)
		;

 	d3.selectAll(".annoto4")
	.transition()
      .duration(500)
	  .delay(500)
		.attr("class", "annoto4")
		.attr("stroke", "#cecece")
		.attr("x1", anno1_x1 - 13)
		.attr("y1", anno1_y1 - 30 - 10)
		.attr("x2", anno1_x1 - 13)
		.attr("y2", anno1_y1 - 30 + 10)
		.attr("stroke-width",2)
		;		
		
		
  d3.selectAll(".annoto5")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto5")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 8)
	  // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("Small dip in 2013");		

  d3.selectAll(".annoto6")
  .transition()
      .duration(500)
	  .delay(700)
	  .attr("class", "annoto6")
      //.attr("transform", "rotate(-90)")
      .attr("x", anno1_x1 - 13 - 3) 
      .attr("y", anno1_y1 - 30 - 10 + 18)
	 // .style("fill", "black")
      //.attr("dy", "1em")
      .style("text-anchor", "end")
      .text("a good thing !!");			
		
////////////////////////////////

	y.domain([0, yfMax]);
  
   //y.domain([0, yMax]);
   console.log("yfMax");
   console.log(yfMax);
   
  yAxisCallBr.scale(y);
  
  yAxisCallBr2.scale(y);

  var t = d3.transition()
            .duration(500);

	svgBr.select(".y")
		.transition(t)
		.call(yAxisCallBr); 
	
	svgBr.select(".vizBryaltaxis")
		.transition(t)
		.call(yAxisCallBr2); 
	
	
		
	//console.log(rect);
	  	rect.transition()
		  .duration(500)
		  .delay(function(d, i) { return i * 10; })
		  .attr("y", function(d) { if (d[0] == 0) {
									return y(0);
								} else {
									return y(d[1]-d[0]);
								} })
		  .attr("height", function(d) { 
							
							/*	console.log("0000000000000000");
								console.log(d[0]);
								console.log(d[1]);
								console.log(y(d[0]));
								console.log(y(d[1]));
								console.log(y(d[0]) - y(d[1]));*/
								
								//console.log("11111111111111111");
								if (d[0] == 0) {
							/*		console.log(d[0]);
									console.log(d[0]);
									console.log(y(d[0]));
									console.log(y(d[0]));
									console.log(y(d[0]) - y(d[0]));*/
									return 0; 
								} else {
							/*		console.log(d[0]-66876);
									console.log(d[1]);
									console.log(y(d[0]-66876));
									console.log(y(d[1]));
									console.log(y(0) - y(d[1]-d[0]));*/
									return y(0) - y(d[1]-d[0]); 
								}
						/*		//console.log(d[1]);
								if (d[0] < 60000 && d[1] > 60000) {
								  return 0; //y(d[0]) - y(d[0]);
								} else {
								  return 0; //y(d[0]-66876) - y(d[1]);
								}	
								*/
							})
		.transition()
		  .attr("x", function(d, i) { return x(i); })
		  .attr("width", x.bandwidth());
		  
		
  
  
}


