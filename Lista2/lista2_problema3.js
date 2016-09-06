//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
];



function renderDataset(){
	    //
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([0, width]);
    //
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([height,0]);

    //
    var rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([5,8]);

    //
    var cScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range(["gray","red"]);
    
    
    //
    var xAxis = d3.axisBottom(xScale).ticks(6);		  
    var xAxisGroup = d3.select("#xAxis")
	.transition()
	.call(xAxis);

    //
    var yAxis = d3.axisLeft(yScale).ticks(6);		  
    var yAxisGroup = d3.select("#yAxis").transition().call(yAxis);		    		  	

    //
    var circleSelection = svg.select("#circles").selectAll("circle")
	.data(dataset);

    //Remove circles that are not needed
    circleSelection
	.exit()
	.attr("fill","rgba(255, 255, 255, 0)")
	.remove();
    
    //Create circles
    circleSelection
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return rScale(d[1]);
	})
	.attr("fill", function(d){
	    return "black";//cScale(d[1]);
	});

var svgx = d3.select("body").select("svg");
svg
.on( "mousedown", function() {
    console.log("mousedown");
    var p = d3.mouse( this);

    svg.append("g")
    .append("rect")
    .attr("x",p[0])
    .attr("y",p[1])
    .attr("rx","6")
    .attr("ry","6")
	.attr("width",0)
	.attr("height",0)
    .attr("stroke","red")
    .attr("stroke-width","1px")
    .attr("stroke-dasharray", "4px")
    .attr("stroke-opacity"," 0.5")
    .attr("fill","red");
    
})
.on( "mousemove", function() {
       	var s = svgx.select( "rect.selection");
         console.log("mousemove");
      // console.log("estou aqui ",!s.empty()," s eh ",s.attr( "x"));
    if( !s.empty()) {
        var p = d3.mouse(this);
           // console.log("valor de p eh ",p);
          var  d = {
                "x"  : parseInt( s.attr( "x"), 10),
                "y"   : parseInt( s.attr( "y"), 10),
               "width" : parseInt( s.attr( "width"), 10),
                "height" : parseInt( s.attr( "height"), 10)
            };
           // console.log("valor de d eh ", d);
         var   move = {
                "x" : p[0] - d.x,
                "y" : p[1] - d.y
           }
        ;

       // console.log("agora estou aqui ",p);
        if( move.x < 1 || (move.x*2<d.width)) {
            d.x = p[0];
            d.width -= move.x;
        } else {
            d.width = move.x;       
        }

        if( move.y < 1 || (move.y*2<d.height)) {
            d.y = p[1];
            d.height -= move.y;
        } else {
            d.height = move.y;       
        }
       
        s.attr(d);
      //  console.log( "valor de d por ultimo eh ",d);
    }
}).on( "mouseup", function() {
    console.log("mouseup");
    svg.select( ".selection").remove();
});
  /*  circleSelection
    .enter()
	.append("circle")
    .transition()
	 .delay(function(d,i){return 100*i;})
	 .duration(1000)
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return 2;
	})
	.attr("fill", function(d){
	    return  cScale(d[1]);
	});*/
    
}


function init(){
    //create clickable paragraph
    d3.select("body")
	.append("p")
	.text("Click on me!")
	.on("click", function() {
	    renderDataset();
	});
    
    //Create SVG element
    var crudeSVG = d3.select("body")
	.append("svg");

    var svg = crudeSVG
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //
    var circlesGroup = svg.append("g").attr("id","circles");
    
    //
    svg.append("g").attr("id","xAxis").attr("transform","translate(0," + (height - margin.bottom) + ")");
    svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ",0)");
    
    return svg;
}		  		  		  

//
var svg = init();
